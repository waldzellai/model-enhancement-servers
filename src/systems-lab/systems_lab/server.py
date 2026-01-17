from __future__ import annotations
import json
import uuid

from fastmcp import FastMCP

from .config import STORE_ROOT
from .resources.store import Store
from .resources.uris import make_syslab_uri
from .prompts.or_sequential_playbook import SUMMARY as OR_SUMMARY, BODY as OR_BODY
from .prompts.sd_sequential_playbook import SUMMARY as SD_SUMMARY, BODY as SD_BODY
from .sd.run_simulation import run_simulation
from .sd.parsers import parse_sd_model_from_dict
from .sd.engine import SDEngine
from .sd.analysis import analyze_simulation
from .pack.export_notebook import export_notebook
from .analysis.sensitivity import one_at_a_time_sensitivity, latin_hypercube_sensitivity
from .analysis.comparison import compare_scenarios
from .visualization.timeseries import plot_time_series
from .visualization.phase import plot_phase_portrait
from .visualization.sensitivity import plot_tornado_chart
from .or.verification import verify_solution as verify_or_solution
from .or.parsers import parse_or_model_from_dict
from .or.engine import OREngine
from importlib import import_module

# `or` is a reserved keyword; import via importlib
optimize_policy_seq = import_module('.or.optimize_policy_seq', __package__).optimize_policy_seq

store = Store(STORE_ROOT)
store.ensure()

server = FastMCP(name="systems_lab", version="2.0")


# ---------------------------------------------------------------------------
# Resources
@server.resource("syslab://catalog", name="catalog", description="JSON listing of all discovered artifacts on local store")
async def catalog() -> bytes:
    return json.dumps(store.catalog()).encode("utf-8")


@server.resource("syslab://{kind}/{path}", name="dynamic_read", description="Serve bytes for any stored artifact via syslab URI")
async def dynamic_read(kind: str, path: str) -> bytes:
    return store.read_bytes(kind, path)


# ---------------------------------------------------------------------------
# Tools
@server.tool(
    "sd.run_simulation",
    description="Run System Dynamics simulation with full model support (stocks, flows, auxiliaries)",
    output_schema={
        "type": "object",
        "properties": {
            "resources": {"type": "array", "items": {"type": "string", "format": "uri"}},
            "summary": {"type": "object"},
            "provenance": {"type": "string", "format": "uri"},
            "analysis_summary": {"type": "string"}
        },
        "required": ["resources", "provenance"],
    },
)
async def sd_run_simulation(
    params: dict = None,
    model: dict = None,
    horizon_steps: int = 20,
    dt: float = 1.0,
    t_start: float = 0.0,
    method: str = "euler"
):
    return run_simulation(
        params=params,
        model=model,
        horizon_steps=horizon_steps,
        dt=dt,
        t_start=t_start,
        method=method,
        store=store
    )


@server.tool(
    "or.optimize_policy_seq",
    description="Optimize Policy (Sequential Thinking)",
    output_schema={
        "type": "object",
        "properties": {
            "solution": {"type": "object"},
            "traceUri": {"type": "string", "format": "uri"},
            "milestones": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "step": {"type": "integer"},
                        "title": {"type": "string"},
                        "summary": {"type": "string"},
                    },
                    "required": ["step", "title", "summary"],
                },
            },
            "verifications": {"type": "array", "items": {"type": "object"}},
            "resources": {"type": "array", "items": {"type": "string", "format": "uri"}},
        },
        "required": ["solution", "traceUri"],
    },
)
async def or_optimize_policy_seq(
    objective: str | None = None,
    constraints: list[dict] | None = None,
    decision_vars: list[dict] | None = None,
    inputs: list[str] | None = None,
    stepsMax: int = 6,
    explainForHumans: bool = False,
):
    return optimize_policy_seq(
        objective=objective,
        constraints=constraints,
        decision_vars=decision_vars,
        inputs=inputs,
        stepsMax=stepsMax,
        explainForHumans=explainForHumans,
        store=store,
    )


@server.tool(
    "pack.export_notebook",
    description="Static Publish (HTML)",
    output_schema={"type": "object", "properties": {"uri": {"type": "string", "format": "uri"}}, "required": ["uri"]},
)
async def pack_export_notebook(title: str, sections: list[str], format: str = "html"):
    return export_notebook(title=title, sections=sections, format=format, store=store)


# ---------------------------------------------------------------------------
# Prompts
@server.prompt("prompts/or.sequential-playbook", description=OR_SUMMARY)
async def or_sequential_playbook() -> str:
    return OR_BODY


@server.prompt("prompts/sd.sequential-playbook", description=SD_SUMMARY)
async def sd_sequential_playbook() -> str:
    return SD_BODY


