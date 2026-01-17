"""Solution verification and infeasibility diagnosis for OR problems."""
from __future__ import annotations
from typing import Dict, List, Tuple
from dataclasses import dataclass

from sympy import Symbol

from .parsers import ORModel, ConstraintType
from .engine import ORSolution


@dataclass
class ConstraintViolation:
    """A constraint violation in a solution."""
    constraint_index: int
    constraint_name: str
    constraint_expr: str
    lhs_value: float
    rhs_value: float
    violation: float
    constraint_type: str


@dataclass
class VerificationResult:
    """Result of solution verification."""
    is_valid: bool
    objective_verified: bool
    objective_error: float
    constraint_violations: List[ConstraintViolation]
    variable_bound_violations: List[str]
    warnings: List[str]


def verify_solution(model: ORModel, solution: ORSolution, tolerance: float = 1e-6) -> VerificationResult:
    """
    Verify that a solution satisfies all constraints and bounds.
    
    Args:
        model: The OR model specification
        solution: The solution to verify
        tolerance: Numerical tolerance for constraint satisfaction
    
    Returns:
        VerificationResult with detailed verification info
    """
    warnings = []
    constraint_violations = []
    bound_violations = []
    
    if not solution.is_feasible():
        return VerificationResult(
            is_valid=False,
            objective_verified=False,
            objective_error=float('inf'),
            constraint_violations=[],
            variable_bound_violations=[],
            warnings=[f"Solution status is {solution.status}, not feasible"]
        )
    
    var_names = set(model.get_variable_names())
    param_names = set(model.get_parameter_names())
    
    # Check variable bounds
    for var in model.decision_vars:
        if var.name not in solution.variables:
            bound_violations.append(f"{var.name}: not in solution")
            continue
        
        value = solution.variables[var.name]
        if value < var.lb - tolerance:
            bound_violations.append(f"{var.name} = {value} < lower bound {var.lb}")
        if var.ub is not None and value > var.ub + tolerance:
            bound_violations.append(f"{var.name} = {value} > upper bound {var.ub}")
    
    # Check constraints
    for i, constraint in enumerate(model.constraints):
        const_expr = constraint.parse_expression(var_names, param_names)
        if const_expr is None:
            warnings.append(f"Could not verify constraint {i}: {constraint.expr}")
            continue
        
        # Substitute parameter values
        for param_name, param_value in model.parameters.items():
            const_expr = const_expr.subs(Symbol(param_name), param_value)
        
        # Substitute solution values
        expr_value = const_expr
        for var_name, var_value in solution.variables.items():
            expr_value = expr_value.subs(Symbol(var_name), var_value)
        
        try:
            lhs_value = float(expr_value)
            rhs_value = 0.0  # Constraints are in form (left - right) OP 0
            
            # Check constraint type
            violation = 0.0
            if constraint.constraint_type == ConstraintType.LE:
                # lhs <= 0
                if lhs_value > tolerance:
                    violation = lhs_value
            elif constraint.constraint_type == ConstraintType.GE:
                # lhs >= 0
                if lhs_value < -tolerance:
                    violation = -lhs_value
            else:  # EQ
                # lhs == 0
                if abs(lhs_value) > tolerance:
                    violation = abs(lhs_value)
            
            if violation > tolerance:
                constraint_violations.append(ConstraintViolation(
                    constraint_index=i,
                    constraint_name=constraint.name or f"c_{i}",
                    constraint_expr=constraint.expr,
                    lhs_value=lhs_value,
                    rhs_value=rhs_value,
                    violation=violation,
                    constraint_type=constraint.constraint_type.value
                ))
        except Exception as e:
            warnings.append(f"Error evaluating constraint {i}: {e}")
    
    # Verify objective value
    obj_verified = False
    obj_error = float('inf')
    if solution.objective_value is not None:
        obj_expr = model.objective.parse_expression(var_names, param_names)
        if obj_expr is not None:
            # Substitute parameters
            for param_name, param_value in model.parameters.items():
                obj_expr = obj_expr.subs(Symbol(param_name), param_value)
            
            # Substitute solution values
            for var_name, var_value in solution.variables.items():
                obj_expr = obj_expr.subs(Symbol(var_name), var_value)
            
            try:
                computed_obj = float(obj_expr)
                obj_error = abs(computed_obj - solution.objective_value)
                obj_verified = obj_error < tolerance * (1 + abs(solution.objective_value))
            except Exception as e:
                warnings.append(f"Could not verify objective value: {e}")
    
    is_valid = (len(constraint_violations) == 0 and 
                len(bound_violations) == 0 and 
                obj_verified)
    
    return VerificationResult(
        is_valid=is_valid,
        objective_verified=obj_verified,
        objective_error=obj_error,
        constraint_violations=constraint_violations,
        variable_bound_violations=bound_violations,
        warnings=warnings
    )


