"""System Dynamics simulation engine with PySD and custom simulator."""
from __future__ import annotations
from typing import Any, Dict, List, Optional, Tuple
from dataclasses import dataclass
import numpy as np
from sympy import Symbol

from .parsers import SDModel


@dataclass
class SimulationResult:
    """Result of an SD simulation."""
    time: List[float]
    stocks: Dict[str, List[float]]
    flows: Dict[str, List[float]]
    auxiliaries: Dict[str, List[float]]
    method: str
    dt: float
    success: bool
    warnings: List[str]


class SDEngine:
    """Engine for simulating System Dynamics models."""
    
    def __init__(self, method: str = "euler"):
        """
        Initialize SD engine.
        
        Args:
            method: Integration method ('euler', 'rk4')
        """
        if method not in ["euler", "rk4"]:
            raise ValueError(f"Unknown integration method: {method}")
        self.method = method
    
    def simulate(self, model: SDModel, t_start: float = 0.0, t_end: float = 100.0, 
                 dt: float = 1.0) -> Tuple[SimulationResult, List[str]]:
        """
        Simulate an SD model.
        
        Args:
            model: SDModel specification
            t_start: Start time
            t_end: End time
            dt: Time step
        
        Returns:
            Tuple of (result, errors)
        """
        errors = []
        warnings = []
        
        try:
            # Initialize state
            n_steps = int((t_end - t_start) / dt) + 1
            time_points = [t_start + i * dt for i in range(n_steps)]
            
            # Initialize stocks
            stock_values = {stock.name: [stock.initial] for stock in model.stocks}
            stock_current = {stock.name: stock.initial for stock in model.stocks}
            
            # Initialize flow and auxiliary tracking
            flow_values = {flow.name: [] for flow in model.flows}
            auxiliary_values = {aux.name: [] for aux in model.auxiliaries}
            
            # Get evaluation order for auxiliaries
            aux_order = model.get_evaluation_order()
            
            # Simulation loop
            for i in range(1, n_steps):
                t = time_points[i - 1]
                
                # Compute flows and auxiliaries for this time step
                if self.method == "euler":
                    flows, auxiliaries = self._evaluate_step(
                        model, stock_current, t, aux_order
                    )
                    
                    # Update stocks using Euler method
                    stock_next = self._euler_step(model, stock_current, flows, dt)
                    
                elif self.method == "rk4":
                    # RK4 integration
                    stock_next, flows, auxiliaries = self._rk4_step(
                        model, stock_current, t, dt, aux_order
                    )
                
                # Enforce non-negativity constraints
                for stock in model.stocks:
                    if stock.non_negative and stock_next[stock.name] < 0:
                        warnings.append(
                            f"Stock {stock.name} went negative at t={t:.2f}, "
                            f"clamping to 0"
                        )
                        stock_next[stock.name] = 0.0
                
                # Record values
                for stock_name, value in stock_next.items():
                    stock_values[stock_name].append(value)
                
                for flow_name, value in flows.items():
                    flow_values[flow_name].append(value)
                
                for aux_name, value in auxiliaries.items():
                    auxiliary_values[aux_name].append(value)
                
                # Update current state
                stock_current = stock_next
            
            result = SimulationResult(
                time=time_points,
                stocks=stock_values,
                flows=flow_values,
                auxiliaries=auxiliary_values,
                method=self.method,
                dt=dt,
                success=True,
                warnings=warnings
            )
            
            return result, []
            
        except Exception as e:
            return SimulationResult(
                time=[],
                stocks={},
                flows={},
                auxiliaries={},
                method=self.method,
                dt=dt,
                success=False,
                warnings=[]
            ), [f"Simulation error: {str(e)}"]
    
    def _evaluate_step(self, model: SDModel, stocks: Dict[str, float], 
                      t: float, aux_order: List[str]) -> Tuple[Dict[str, float], Dict[str, float]]:
        """
        Evaluate flows and auxiliaries for current state.
        
        Returns:
            Tuple of (flows, auxiliaries) dicts
        """
        # Build evaluation context
        context = {}
        context.update(model.parameters)
        context.update(stocks)
        context['t'] = t
        context['time'] = t
        
        # Add table functions as callable
        for table in model.tables:
            # Create a closure to capture table
            def make_table_func(tbl):
                return lambda x: tbl.lookup(x)
            context[table.name] = make_table_func(table)
        
        # Evaluate auxiliaries in topological order
        auxiliaries = {}
        for aux_name in aux_order:
            aux = next(a for a in model.auxiliaries if a.name == aux_name)
            expr = aux.parse_expression(
                set(stocks.keys()),
                set(model.get_auxiliary_names()),
                set(model.parameters.keys()),
                set(model.get_flow_names())
            )
            
            # Substitute known values
            for var_name, var_value in context.items():
                if var_name in [str(s) for s in expr.free_symbols]:
                    expr = expr.subs(Symbol(var_name), var_value)
            
            # Also substitute already-computed auxiliaries
            for computed_aux, computed_val in auxiliaries.items():
                if computed_aux in [str(s) for s in expr.free_symbols]:
                    expr = expr.subs(Symbol(computed_aux), computed_val)
            
            try:
                value = float(expr.evalf())
                auxiliaries[aux_name] = value
                context[aux_name] = value
            except Exception as e:
                raise ValueError(f"Error evaluating auxiliary {aux_name}: {e}")
        
        # Evaluate flows
        flows = {}
        for flow in model.flows:
            expr = flow.parse_expression(
                set(stocks.keys()),
                set(auxiliaries.keys()),
                set(model.parameters.keys()),
                set()
            )
            
            # Substitute all known values
            for var_name, var_value in context.items():
                if var_name in [str(s) for s in expr.free_symbols]:
                    expr = expr.subs(Symbol(var_name), var_value)
            
            for aux_name, aux_value in auxiliaries.items():
                if aux_name in [str(s) for s in expr.free_symbols]:
                    expr = expr.subs(Symbol(aux_name), aux_value)
            
            try:
                value = float(expr.evalf())
                
                # Enforce non-negativity for flows if specified
                if flow.non_negative and value < 0:
                    value = 0.0
                
                flows[flow.name] = value
            except Exception as e:
                raise ValueError(f"Error evaluating flow {flow.name}: {e}")
        
        return flows, auxiliaries
    
    def _euler_step(self, model: SDModel, stocks: Dict[str, float], 
                   flows: Dict[str, float], dt: float) -> Dict[str, float]:
        """
        Update stocks using Euler method.
        
        Returns:
            New stock values
        """
        stock_next = stocks.copy()
        
        # Apply flows to stocks
        for flow in model.flows:
            flow_value = flows[flow.name]
            
            if flow.from_stock:
                stock_next[flow.from_stock] -= flow_value * dt
            
            if flow.to_stock:
                stock_next[flow.to_stock] += flow_value * dt
        
        return stock_next
    
    def _rk4_step(self, model: SDModel, stocks: Dict[str, float], 
                  t: float, dt: float, aux_order: List[str]) -> Tuple[Dict[str, float], Dict[str, float], Dict[str, float]]:
        """
        Update stocks using RK4 method.
        
        Returns:
            Tuple of (new_stocks, flows, auxiliaries)
        """
        # k1: derivative at current point
        flows_1, aux_1 = self._evaluate_step(model, stocks, t, aux_order)
        k1 = self._compute_derivatives(model, flows_1)
        
        # k2: derivative at midpoint with k1
        stocks_mid1 = {name: stocks[name] + 0.5 * dt * k1[name] 
                      for name in stocks}
        flows_2, aux_2 = self._evaluate_step(model, stocks_mid1, t + 0.5 * dt, aux_order)
        k2 = self._compute_derivatives(model, flows_2)
        
        # k3: derivative at midpoint with k2
        stocks_mid2 = {name: stocks[name] + 0.5 * dt * k2[name] 
                      for name in stocks}
        flows_3, aux_3 = self._evaluate_step(model, stocks_mid2, t + 0.5 * dt, aux_order)
        k3 = self._compute_derivatives(model, flows_3)
        
        # k4: derivative at endpoint with k3
        stocks_end = {name: stocks[name] + dt * k3[name] 
                     for name in stocks}
        flows_4, aux_4 = self._evaluate_step(model, stocks_end, t + dt, aux_order)
        k4 = self._compute_derivatives(model, flows_4)
        
        # Combine using RK4 formula
        stock_next = {
            name: stocks[name] + (dt / 6.0) * (k1[name] + 2*k2[name] + 2*k3[name] + k4[name])
            for name in stocks
        }
        
        # Return final flows and auxiliaries (using last evaluation)
        return stock_next, flows_4, aux_4
    
    def _compute_derivatives(self, model: SDModel, flows: Dict[str, float]) -> Dict[str, float]:
        """
        Compute derivatives (d/dt) for all stocks given current flows.
        
        Returns:
            Dict mapping stock name to derivative
        """
        derivatives = {stock.name: 0.0 for stock in model.stocks}
        
        for flow in model.flows:
            flow_value = flows[flow.name]
            
            if flow.from_stock:
                derivatives[flow.from_stock] -= flow_value
            
            if flow.to_stock:
                derivatives[flow.to_stock] += flow_value
        
        return derivatives


