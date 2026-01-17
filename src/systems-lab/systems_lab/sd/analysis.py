"""Analysis and metrics for System Dynamics simulation results."""
from __future__ import annotations
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
import numpy as np
from scipy import signal
from scipy.stats import linregress


@dataclass
class EquilibriumPoint:
    """An equilibrium point detected in the simulation."""
    time_start: float
    time_end: float
    values: Dict[str, float]
    is_stable: bool
    confidence: float


@dataclass
class Oscillation:
    """An oscillation pattern detected in a variable."""
    variable: str
    period: float
    amplitude: float
    frequency: float
    damping_ratio: Optional[float]
    is_periodic: bool


@dataclass
class Peak:
    """A peak (maximum or minimum) in a time series."""
    time: float
    value: float
    is_maximum: bool


@dataclass
class GrowthPattern:
    """Characterized growth pattern."""
    pattern_type: str  # exponential, linear, logistic, overshoot, collapse
    confidence: float
    parameters: Dict[str, float]


@dataclass
class SimulationMetrics:
    """Complete set of metrics for a simulation."""
    equilibria: List[EquilibriumPoint]
    oscillations: List[Oscillation]
    peaks: Dict[str, List[Peak]]
    growth_patterns: Dict[str, GrowthPattern]
    final_values: Dict[str, float]
    summary: str


def analyze_simulation(time: List[float], stocks: Dict[str, List[float]], 
                      flows: Dict[str, List[float]] = None,
                      auxiliaries: Dict[str, List[float]] = None) -> SimulationMetrics:
    """
    Analyze simulation results and compute comprehensive metrics.
    
    Args:
        time: Time points
        stocks: Stock time series
        flows: Flow time series (optional)
        auxiliaries: Auxiliary time series (optional)
    
    Returns:
        SimulationMetrics with all detected patterns
    """
    flows = flows or {}
    auxiliaries = auxiliaries or {}
    
    # Detect equilibria
    equilibria = _detect_equilibria(time, stocks)
    
    # Detect oscillations
    oscillations = _detect_oscillations(time, stocks)
    
    # Find peaks
    peaks = _find_peaks(time, stocks)
    
    # Classify growth patterns
    growth_patterns = _classify_growth_patterns(time, stocks)
    
    # Get final values
    final_values = {name: series[-1] for name, series in stocks.items()}
    
    # Generate summary
    summary = _generate_summary(equilibria, oscillations, growth_patterns, final_values)
    
    return SimulationMetrics(
        equilibria=equilibria,
        oscillations=oscillations,
        peaks=peaks,
        growth_patterns=growth_patterns,
        final_values=final_values,
        summary=summary
    )


def _detect_equilibria(time: List[float], stocks: Dict[str, List[float]], 
                      threshold: float = 0.01, window: int = 10) -> List[EquilibriumPoint]:
    """
    Detect equilibrium points where stocks stabilize.
    
    Uses a sliding window to detect when relative change is below threshold.
    """
    equilibria = []
    
    if len(time) < window * 2:
        return equilibria
    
    # Check if system reaches equilibrium at the end
    all_stable = True
    equilibrium_values = {}
    
    for stock_name, series in stocks.items():
        series_array = np.array(series)
        
        # Check last window
        window_data = series_array[-window:]
        mean_value = np.mean(window_data)
        
        if mean_value == 0:
            # Check absolute change
            max_change = np.max(np.abs(np.diff(window_data)))
            is_stable = max_change < threshold
        else:
            # Check relative change
            relative_changes = np.abs(np.diff(window_data) / mean_value)
            max_relative_change = np.max(relative_changes)
            is_stable = max_relative_change < threshold
        
        if is_stable:
            equilibrium_values[stock_name] = float(mean_value)
        else:
            all_stable = False
            break
    
    if all_stable:
        # Determine when equilibrium started
        equilibrium_start_idx = len(time) - window
        
        # Try to extend backwards
        for idx in range(len(time) - window - 1, window, -1):
            window_stable = True
            for stock_name, series in stocks.items():
                series_array = np.array(series)
                window_data = series_array[idx:idx + window]
                mean_value = np.mean(window_data)
                
                if mean_value == 0:
                    max_change = np.max(np.abs(np.diff(window_data)))
                    if max_change >= threshold:
                        window_stable = False
                        break
                else:
                    relative_changes = np.abs(np.diff(window_data) / mean_value)
                    if np.max(relative_changes) >= threshold:
                        window_stable = False
                        break
            
            if window_stable:
                equilibrium_start_idx = idx
            else:
                break
        
        equilibria.append(EquilibriumPoint(
            time_start=time[equilibrium_start_idx],
            time_end=time[-1],
            values=equilibrium_values,
            is_stable=True,
            confidence=0.9
        ))
    
    return equilibria