def diagnose_infeasibility(model: ORModel) -> List[str]:
    """
    Diagnose why a model might be infeasible.
    
    Provides suggestions for conflicting constraints or impossible bounds.
    
    Args:
        model: The OR model to diagnose
    
    Returns:
        List of diagnostic messages
    """
    diagnostics = []
    
    # Check for conflicting variable bounds
    for var in model.decision_vars:
        if var.ub is not None and var.lb > var.ub:
            diagnostics.append(
                f"Variable {var.name} has conflicting bounds: "
                f"lb={var.lb} > ub={var.ub}"
            )
    
    # Check for obviously conflicting constraints
    # This is a simple heuristic - we look for constraints on the same single variable
    single_var_constraints: Dict[str, List[Tuple[int, str, str]]] = {}
    var_names = set(model.get_variable_names())
    
    for i, constraint in enumerate(model.constraints):
        const_expr = constraint.parse_expression(var_names, set(model.parameters.keys()))
        if const_expr is None:
            continue
        
        # Check if this constrains a single variable
        free_vars = [str(s) for s in const_expr.free_symbols if str(s) in var_names]
        if len(free_vars) == 1:
            var = free_vars[0]
            if var not in single_var_constraints:
                single_var_constraints[var] = []
            single_var_constraints[var].append((i, constraint.expr, constraint.constraint_type.value))
    
    # Look for conflicting single-variable constraints
    for var, constraints in single_var_constraints.items():
        if len(constraints) >= 2:
            diagnostics.append(
                f"Variable {var} is constrained by multiple constraints: " +
                ", ".join([f"{expr} ({ctype})" for _, expr, ctype in constraints]) +
                " - check for conflicts"
            )
    
    # Check for sum constraints that exceed bounds
    # Look for constraints like: x1 + x2 + ... >= K where sum of upper bounds < K
    for i, constraint in enumerate(model.constraints):
        const_expr = constraint.parse_expression(var_names, set(model.parameters.keys()))
        if const_expr is None:
            continue
        
        try:
            # Try to identify simple sum constraints
            free_vars = [str(s) for s in const_expr.free_symbols if str(s) in var_names]
            
            # Check if all coefficients are positive (sum constraint)
            all_positive = True
            for var_name in free_vars:
                coeff = const_expr.coeff(Symbol(var_name))
                if coeff is None or float(coeff) <= 0:
                    all_positive = False
                    break
            
            if all_positive and len(free_vars) >= 2:
                # Get constant term
                constant = float(const_expr.subs({Symbol(v): 0 for v in free_vars}))
                
                # For >= constraints, check if sum of upper bounds < -constant
                if constraint.constraint_type == ConstraintType.GE:
                    max_sum = 0.0
                    for var_name in free_vars:
                        var_obj = next(v for v in model.decision_vars if v.name == var_name)
                        if var_obj.ub is None:
                            max_sum = float('inf')
                            break
                        max_sum += var_obj.ub * float(const_expr.coeff(Symbol(var_name)))
                    
                    if max_sum < -constant:
                        diagnostics.append(
                            f"Constraint {i} ({constraint.expr}) may be infeasible: "
                            f"maximum achievable sum is {max_sum}, but requires >= {-constant}"
                        )
                
                # For <= constraints, check if sum of lower bounds > -constant
                elif constraint.constraint_type == ConstraintType.LE:
                    min_sum = 0.0
                    for var_name in free_vars:
                        var_obj = next(v for v in model.decision_vars if v.name == var_name)
                        min_sum += var_obj.lb * float(const_expr.coeff(Symbol(var_name)))
                    
                    if min_sum > -constant:
                        diagnostics.append(
                            f"Constraint {i} ({constraint.expr}) may be infeasible: "
                            f"minimum achievable sum is {min_sum}, but requires <= {-constant}"
                        )
        except Exception:
            # Skip complex constraints
            pass
    
    if not diagnostics:
        diagnostics.append(
            "No obvious infeasibility detected. The problem may require "
            "relaxing some constraints or adjusting variable bounds."
        )
    
    return diagnostics
