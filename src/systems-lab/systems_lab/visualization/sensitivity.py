"""Sensitivity analysis visualization (tornado charts)."""
from __future__ import annotations
from typing import Dict, List, Optional
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np


def plot_tornado_chart(
    parameters: List[str],
    low_values: List[float],
    high_values: List[float],
    base_output: float,
    title: str = "Tornado Chart",
    output_path: Optional[str] = None,
    figsize: tuple = (10, 8)
) -> bytes:
    """
    Create a tornado chart showing parameter sensitivity.
    
    Args:
        parameters: List of parameter names
        low_values: Output values when parameter is at minimum
        high_values: Output values when parameter is at maximum
        base_output: Baseline output value
        title: Chart title
        output_path: Optional path to save file
        figsize: Figure size
    
    Returns:
        PNG image as bytes
    """
    fig, ax = plt.subplots(figsize=figsize)
    
    # Calculate deviations from base
    low_devs = [low - base_output for low in low_values]
    high_devs = [high - base_output for high in high_values]
    
    # Sort by total range (descending)
    ranges = [abs(high - low) for high, low in zip(high_devs, low_devs)]
    sorted_indices = sorted(range(len(ranges)), key=lambda i: ranges[i], reverse=True)
    
    sorted_params = [parameters[i] for i in sorted_indices]
    sorted_lows = [low_devs[i] for i in sorted_indices]
    sorted_highs = [high_devs[i] for i in sorted_indices]
    
    # Create horizontal bars
    y_pos = np.arange(len(sorted_params))
    
    for i, (param, low_dev, high_dev) in enumerate(zip(sorted_params, sorted_lows, sorted_highs)):
        # Determine colors (negative = blue, positive = red)
        low_color = '#4A90E2' if low_dev < 0 else '#E24A4A'
        high_color = '#4A90E2' if high_dev < 0 else '#E24A4A'
        
        # Draw bars
        ax.barh(i, low_dev, left=0, height=0.8, 
               color=low_color, alpha=0.7, edgecolor='black', linewidth=0.5)
        ax.barh(i, high_dev, left=0, height=0.8,
               color=high_color, alpha=0.7, edgecolor='black', linewidth=0.5)
    
    # Add baseline vertical line
    ax.axvline(x=0, color='black', linewidth=2, linestyle='--')
    
    # Labels and formatting
    ax.set_yticks(y_pos)
    ax.set_yticklabels(sorted_params)
    ax.set_xlabel('Change from Baseline', fontsize=12)
    ax.set_title(title, fontsize=14, fontweight='bold')
    ax.grid(axis='x', alpha=0.3, linestyle='--')
    
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


def plot_sensitivity_heatmap(
    param1_name: str,
    param2_name: str,
    param1_values: List[float],
    param2_values: List[float],
    output_grid: List[List[float]],
    title: str = "Parameter Interaction",
    output_path: Optional[str] = None,
    figsize: tuple = (10, 8)
) -> bytes:
    """
    Create a heatmap showing interaction between two parameters.
    
    Args:
        param1_name: First parameter name
        param2_name: Second parameter name
        param1_values: Values for first parameter
        param2_values: Values for second parameter
        output_grid: 2D grid of output values
        title: Chart title
        output_path: Optional path to save file
        figsize: Figure size
    
    Returns:
        PNG image as bytes
    """
    fig, ax = plt.subplots(figsize=figsize)
    
    # Create heatmap
    im = ax.imshow(output_grid, aspect='auto', origin='lower',
                   extent=[param2_values[0], param2_values[-1],
                          param1_values[0], param1_values[-1]],
                   cmap='viridis')
    
    # Add colorbar
    cbar = plt.colorbar(im, ax=ax)
    cbar.set_label('Output', fontsize=12)
    
    # Labels
    ax.set_xlabel(param2_name, fontsize=12)
    ax.set_ylabel(param1_name, fontsize=12)
    ax.set_title(title, fontsize=14, fontweight='bold')
    
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