def _detect_oscillations(time: List[float], stocks: Dict[str, List[float]]) -> List[Oscillation]:
    """
    Detect oscillatory behavior in stock variables.
    
    Uses FFT to find dominant frequencies and checks for periodicity.
    """
    oscillations = []
    
    for stock_name, series in stocks.items():
        series_array = np.array(series)
        
        # Skip if series is too short or constant
        if len(series_array) < 20 or np.std(series_array) < 1e-6:
            continue
        
        # Detrend the series
        detrended = signal.detrend(series_array)
        
        # Find peaks in the detrended signal
        peaks_idx, properties = signal.find_peaks(detrended, prominence=np.std(detrended) * 0.5)
        
        if len(peaks_idx) >= 3:
            # Calculate periods between peaks
            peak_times = [time[i] for i in peaks_idx]
            periods = np.diff(peak_times)
            
            # Check if periods are consistent (periodic)
            if len(periods) >= 2:
                period_std = np.std(periods)
                period_mean = np.mean(periods)
                
                # If period variation is small, it's periodic
                if period_mean > 0 and period_std / period_mean < 0.3:
                    # Calculate amplitude
                    amplitude = np.mean([detrended[i] for i in peaks_idx])
                    
                    # Calculate damping ratio (if amplitude is decreasing)
                    amplitudes = [detrended[i] for i in peaks_idx]
                    if len(amplitudes) >= 3:
                        slope, _, _, _, _ = linregress(peak_times, np.log(np.abs(amplitudes) + 1e-10))
                        damping_ratio = -slope if slope < 0 else None
                    else:
                        damping_ratio = None
                    
                    oscillations.append(Oscillation(
                        variable=stock_name,
                        period=float(period_mean),
                        amplitude=float(amplitude),
                        frequency=1.0 / period_mean,
                        damping_ratio=damping_ratio,
                        is_periodic=True
                    ))
    
    return oscillations


def _find_peaks(time: List[float], stocks: Dict[str, List[float]]) -> Dict[str, List[Peak]]:
    """
    Find local maxima and minima in stock time series.
    """
    peaks_dict = {}
    
    for stock_name, series in stocks.items():
        series_array = np.array(series)
        
        # Find maxima
        maxima_idx, _ = signal.find_peaks(series_array)
        # Find minima (peaks of negative signal)
        minima_idx, _ = signal.find_peaks(-series_array)
        
        peaks = []
        for idx in maxima_idx:
            peaks.append(Peak(
                time=time[idx],
                value=series_array[idx],
                is_maximum=True
            ))
        
        for idx in minima_idx:
            peaks.append(Peak(
                time=time[idx],
                value=series_array[idx],
                is_maximum=False
            ))
        
        # Sort by time
        peaks.sort(key=lambda p: p.time)
        peaks_dict[stock_name] = peaks
    
    return peaks_dict