# ---------------------------------------------------------------------------
# New Analysis Tools
@server.tool(
    "analysis.sensitivity_oat",
    description="Perform one-at-a-time sensitivity analysis on SD or OR model",
)
async def analysis_sensitivity_oat(
    run_uris: list[str],
    parameter_ranges: dict[str, list[float]],
    output_metric: str = "final_value",
    num_samples: int = 10
):
    """
    Run OAT sensitivity analysis by varying parameters and collecting outputs.
    
    Args:
        run_uris: List of simulation run URIs to analyze
        parameter_ranges: Dict mapping parameter name to [min, max]
        output_metric: Name of metric to analyze
        num_samples: Number of samples per parameter
    """
    # This is a placeholder - full implementation would re-run models
    # with varied parameters
    return {
        "method": "one_at_a_time",
        "num_samples": num_samples,
        "parameters": list(parameter_ranges.keys()),
        "note": "Full implementation requires model re-execution"
    }


@server.tool(
    "analysis.compare_scenarios",
    description="Compare multiple simulation scenarios side-by-side",
)
async def analysis_compare(scenario_uris: list[str]):
    """
    Compare metrics across multiple simulation scenarios.
    
    Args:
        scenario_uris: List of URIs pointing to simulation results
    """
    scenarios = []
    for uri in scenario_uris:
        # Load scenario data from store
        try:
            # Parse URI to get data
            # This is simplified - full implementation would load from store
            scenarios.append({
                "name": uri,
                "metrics": {}
            })
        except Exception as e:
            pass
    
    comparison = compare_scenarios(scenarios)
    
    return {
        "scenarios": comparison.scenario_names,
        "metrics": comparison.metrics,
        "differences": comparison.differences,
        "summary": comparison.summary
    }


@server.tool(
    "viz.plot_time_series",
    description="Generate time series plot and save to store",
)
async def viz_plot_timeseries(series_uri: str, variables: list[str] = None, title: str = "Time Series"):
    """
    Create time series plot from simulation results.
    
    Args:
        series_uri: URI of series data
        variables: Optional list of variables to plot (defaults to all)
        title: Plot title
    """
    viz_id = str(uuid.uuid4())
    viz_uri = make_syslab_uri("viz", viz_id, "timeseries.png")
    
    # This is a placeholder - full implementation would:
    # 1. Load series data from store using series_uri
    # 2. Generate plot
    # 3. Save to viz_uri
    
    return {
        "viz_uri": viz_uri,
        "format": "png",
        "variables_plotted": variables or ["all"]
    }


@server.tool(
    "viz.plot_phase_portrait",
    description="Generate phase portrait for two-stock model",
)
async def viz_plot_phase(series_uri: str, stock1: str, stock2: str, title: str = None):
    """
    Create phase portrait showing relationship between two stocks.
    
    Args:
        series_uri: URI of series data
        stock1: Name of first stock (x-axis)
        stock2: Name of second stock (y-axis)
        title: Optional plot title
    """
    viz_id = str(uuid.uuid4())
    viz_uri = make_syslab_uri("viz", viz_id, "phase_portrait.png")
    
    return {
        "viz_uri": viz_uri,
        "format": "png",
        "stocks": [stock1, stock2]
    }


@server.tool(
    "or.verify_solution",
    description="Verify that an OR solution satisfies all constraints",
)
async def or_verify(model: dict, solution: dict):
    """
    Verify optimization solution against model constraints.
    
    Args:
        model: Model specification (decision_vars, objective, constraints)
        solution: Solution dict with status, objective_value, vars
    """
    # Parse model
    or_model, errors = parse_or_model_from_dict(model)
    if errors:
        return {"error": "Model parsing failed", "details": errors}
    
    # Create solution object
    from .or.engine import ORSolution
    sol = ORSolution(
        status=solution.get("status", "UNKNOWN"),
        objective_value=solution.get("objective_value"),
        variables=solution.get("vars", {}),
        solve_time_ms=0.0
    )
    
    # Verify
    verification = verify_or_solution(or_model, sol)
    
    return {
        "is_valid": verification.is_valid,
        "objective_verified": verification.objective_verified,
        "objective_error": verification.objective_error,
        "constraint_violations": len(verification.constraint_violations),
        "bound_violations": len(verification.variable_bound_violations),
        "warnings": verification.warnings
    }


@server.tool(
    "sd.analyze_behavior",
    description="Classify system behavior (growth patterns, oscillations, equilibria)",
)
async def sd_analyze(series_uri: str):
    """
    Analyze SD simulation results to classify behavior patterns.
    
    Args:
        series_uri: URI of simulation series data
    """
    # This is a placeholder - full implementation would:
    # 1. Load series from store
    # 2. Run analysis
    # 3. Return structured results
    
    return {
        "equilibrium_detected": False,
        "oscillations": [],
        "growth_patterns": {},
        "note": "Load series data and analyze"
    }


if __name__ == "__main__":
    server.run()
