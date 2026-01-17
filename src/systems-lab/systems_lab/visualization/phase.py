"""Phase portrait visualization for 2-stock SD models."""
from __future__ import annotations
from typing import Dict, List, Optional, Tuple
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt


def plot_phase_portrait(
    stock1_name: str,
    stock2_name: str,
    stock1_values: List[float],
    stock2_values: List[float],
    title: Optional[str] = None,
    equilibrium_point: Optional[Tuple[float, float]] = None,
    output_path: Optional[str] = None,
    figsize: tuple = (10, 10)
) -> bytes:
    """
    Create a phase portrait for two stocks.
    
    Args:
        stock1_name: Name of first stock (x-axis)
        stock2_name: Name of second stock (y-axis)
        stock1_values: Time series for first stock
        stock2_values: Time series for second stock
        title: Optional plot title
        equilibrium_point: Optional (x, y) equilibrium point to mark
        output_path: Optional path to save file
        figsize: Figure size
    
    Returns:
        PNG image as bytes
    """
    fig, ax = plt.subplots(figsize=figsize)
    
    # Plot trajectory
    ax.plot(stock1_values, stock2_values, 'b-', linewidth=2, alpha=0.7, label='Trajectory')
    
    # Mark start and end points
    ax.plot(stock1_values[0], stock2_values[0], 'go', markersize=12, 
           label='Start', zorder=5)
    ax.plot(stock1_values[-1], stock2_values[-1], 'ro', markersize=12,
           label='End', zorder=5)
    
    # Mark equilibrium if provided
    if equilibrium_point is not None:
        ax.plot(equilibrium_point[0], equilibrium_point[1], 'k*',
               markersize=20, label='Equilibrium', zorder=5)
    
    # Add directional arrows along trajectory
    n_arrows = min(10, len(stock1_values) // 10)
    if n_arrows > 0:
        arrow_indices = np.linspace(0, len(stock1_values) - 2, n_arrows, dtype=int)
        for idx in arrow_indices:
            dx = stock1_values[idx + 1] - stock1_values[idx]
            dy = stock2_values[idx + 1] - stock2_values[idx]
            ax.arrow(stock1_values[idx], stock2_values[idx], dx, dy,
                    head_width=0.02 * (max(stock1_values) - min(stock1_values)),
                    head_length=0.02 * (max(stock2_values) - min(stock2_values)),
                    fc='blue', ec='blue', alpha=0.6)
    
    # Labels and formatting
    ax.set_xlabel(stock1_name, fontsize=14)
    ax.set_ylabel(stock2_name, fontsize=14)
    ax.set_title(title or f"Phase Portrait: {stock1_name} vs {stock2_name}",
                fontsize=16, fontweight='bold')
    ax.grid(True, alpha=0.3, linestyle='--')
    ax.legend(loc='best', framealpha=0.9, fontsize=12)
    
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