def _classify_growth_patterns(time: List[float], stocks: Dict[str, List[float]]) -> Dict[str, GrowthPattern]:
    """
    Classify the growth pattern of each stock.
    
    Patterns: exponential, linear, logistic, overshoot-collapse, oscillating, stable
    """
    patterns = {}
    
    for stock_name, series in stocks.items():
        series_array = np.array(series)
        time_array = np.array(time)
        
        # Skip if too short
        if len(series_array) < 10:
            continue
        
        # Check for stability (no growth)
        if np.std(series_array) / (np.mean(np.abs(series_array)) + 1e-10) < 0.05:
            patterns[stock_name] = GrowthPattern(
                pattern_type="stable",
                confidence=0.95,
                parameters={"mean": float(np.mean(series_array))}
            )
            continue
        
        # Check for exponential growth
        if np.all(series_array > 0):
            log_series = np.log(series_array + 1e-10)
            slope, intercept, r_value, _, _ = linregress(time_array, log_series)
            
            if r_value**2 > 0.95 and slope > 0.01:
                patterns[stock_name] = GrowthPattern(
                    pattern_type="exponential",
                    confidence=float(r_value**2),
                    parameters={"growth_rate": float(slope), "initial": float(np.exp(intercept))}
                )
                continue
        
        # Check for linear growth
        slope, intercept, r_value, _, _ = linregress(time_array, series_array)
        if r_value**2 > 0.95:
            patterns[stock_name] = GrowthPattern(
                pattern_type="linear",
                confidence=float(r_value**2),
                parameters={"slope": float(slope), "intercept": float(intercept)}
            )
            continue
        
        # Check for logistic growth (S-curve)
        # Logistic has slow start, fast middle, slow end
        first_third = series_array[:len(series_array)//3]
        middle_third = series_array[len(series_array)//3:2*len(series_array)//3]
        last_third = series_array[2*len(series_array)//3:]
        
        first_growth = np.mean(np.diff(first_third))
        middle_growth = np.mean(np.diff(middle_third))
        last_growth = np.mean(np.diff(last_third))
        
        if (first_growth > 0 and middle_growth > first_growth * 1.5 and 
            last_growth < middle_growth * 0.5 and last_growth > 0):
            patterns[stock_name] = GrowthPattern(
                pattern_type="logistic",
                confidence=0.75,
                parameters={
                    "carrying_capacity": float(series_array[-1]),
                    "initial": float(series_array[0])
                }
            )
            continue
        
        # Check for overshoot and collapse
        max_idx = np.argmax(series_array)
        max_value = series_array[max_idx]
        final_value = series_array[-1]
        
        if max_idx < len(series_array) * 0.8 and final_value < max_value * 0.7:
            patterns[stock_name] = GrowthPattern(
                pattern_type="overshoot_collapse",
                confidence=0.80,
                parameters={
                    "peak_value": float(max_value),
                    "peak_time": float(time[max_idx]),
                    "final_value": float(final_value)
                }
            )
            continue
        
        # Default: complex/other
        patterns[stock_name] = GrowthPattern(
            pattern_type="complex",
            confidence=0.5,
            parameters={}
        )
    
    return patterns


def _generate_summary(equilibria: List[EquilibriumPoint], 
                     oscillations: List[Oscillation],
                     growth_patterns: Dict[str, GrowthPattern],
                     final_values: Dict[str, float]) -> str:
    """Generate human-readable summary of simulation behavior."""
    summary_parts = []
    
    # Equilibrium summary
    if equilibria:
        eq = equilibria[0]
        summary_parts.append(
            f"System reaches equilibrium at t={eq.time_start:.1f} with values: " +
            ", ".join([f"{name}={value:.2f}" for name, value in eq.values.items()])
        )
    else:
        summary_parts.append("System does not reach equilibrium")
    
    # Oscillation summary
    if oscillations:
        summary_parts.append(
            f"Oscillations detected: " +
            ", ".join([f"{osc.variable} (period={osc.period:.1f})" for osc in oscillations])
        )
    
    # Growth pattern summary
    pattern_counts = {}
    for pattern in growth_patterns.values():
        pattern_counts[pattern.pattern_type] = pattern_counts.get(pattern.pattern_type, 0) + 1
    
    if pattern_counts:
        summary_parts.append(
            "Growth patterns: " +
            ", ".join([f"{count}x {ptype}" for ptype, count in pattern_counts.items()])
        )
    
    # Final values
    summary_parts.append(
        "Final values: " +
        ", ".join([f"{name}={value:.2f}" for name, value in final_values.items()])
    )
    
    return ". ".join(summary_parts) + "."
