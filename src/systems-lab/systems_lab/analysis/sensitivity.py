"""Sensitivity analysis for SD and OR models."""
from __future__ import annotations
from typing import Any, Callable, Dict, List, Optional, Tuple
from dataclasses import dataclass
import numpy as np
from scipy.stats import qmc


@dataclass
class SensitivityResult:
    """Result of sensitivity analysis for a single parameter."""
    parameter: str
    base_value: float
    test_values: List[float]
    output_values: List[float]
    output_metric: str
    sensitivity: float  # Rate of change
    elasticity: float  # Percentage change ratio


@dataclass
class SensitivityAnalysis:
    """Complete sensitivity analysis results."""
    results: List[SensitivityResult]
    method: str
    num_samples: int
    parameter_ranges: Dict[str, Tuple[float, float]]
    base_output: float
    summary: str


def one_at_a_time_sensitivity(
    model_func: Callable[[Dict[str, float]], float],
    parameters: Dict[str, float],
    parameter_ranges: Dict[str, Tuple[float, float]],
    num_samples: int = 10,
    output_metric_name: str = "output"
) -> SensitivityAnalysis:
    """
    Perform one-at-a-time (OAT) sensitivity analysis.
    
    Varies each parameter independently while holding others constant.
    
    Args:
        model_func: Function that takes parameters dict and returns a scalar metric
        parameters: Base parameter values
        parameter_ranges: Dict mapping parameter name to (min, max) tuple
        num_samples: Number of samples per parameter
        output_metric_name: Name of the output metric being analyzed
    
    Returns:
        SensitivityAnalysis results
    """
    # Evaluate base case
    base_output = model_func(parameters.copy())
    
    results = []
    
    for param_name, (param_min, param_max) in parameter_ranges.items():
        if param_name not in parameters:
            continue
        
        base_value = parameters[param_name]
        
        # Generate test values
        test_values = np.linspace(param_min, param_max, num_samples).tolist()
        output_values = []
        
        for test_value in test_values:
            # Create modified parameters
            test_params = parameters.copy()
            test_params[param_name] = test_value
            
            # Run model
            output = model_func(test_params)
            output_values.append(output)
        
        # Calculate sensitivity metrics
        # Linear sensitivity: dOutput/dParam
        param_range = param_max - param_min
        output_range = max(output_values) - min(output_values)
        sensitivity = output_range / param_range if param_range > 0 else 0
        
        # Elasticity: (% change in output) / (% change in parameter)
        if base_value != 0 and base_output != 0:
            # Find closest test value to base
            idx_base = min(range(len(test_values)), key=lambda i: abs(test_values[i] - base_value))
            
            # Use a test point that's different from base
            if idx_base < len(test_values) - 1:
                idx_test = idx_base + 1
            else:
                idx_test = idx_base - 1
            
            param_pct_change = (test_values[idx_test] - base_value) / base_value
            output_pct_change = (output_values[idx_test] - base_output) / base_output
            
            elasticity = output_pct_change / param_pct_change if param_pct_change != 0 else 0
        else:
            elasticity = 0
        
        results.append(SensitivityResult(
            parameter=param_name,
            base_value=base_value,
            test_values=test_values,
            output_values=output_values,
            output_metric=output_metric_name,
            sensitivity=float(sensitivity),
            elasticity=float(elasticity)
        ))
    
    # Sort by absolute sensitivity (descending)
    results.sort(key=lambda r: abs(r.sensitivity), reverse=True)
    
    # Generate summary
    if results:
        most_sensitive = results[0]
        summary = (
            f"Most sensitive parameter: {most_sensitive.parameter} "
            f"(sensitivity={most_sensitive.sensitivity:.3f}, "
            f"elasticity={most_sensitive.elasticity:.3f})"
        )
    else:
        summary = "No sensitivity results"
    
    return SensitivityAnalysis(
        results=results,
        method="one_at_a_time",
        num_samples=num_samples,
        parameter_ranges=parameter_ranges,
        base_output=base_output,
        summary=summary
    )


