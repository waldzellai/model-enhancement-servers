from __future__ import annotations
import uuid
from typing import Dict, Any, Optional

from ..resources.store import Store
from ..resources.uris import make_syslab_uri
from .parsers import parse_sd_model_from_dict
from .engine import SDEngine
from .analysis import analyze_simulation


def run_simulation(
    *,
    params: Dict[str, float] = None,
    model: Dict[str, Any] = None,
    horizon_steps: int = 20,
    dt: float = 1.0,
    t_start: float = 0.0,
    method: str = "euler",
    store: Store
) -> Dict[str, Any]:
    """
    Run System Dynamics simulation.
    
    Args:
        params: Legacy parameters for toy logistic growth model
        model: Full SD model specification (stocks, flows, auxiliaries, parameters)
        horizon_steps: Number of time steps (legacy)
        dt: Time step size
        t_start: Start time
        method: Integration method ('euler' or 'rk4')
        store: Artifact store
    
    Returns:
        Dict with resources, summary, provenance, and metrics
    """
    run_id = str(uuid.uuid4())
    
    # Handle legacy logistic growth model
    if params is not None and model is None:
        # Convert legacy params to model format
        r = float(params.get("r", 0.3))
        K = float(params.get("K", 100.0))
        y0 = float(params.get("y0", 10.0))
        
        model = {
            "stocks": [
                {"name": "Population", "initial": y0}
            ],
            "flows": [
                {"name": "NetGrowth", "formula": f"{r} * Population * (1 - Population / {K})", "to_stock": "Population"}
            ],
            "parameters": {"r": r, "K": K}
        }
    
    # Parse model
    if model is None:
        return {
            "error": "No model specification provided",
            "resources": [],
            "summary": {},
            "provenance": ""
        }
    
    sd_model, parse_errors = parse_sd_model_from_dict(model)
    
    if parse_errors or sd_model is None:
        # Model parsing failed
        error_result = {
            "status": "PARSE_ERROR",
            "errors": parse_errors,
            "resources": []
        }
        
        error_uri = make_syslab_uri("runs", run_id, "error.json")
        store.write_json(error_uri, error_result)
        
        return {
            "error": "; ".join(parse_errors[:3]),
            "resources": [error_uri],
            "summary": {},
            "provenance": error_uri
        }
    
    # Calculate t_end from horizon_steps
    t_end = t_start + horizon_steps * dt
    
    # Run simulation
    engine = SDEngine(method=method)
    result, sim_errors = engine.simulate(sd_model, t_start=t_start, t_end=t_end, dt=dt)
    
    if sim_errors:
        # Simulation failed
        error_result = {
            "status": "SIMULATION_ERROR",
            "errors": sim_errors,
            "resources": []
        }
        
        error_uri = make_syslab_uri("runs", run_id, "error.json")
        store.write_json(error_uri, error_result)
        
        return {
            "error": "; ".join(sim_errors[:3]),
            "resources": [error_uri],
            "summary": {},
            "provenance": error_uri
        }
    
    # Analyze results
    metrics = analyze_simulation(
        result.time,
        result.stocks,
        result.flows,
        result.auxiliaries
    )
    
    # Save artifacts
    series_uri = make_syslab_uri("runs", run_id, "series.json")
    metrics_uri = make_syslab_uri("runs", run_id, "metrics.json")
    analysis_uri = make_syslab_uri("runs", run_id, "analysis.json")
    prov_uri = make_syslab_uri("runs", run_id, "provenance.json")
    model_uri = make_syslab_uri("runs", run_id, "model.json")
    
    # Save time series
    series_data = {
        "time": result.time,
        "stocks": result.stocks,
        "flows": result.flows,
        "auxiliaries": result.auxiliaries,
        "dt": result.dt,
        "method": result.method
    }
    store.write_json(series_uri, series_data)
    
    # Save metrics
    metrics_data = {
        "final_values": metrics.final_values,
        "has_equilibrium": len(metrics.equilibria) > 0,
        "equilibrium_values": metrics.equilibria[0].values if metrics.equilibria else None,
        "oscillations": len(metrics.oscillations),
        "growth_patterns": {name: p.pattern_type for name, p in metrics.growth_patterns.items()}
    }
    store.write_json(metrics_uri, metrics_data)
    
    # Save detailed analysis
    analysis_data = {
        "equilibria": [
            {
                "time_start": eq.time_start,
                "time_end": eq.time_end,
                "values": eq.values,
                "is_stable": eq.is_stable,
                "confidence": eq.confidence
            }
            for eq in metrics.equilibria
        ],
        "oscillations": [
            {
                "variable": osc.variable,
                "period": osc.period,
                "amplitude": osc.amplitude,
                "frequency": osc.frequency,
                "damping_ratio": osc.damping_ratio,
                "is_periodic": osc.is_periodic
            }
            for osc in metrics.oscillations
        ],
        "peaks": {
            name: [{"time": p.time, "value": p.value, "is_maximum": p.is_maximum} for p in peaks]
            for name, peaks in metrics.peaks.items()
        },
        "growth_patterns": {
            name: {
                "pattern_type": p.pattern_type,
                "confidence": p.confidence,
                "parameters": p.parameters
            }
            for name, p in metrics.growth_patterns.items()
        },
        "summary": metrics.summary
    }
    store.write_json(analysis_uri, analysis_data)
    
    # Save provenance
    provenance = {
        "tool": "sd.run_simulation",
        "method": method,
        "dt": dt,
        "t_start": t_start,
        "t_end": t_end,
        "num_steps": len(result.time),
        "warnings": result.warnings,
        "versions": {},
        "inputs": [],
        "hashes": {},
    }
    store.write_json(prov_uri, provenance)
    
    # Save model for reference
    store.write_json(model_uri, model)
    
    return {
        "resources": [series_uri, metrics_uri, analysis_uri],
        "summary": metrics_data,
        "provenance": prov_uri,
        "analysis_summary": metrics.summary
    }