def load_xmile_model(xmile_path: str) -> Tuple[Optional[SDModel], List[str]]:
    """
    Load an SD model from XMILE file using PySD.
    
    Args:
        xmile_path: Path to XMILE file
    
    Returns:
        Tuple of (model, errors). Model is None if loading fails.
    """
    try:
        import pysd
        
        # Load model with PySD
        pysd_model = pysd.read_xmile(xmile_path)
        
        # Convert to our internal representation
        # This is a simplified conversion - full conversion would need to
        # extract the stock-flow structure from PySD's internal representation
        
        # For now, we'll return an error indicating this needs implementation
        return None, [
            "XMILE conversion not yet fully implemented. "
            "PySD loaded successfully, but conversion to internal format needs completion. "
            "Use JSON format for now, or simulate directly with PySD."
        ]
        
    except ImportError:
        return None, ["PySD not installed. Install with: pip install pysd"]
    except Exception as e:
        return None, [f"Error loading XMILE file: {str(e)}"]


def simulate_with_pysd(xmile_path: str, t_start: float = 0.0, t_end: float = 100.0,
                       dt: float = 1.0) -> Tuple[Optional[Dict[str, Any]], List[str]]:
    """
    Simulate XMILE model directly with PySD (bypass internal format).
    
    Args:
        xmile_path: Path to XMILE file
        t_start: Start time
        t_end: End time
        dt: Time step
    
    Returns:
        Tuple of (results_dict, errors)
    """
    try:
        import pysd
        import pandas as pd
        
        # Load and run model
        model = pysd.read_xmile(xmile_path)
        
        # Run simulation
        results = model.run(
            initial_condition='current',
            return_columns=model.components.index.tolist(),
            return_timestamps=np.arange(t_start, t_end + dt, dt)
        )
        
        # Convert to our format
        result_dict = {
            'time': results.index.tolist(),
            'variables': {}
        }
        
        for col in results.columns:
            result_dict['variables'][col] = results[col].tolist()
        
        return result_dict, []
        
    except ImportError:
        return None, ["PySD not installed. Install with: pip install pysd"]
    except Exception as e:
        return None, [f"PySD simulation error: {str(e)}"]
