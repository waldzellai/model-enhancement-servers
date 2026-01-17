"""Expression parsing and model schema for Operations Research problems."""
from __future__ import annotations
import re
from typing import Any, Dict, List, Optional, Set, Tuple
from dataclasses import dataclass
from enum import Enum

import sympy
from sympy import sympify, Symbol
from sympy.core.expr import Expr


class VarType(str, Enum):
    """Decision variable types."""
    CONTINUOUS = "continuous"
    INTEGER = "integer"
    BINARY = "binary"


class ConstraintType(str, Enum):
    """Constraint comparison types."""
    LE = "<="
    GE = ">="
    EQ = "=="


class ObjectiveSense(str, Enum):
    """Optimization direction."""
    MINIMIZE = "minimize"
    MAXIMIZE = "maximize"


@dataclass
class DecisionVariable:
    """Decision variable specification."""
    name: str
    var_type: VarType
    lb: float = 0.0
    ub: Optional[float] = None
    
    def validate(self) -> List[str]:
        """Validate variable specification."""
        errors = []
        if not self.name or not re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', self.name):
            errors.append(f"Invalid variable name: {self.name}")
        if self.lb > (self.ub or float('inf')):
            errors.append(f"Lower bound {self.lb} > upper bound {self.ub} for {self.name}")
        if self.var_type == VarType.BINARY and (self.lb != 0 or self.ub != 1):
            errors.append(f"Binary variable {self.name} must have bounds [0, 1]")
        return errors


@dataclass
class Constraint:
    """Constraint specification."""
    expr: str
    constraint_type: ConstraintType
    name: Optional[str] = None
    
    def validate(self, variables: Set[str], parameters: Set[str]) -> List[str]:
        """Validate constraint expression."""
        errors = []
        try:
            parsed = self.parse_expression(variables, parameters)
            if parsed is None:
                errors.append(f"Failed to parse constraint: {self.expr}")
        except Exception as e:
            errors.append(f"Constraint parsing error: {str(e)}")
        return errors
    
    def parse_expression(self, variables: Set[str], parameters: Set[str]) -> Optional[Expr]:
        """Parse constraint expression into sympy form."""
        try:
            # Replace <= >= == with - to get left - right form
            if self.constraint_type == ConstraintType.LE:
                parts = self.expr.split('<=')
            elif self.constraint_type == ConstraintType.GE:
                parts = self.expr.split('>=')
            else:  # EQ
                parts = self.expr.split('==')
            
            if len(parts) != 2:
                return None
            
            left = sympify(parts[0].strip(), locals={name: Symbol(name) for name in variables | parameters})
            right = sympify(parts[1].strip(), locals={name: Symbol(name) for name in variables | parameters})
            return left - right
        except Exception:
            return None


@dataclass
class Objective:
    """Objective function specification."""
    sense: ObjectiveSense
    expr: str
    
    def validate(self, variables: Set[str], parameters: Set[str]) -> List[str]:
        """Validate objective expression."""
        errors = []
        try:
            parsed = self.parse_expression(variables, parameters)
            if parsed is None:
                errors.append(f"Failed to parse objective: {self.expr}")
        except Exception as e:
            errors.append(f"Objective parsing error: {str(e)}")
        return errors
    
    def parse_expression(self, variables: Set[str], parameters: Set[str]) -> Optional[Expr]:
        """Parse objective expression into sympy form."""
        try:
            return sympify(self.expr, locals={name: Symbol(name) for name in variables | parameters})
        except Exception:
            return None


@dataclass
class ORModel:
    """Complete Operations Research model specification."""
    decision_vars: List[DecisionVariable]
    objective: Objective
    constraints: List[Constraint]
    parameters: Dict[str, float] = None
    
    def __post_init__(self):
        if self.parameters is None:
            self.parameters = {}
    
    def validate(self) -> Tuple[bool, List[str]]:
        """Validate complete model specification."""
        errors = []
        
        # Validate variables
        var_names = set()
        for var in self.decision_vars:
            if var.name in var_names:
                errors.append(f"Duplicate variable name: {var.name}")
            var_names.add(var.name)
            errors.extend(var.validate())
        
        # Check for reserved names
        param_names = set(self.parameters.keys())
        overlap = var_names & param_names
        if overlap:
            errors.append(f"Variable/parameter name overlap: {overlap}")
        
        # Validate objective
        errors.extend(self.objective.validate(var_names, param_names))
        
        # Validate constraints
        for i, constraint in enumerate(self.constraints):
            c_errors = constraint.validate(var_names, param_names)
            errors.extend([f"Constraint {i}: {e}" for e in c_errors])
        
        # Check that objective uses at least one variable
        try:
            obj_expr = self.objective.parse_expression(var_names, param_names)
            if obj_expr is not None:
                obj_vars = {str(s) for s in obj_expr.free_symbols}
                if not (obj_vars & var_names):
                    errors.append("Objective does not depend on any decision variables")
        except Exception:
            pass
        
        return len(errors) == 0, errors
    
    def get_variable_names(self) -> List[str]:
        """Get list of decision variable names."""
        return [var.name for var in self.decision_vars]
    
    def get_parameter_names(self) -> List[str]:
        """Get list of parameter names."""
        return list(self.parameters.keys())


