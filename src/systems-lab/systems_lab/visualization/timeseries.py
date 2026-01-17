"""Time series visualization for SD simulation results."""
from __future__ import annotations
from typing import Dict, List, Optional
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt


def plot_time_series(
    time: List[float],
    series: Dict[str, List[float]],
    title: str = "Time Series",
    xlabel: str = "Time",
    ylabel: str = "Value",
    output_path: Optional[str] = None,
    figsize: tuple = (10, 6),
    show_grid: bool = True
) -> bytes:
    """
    Plot time series data.
    
    Args:
        time: Time points
        series: Dict mapping series name to values
        title: Plot title
        xlabel: X-axis label
        ylabel: Y-axis label
        output_path: Optional path to save file
        figsize: Figure size (width, height)
        show_grid: Whether to show grid
    
    Returns:
        PNG image as bytes
    """
    fig, ax = plt.subplots(figsize=figsize)
    
    # Plot each series
    for name, values in series.items():
        ax.plot(time, values, label=name, linewidth=2)
    
    ax.set_xlabel(xlabel, fontsize=12)
    ax.set_ylabel(ylabel, fontsize=12)
    ax.set_title(title, fontsize=14, fontweight='bold')
    
    if show_grid:
        ax.grid(True, alpha=0.3, linestyle='--')
    
    # Add legend
    if len(series) > 1:
        ax.legend(loc='best', framealpha=0.9)
    
    plt.tight_layout()
    
    # Save or return bytes
    if output_path:
        plt.savefig(output_path, dpi=150, bbox_inches='tight')
        with open(output_path, 'rb') as f:
            img_bytes = f.read()
    else:
        import io
        buf = io.BytesIO()
        plt.savefig(buf, format='png', dpi=150, bbox_inches='tight')
        buf.seek(0)
        img_bytes = buf.read()
    
    plt.close(fig)
    return img_bytes


def plot_multiple_scenarios(
    time: List[float],
    scenarios: Dict[str, Dict[str, List[float]]],
    variable_name: str,
    title: Optional[str] = None,
    output_path: Optional[str] = None,
    figsize: tuple = (10, 6)
) -> bytes:
    """
    Plot the same variable across multiple scenarios.
    
    Args:
        time: Time points
        scenarios: Dict mapping scenario name to {variable: values}
        variable_name: Name of variable to plot
        title: Optional plot title
        output_path: Optional path to save file
        figsize: Figure size
    
    Returns:
        PNG image as bytes
    """
    fig, ax = plt.subplots(figsize=figsize)
    
    for scenario_name, variables in scenarios.items():
        if variable_name in variables:
            ax.plot(time, variables[variable_name], 
                   label=scenario_name, linewidth=2)
    
    ax.set_xlabel("Time", fontsize=12)
    ax.set_ylabel(variable_name, fontsize=12)
    ax.set_title(title or f"{variable_name} Across Scenarios", 
                fontsize=14, fontweight='bold')
    ax.grid(True, alpha=0.3, linestyle='--')
    ax.legend(loc='best', framealpha=0.9)
    
    plt.tight_layout()
    
    if output_path:
        plt.savefig(output_path, dpi=150, bbox_inches='tight')
        with open(output_path, 'rb') as f:
            img_bytes = f.read()
    else:
        import io
        buf = io.BytesIO()
        plt.savefig(buf, format='png', dpi=150, bbox_inches='tight')
        buf.seek(0)
        img_bytes = buf.read()
    
    plt.close(fig)
    return img_bytes
