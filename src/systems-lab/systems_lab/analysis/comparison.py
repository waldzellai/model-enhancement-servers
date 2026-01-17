"""Multi-scenario comparison tools."""
from __future__ import annotations
from typing import Any, Dict, List
from dataclasses import dataclass
import numpy as np


@dataclass
class ScenarioComparison:
    """Comparison of multiple simulation scenarios."""
    scenario_names: List[str]
    metrics: Dict[str, List[float]]  # metric_name -> list of values per scenario
    differences: Dict[str, Dict[str, float]]  # metric_name -> {scenario_pair: difference}
    summary: str


def compare_scenarios(scenarios: List[Dict[str, Any]], metric_names: List[str] = None) -> ScenarioComparison:
    """
    Compare multiple simulation scenarios.
    
    Args:
        scenarios: List of dicts, each with 'name' and 'metrics' keys
        metric_names: Optional list of specific metrics to compare
    
    Returns:
        ScenarioComparison with differences and rankings
    """
    if not scenarios:
        return ScenarioComparison(
            scenario_names=[],
            metrics={},
            differences={},
            summary="No scenarios to compare"
        )
    
    scenario_names = [s.get('name', f'Scenario {i}') for i, s in enumerate(scenarios)]
    
    # Extract metrics
    all_metrics = {}
    if metric_names is None:
        # Get all unique metric names
        metric_set = set()
        for scenario in scenarios:
            if 'metrics' in scenario:
                metric_set.update(scenario['metrics'].keys())
        metric_names = sorted(list(metric_set))
    
    for metric_name in metric_names:
        values = []
        for scenario in scenarios:
            metrics = scenario.get('metrics', {})
            value = metrics.get(metric_name, float('nan'))
            values.append(value)
        all_metrics[metric_name] = values
    
    # Calculate differences
    differences = {}
    for metric_name, values in all_metrics.items():
        metric_diffs = {}
        for i in range(len(values)):
            for j in range(i + 1, len(values)):
                pair_name = f"{scenario_names[i]}_vs_{scenario_names[j]}"
                diff = values[j] - values[i]
                if not np.isnan(diff):
                    metric_diffs[pair_name] = float(diff)
        differences[metric_name] = metric_diffs
    
    # Generate summary
    if all_metrics:
        first_metric = list(all_metrics.keys())[0]
        values = all_metrics[first_metric]
        max_idx = np.nanargmax(values)
        min_idx = np.nanargmin(values)
        
        summary = (
            f"For {first_metric}: "
            f"highest = {scenario_names[max_idx]} ({values[max_idx]:.2f}), "
            f"lowest = {scenario_names[min_idx]} ({values[min_idx]:.2f})"
        )
    else:
        summary = "No metrics available"
    
    return ScenarioComparison(
        scenario_names=scenario_names,
        metrics=all_metrics,
        differences=differences,
        summary=summary
    )