def latin_hypercube_sensitivity(
    model_func: Callable[[Dict[str, float]], float],
    parameters: Dict[str, float],
    parameter_ranges: Dict[str, Tuple[float, float]],
    num_samples: int = 100,
    output_metric_name: str = "output"
) -> Dict[str, Any]:
    """
    Perform Latin Hypercube Sampling (LHS) for sensitivity analysis.
    
    Efficiently explores the parameter space using stratified sampling.
    
    Args:
        model_func: Function that takes parameters dict and returns a scalar metric
        parameters: Base parameter values
        parameter_ranges: Dict mapping parameter name to (min, max) tuple
        num_samples: Number of LHS samples
        output_metric_name: Name of the output metric
    
    Returns:
        Dict with samples, outputs, and variance-based importance measures
    """
    # Get parameters to vary
    param_names = list(parameter_ranges.keys())
    n_params = len(param_names)
    
    if n_params == 0:
        return {
            "method": "latin_hypercube",
            "num_samples": 0,
            "error": "No parameters specified"
        }
    
    # Generate Latin Hypercube samples
    sampler = qmc.LatinHypercube(d=n_params)
    unit_samples = sampler.random(n=num_samples)
    
    # Scale samples to parameter ranges
    scaled_samples = []
    for i in range(num_samples):
        sample_params = parameters.copy()
        for j, param_name in enumerate(param_names):
            param_min, param_max = parameter_ranges[param_name]
            sample_params[param_name] = param_min + unit_samples[i, j] * (param_max - param_min)
        scaled_samples.append(sample_params)
    
    # Evaluate model for each sample
    outputs = []
    for sample in scaled_samples:
        output = model_func(sample)
        outputs.append(output)
    
    outputs_array = np.array(outputs)
    
    # Calculate variance-based sensitivity indices
    # This is a simplified version - full Sobol indices require more samples
    output_variance = np.var(outputs_array)
    
    # For each parameter, calculate correlation with output
    sensitivities = {}
    for j, param_name in enumerate(param_names):
        param_values = [scaled_samples[i][param_name] for i in range(num_samples)]
        correlation = np.corrcoef(param_values, outputs)[0, 1]
        
        # Estimate first-order sensitivity index (simplified)
        # True Sobol index requires conditional variance calculation
        sensitivities[param_name] = {
            "correlation": float(correlation),
            "importance": float(correlation**2)  # R² as proxy for sensitivity
        }
    
    # Sort parameters by importance
    sorted_params = sorted(sensitivities.items(), key=lambda x: abs(x[1]["importance"]), reverse=True)
    
    return {
        "method": "latin_hypercube",
        "num_samples": num_samples,
        "output_metric": output_metric_name,
        "outputs": {
            "mean": float(np.mean(outputs_array)),
            "std": float(np.std(outputs_array)),
            "min": float(np.min(outputs_array)),
            "max": float(np.max(outputs_array)),
            "variance": float(output_variance)
        },
        "sensitivities": dict(sorted_params),
        "samples": [
            {
                "parameters": {name: sample[name] for name in param_names},
                "output": float(output)
            }
            for sample, output in zip(scaled_samples, outputs)
        ],
        "summary": f"Most important: {sorted_params[0][0]} (R²={sorted_params[0][1]['importance']:.3f})" if sorted_params else "No results"
    }


def tornado_chart_data(sensitivity_analysis: SensitivityAnalysis) -> Dict[str, Any]:
    """
    Prepare data for tornado chart visualization.
    
    A tornado chart shows the range of outputs for each parameter variation.
    
    Args:
        sensitivity_analysis: Results from OAT analysis
    
    Returns:
        Dict with data formatted for tornado chart
    """
    data = {
        "parameters": [],
        "low_values": [],
        "high_values": [],
        "base_output": sensitivity_analysis.base_output
    }
    
    for result in sensitivity_analysis.results:
        data["parameters"].append(result.parameter)
        data["low_values"].append(min(result.output_values))
        data["high_values"].append(max(result.output_values))
    
    return data


def parameter_interaction_analysis(
    model_func: Callable[[Dict[str, float]], float],
    parameters: Dict[str, float],
    param1: str,
    param2: str,
    param1_range: Tuple[float, float],
    param2_range: Tuple[float, float],
    num_samples: int = 10
) -> Dict[str, Any]:
    """
    Analyze interaction between two parameters.
    
    Creates a 2D grid of parameter values and evaluates model at each point.
    
    Args:
        model_func: Function that takes parameters dict and returns a scalar metric
        parameters: Base parameter values
        param1: First parameter name
        param2: Second parameter name
        param1_range: (min, max) for first parameter
        param2_range: (min, max) for second parameter
        num_samples: Grid resolution (num_samples x num_samples points)
    
    Returns:
        Dict with grid data for visualization
    """
    param1_values = np.linspace(param1_range[0], param1_range[1], num_samples)
    param2_values = np.linspace(param2_range[0], param2_range[1], num_samples)
    
    output_grid = np.zeros((num_samples, num_samples))
    
    for i, p1_val in enumerate(param1_values):
        for j, p2_val in enumerate(param2_values):
            test_params = parameters.copy()
            test_params[param1] = p1_val
            test_params[param2] = p2_val
            
            output_grid[i, j] = model_func(test_params)
    
    return {
        "param1": param1,
        "param2": param2,
        "param1_values": param1_values.tolist(),
        "param2_values": param2_values.tolist(),
        "output_grid": output_grid.tolist(),
        "interaction_strength": float(np.std(output_grid))
    }