def parse_or_model_from_dict(spec: Dict[str, Any]) -> Tuple[Optional[ORModel], List[str]]:
    """
    Parse OR model from dictionary specification.
    
    Args:
        spec: Dictionary with keys:
            - decision_vars: List of variable specs
            - objective: Objective spec with 'sense' and 'expr'
            - constraints: List of constraint specs
            - parameters: Optional dict of parameter values
    
    Returns:
        Tuple of (model, errors). Model is None if parsing fails.
    """
    errors = []
    
    try:
        # Parse decision variables
        decision_vars = []
        for var_spec in spec.get('decision_vars', []):
            try:
                var_type = VarType(var_spec.get('type', 'continuous'))
                lb = float(var_spec.get('lb', 0.0))
                ub = var_spec.get('ub')
                if ub is not None:
                    ub = float(ub)
                
                # Binary variables default to [0, 1]
                if var_type == VarType.BINARY:
                    lb = 0.0
                    ub = 1.0
                
                decision_vars.append(DecisionVariable(
                    name=var_spec['name'],
                    var_type=var_type,
                    lb=lb,
                    ub=ub
                ))
            except Exception as e:
                errors.append(f"Invalid variable spec: {e}")
        
        # Parse objective
        obj_spec = spec.get('objective', {})
        try:
            objective = Objective(
                sense=ObjectiveSense(obj_spec.get('sense', 'maximize')),
                expr=obj_spec.get('expr', '')
            )
        except Exception as e:
            errors.append(f"Invalid objective spec: {e}")
            return None, errors
        
        # Parse constraints
        constraints = []
        for const_spec in spec.get('constraints', []):
            try:
                # Infer constraint type from expression
                expr = const_spec.get('expr', '')
                if '<=' in expr:
                    const_type = ConstraintType.LE
                elif '>=' in expr:
                    const_type = ConstraintType.GE
                elif '==' in expr or '=' in expr:
                    const_type = ConstraintType.EQ
                    # Normalize = to ==
                    if '==' not in expr:
                        expr = expr.replace('=', '==')
                else:
                    errors.append(f"Cannot infer constraint type from: {expr}")
                    continue
                
                constraints.append(Constraint(
                    expr=expr,
                    constraint_type=const_type,
                    name=const_spec.get('name')
                ))
            except Exception as e:
                errors.append(f"Invalid constraint spec: {e}")
        
        # Parse parameters
        parameters = spec.get('parameters', {})
        
        if errors:
            return None, errors
        
        model = ORModel(
            decision_vars=decision_vars,
            objective=objective,
            constraints=constraints,
            parameters=parameters
        )
        
        # Validate complete model
        is_valid, validation_errors = model.validate()
        if not is_valid:
            return None, validation_errors
        
        return model, []
        
    except Exception as e:
        errors.append(f"Model parsing error: {str(e)}")
        return None, errors


def extract_expression_terms(expr: Expr, variables: Set[str]) -> Dict[str, float]:
    """
    Extract linear coefficients from expression.
    
    Returns dict mapping variable name to coefficient.
    Raises ValueError if expression is not linear.
    """
    expanded = expr.expand()
    coeffs = {}
    
    for var_name in variables:
        var = Symbol(var_name)
        coeff = expanded.coeff(var, 1)
        if coeff is not None:
            coeffs[var_name] = float(coeff)
    
    # Check for nonlinear terms
    for var_name in variables:
        var = Symbol(var_name)
        # Check if variable appears with power > 1
        if expanded.coeff(var, 2) is not None or expanded.coeff(var**2) is not None:
            raise ValueError(f"Nonlinear term detected: {var_name}^2")
    
    return coeffs
