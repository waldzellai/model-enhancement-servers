"""OR-Tools integration for solving optimization problems."""
from __future__ import annotations
from typing import Any, Dict, List, Optional, Tuple
from dataclasses import dataclass

from ortools.linear_solver import pywraplp
import sympy
from sympy import Symbol

from .parsers import ORModel, VarType, ObjectiveSense, ConstraintType, extract_expression_terms


@dataclass
class ORSolution:
    """Solution to an optimization problem."""
    status: str
    objective_value: Optional[float]
    variables: Dict[str, float]
    solve_time_ms: float
    iterations: Optional[int] = None
    
    def is_optimal(self) -> bool:
        """Check if solution is optimal."""
        return self.status == "OPTIMAL"
    
    def is_feasible(self) -> bool:
        """Check if solution is feasible."""
        return self.status in ["OPTIMAL", "FEASIBLE"]


class OREngine:
    """Engine for solving OR problems using OR-Tools."""
    
    def __init__(self, solver_name: str = "CBC"):
        """
        Initialize OR engine.
        
        Args:
            solver_name: Solver backend (CBC, SCIP, GLPK, etc.)
        """
        self.solver_name = solver_name
    
    def solve(self, model: ORModel, time_limit_ms: Optional[int] = None) -> Tuple[ORSolution, List[str]]:
        """
        Solve an OR model.
        
        Args:
            model: ORModel specification
            time_limit_ms: Optional time limit in milliseconds
        
        Returns:
            Tuple of (solution, warnings)
        """
        warnings = []
        
        try:
            # Create solver
            solver = pywraplp.Solver.CreateSolver(self.solver_name)
            if solver is None:
                return ORSolution(
                    status="ERROR",
                    objective_value=None,
                    variables={},
                    solve_time_ms=0.0
                ), [f"Failed to create solver: {self.solver_name}"]
            
            # Set time limit if provided
            if time_limit_ms is not None:
                solver.SetTimeLimit(time_limit_ms)
            
            # Create decision variables
            or_vars = {}
            for var in model.decision_vars:
                ub = var.ub if var.ub is not None else solver.infinity()
                
                if var.var_type == VarType.CONTINUOUS:
                    or_vars[var.name] = solver.NumVar(var.lb, ub, var.name)
                elif var.var_type == VarType.INTEGER:
                    or_vars[var.name] = solver.IntVar(int(var.lb), int(ub) if var.ub is not None else int(solver.infinity()), var.name)
                elif var.var_type == VarType.BINARY:
                    or_vars[var.name] = solver.BoolVar(var.name)
            
            # Get variable names and parameters
            var_names = set(or_vars.keys())
            param_names = set(model.parameters.keys())
            
            # Create objective
            obj_expr = model.objective.parse_expression(var_names, param_names)
            if obj_expr is None:
                return ORSolution(
                    status="ERROR",
                    objective_value=None,
                    variables={},
                    solve_time_ms=0.0
                ), ["Failed to parse objective expression"]
            
            # Substitute parameters
            for param_name, param_value in model.parameters.items():
                obj_expr = obj_expr.subs(Symbol(param_name), param_value)
            
            # Build objective in solver
            objective = solver.Objective()
            try:
                # Try to extract linear terms
                coeffs = extract_expression_terms(obj_expr, var_names)
                for var_name, coeff in coeffs.items():
                    if abs(coeff) > 1e-10:  # Skip near-zero coefficients
                        objective.SetCoefficient(or_vars[var_name], float(coeff))
                
                # Add constant term
                constant = float(obj_expr.subs({Symbol(v): 0 for v in var_names}))
                objective.SetOffset(constant)
                
            except ValueError as e:
                warnings.append(f"Nonlinear objective detected, attempting numeric evaluation: {e}")
                # For now, just use the expression as-is
                # This will only work if it's actually linear
                pass
            
            if model.objective.sense == ObjectiveSense.MAXIMIZE:
                objective.SetMaximization()
            else:
                objective.SetMinimization()
            
            # Add constraints
            for i, constraint in enumerate(model.constraints):
                const_expr = constraint.parse_expression(var_names, param_names)
                if const_expr is None:
                    warnings.append(f"Failed to parse constraint {i}: {constraint.expr}")
                    continue
                
                # Substitute parameters
                for param_name, param_value in model.parameters.items():
                    const_expr = const_expr.subs(Symbol(param_name), param_value)
                
                try:
                    # Extract linear terms for left side (const_expr is left - right)
                    coeffs = extract_expression_terms(const_expr, var_names)
                    
                    # Get constant term (right side, negated)
                    constant = -float(const_expr.subs({Symbol(v): 0 for v in var_names}))
                    
                    # Build constraint
                    name = constraint.name or f"c_{i}"
                    if constraint.constraint_type == ConstraintType.LE:
                        ct = solver.Constraint(-solver.infinity(), constant, name)
                    elif constraint.constraint_type == ConstraintType.GE:
                        ct = solver.Constraint(constant, solver.infinity(), name)
                    else:  # EQ
                        ct = solver.Constraint(constant, constant, name)
                    
                    for var_name, coeff in coeffs.items():
                        if abs(coeff) > 1e-10:
                            ct.SetCoefficient(or_vars[var_name], float(coeff))
                    
                except ValueError as e:
                    warnings.append(f"Nonlinear constraint {i}: {e}")
                    continue
            
            # Solve
            status = solver.Solve()
            
            # Extract solution
            status_name = self._status_name(status)
            obj_value = solver.Objective().Value() if status in [pywraplp.Solver.OPTIMAL, pywraplp.Solver.FEASIBLE] else None
            
            var_values = {}
            if status in [pywraplp.Solver.OPTIMAL, pywraplp.Solver.FEASIBLE]:
                for var_name, or_var in or_vars.items():
                    var_values[var_name] = or_var.solution_value()
            
            solution = ORSolution(
                status=status_name,
                objective_value=obj_value,
                variables=var_values,
                solve_time_ms=solver.wall_time(),
                iterations=solver.iterations() if hasattr(solver, 'iterations') else None
            )
            
            return solution, warnings
            
        except Exception as e:
            return ORSolution(
                status="ERROR",
                objective_value=None,
                variables={},
                solve_time_ms=0.0
            ), [f"Solver error: {str(e)}"]
    
    def _status_name(self, status: int) -> str:
        """Convert OR-Tools status code to string."""
        status_map = {
            pywraplp.Solver.OPTIMAL: "OPTIMAL",
            pywraplp.Solver.FEASIBLE: "FEASIBLE",
            pywraplp.Solver.INFEASIBLE: "INFEASIBLE",
            pywraplp.Solver.UNBOUNDED: "UNBOUNDED",
            pywraplp.Solver.ABNORMAL: "ABNORMAL",
            pywraplp.Solver.NOT_SOLVED: "NOT_SOLVED",
        }
        return status_map.get(status, "UNKNOWN")
