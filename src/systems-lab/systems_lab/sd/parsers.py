"""Model parsing and schema for System Dynamics models."""
from __future__ import annotations
from typing import Any, Dict, List, Optional, Set, Tuple
from dataclasses import dataclass, field
import re

from sympy import sympify, Symbol
from sympy.core.expr import Expr


@dataclass
class Stock:
    """A stock (accumulation) in an SD model."""
    name: str
    initial: float
    non_negative: bool = False
    
    def validate(self) -> List[str]:
        """Validate stock specification."""
        errors = []
        if not self.name or not re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', self.name):
            errors.append(f"Invalid stock name: {self.name}")
        if self.non_negative and self.initial < 0:
            errors.append(f"Stock {self.name} is non-negative but initial={self.initial} < 0")
        return errors


@dataclass
class Flow:
    """A flow (rate of change) in an SD model."""
    name: str
    formula: str
    from_stock: Optional[str] = None
    to_stock: Optional[str] = None
    non_negative: bool = False
    
    def validate(self, stocks: Set[str], auxiliaries: Set[str], parameters: Set[str]) -> List[str]:
        """Validate flow specification."""
        errors = []
        if not self.name or not re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', self.name):
            errors.append(f"Invalid flow name: {self.name}")
        
        # Check that from/to stocks exist
        if self.from_stock and self.from_stock not in stocks:
            errors.append(f"Flow {self.name} references unknown stock: {self.from_stock}")
        if self.to_stock and self.to_stock not in stocks:
            errors.append(f"Flow {self.name} references unknown stock: {self.to_stock}")
        
        # Validate formula
        try:
            self.parse_expression(stocks, auxiliaries, parameters, set())
        except Exception as e:
            errors.append(f"Flow {self.name} formula error: {e}")
        
        return errors
    
    def parse_expression(self, stocks: Set[str], auxiliaries: Set[str], 
                        parameters: Set[str], flows: Set[str]) -> Expr:
        """Parse flow formula into sympy expression."""
        all_vars = stocks | auxiliaries | parameters | flows
        return sympify(self.formula, locals={name: Symbol(name) for name in all_vars})


@dataclass
class Auxiliary:
    """An auxiliary variable (converter) in an SD model."""
    name: str
    formula: str
    
    def validate(self, stocks: Set[str], other_auxiliaries: Set[str], 
                 parameters: Set[str], flows: Set[str]) -> List[str]:
        """Validate auxiliary specification."""
        errors = []
        if not self.name or not re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', self.name):
            errors.append(f"Invalid auxiliary name: {self.name}")
        
        # Validate formula
        try:
            self.parse_expression(stocks, other_auxiliaries, parameters, flows)
        except Exception as e:
            errors.append(f"Auxiliary {self.name} formula error: {e}")
        
        return errors
    
    def parse_expression(self, stocks: Set[str], auxiliaries: Set[str], 
                        parameters: Set[str], flows: Set[str]) -> Expr:
        """Parse auxiliary formula into sympy expression."""
        all_vars = stocks | auxiliaries | parameters | flows
        return sympify(self.formula, locals={name: Symbol(name) for name in all_vars})


@dataclass
class TableFunction:
    """A lookup table function."""
    name: str
    x_values: List[float]
    y_values: List[float]
    interpolation: str = "linear"  # linear, step, cubic
    
    def validate(self) -> List[str]:
        """Validate table function specification."""
        errors = []
        if not self.name or not re.match(r'^[a-zA-Z_][a-zA-Z0-9_]*$', self.name):
            errors.append(f"Invalid table name: {self.name}")
        
        if len(self.x_values) != len(self.y_values):
            errors.append(f"Table {self.name}: x and y values must have same length")
        
        if len(self.x_values) < 2:
            errors.append(f"Table {self.name}: must have at least 2 points")
        
        # Check x values are sorted
        for i in range(len(self.x_values) - 1):
            if self.x_values[i] >= self.x_values[i + 1]:
                errors.append(f"Table {self.name}: x values must be strictly increasing")
                break
        
        if self.interpolation not in ["linear", "step", "cubic"]:
            errors.append(f"Table {self.name}: invalid interpolation method: {self.interpolation}")
        
        return errors
    
    def lookup(self, x: float) -> float:
        """Lookup value in table using interpolation."""
        import numpy as np
        from scipy.interpolate import interp1d
        
        if self.interpolation == "step":
            # Step function (nearest neighbor to the left)
            idx = np.searchsorted(self.x_values, x, side='right') - 1
            idx = max(0, min(idx, len(self.y_values) - 1))
            return self.y_values[idx]
        else:
            # Linear or cubic interpolation
            kind = 'cubic' if self.interpolation == 'cubic' and len(self.x_values) >= 4 else 'linear'
            f = interp1d(self.x_values, self.y_values, kind=kind, 
                        fill_value=(self.y_values[0], self.y_values[-1]), bounds_error=False)
            return float(f(x))


@dataclass
class SDModel:
    """Complete System Dynamics model specification."""
    stocks: List[Stock]
    flows: List[Flow]
    auxiliaries: List[Auxiliary] = field(default_factory=list)
    parameters: Dict[str, float] = field(default_factory=dict)
    tables: List[TableFunction] = field(default_factory=list)
    
    def validate(self) -> Tuple[bool, List[str]]:
        """Validate complete model specification."""
        errors = []
        
        # Collect names
        stock_names = set()
        for stock in self.stocks:
            if stock.name in stock_names:
                errors.append(f"Duplicate stock name: {stock.name}")
            stock_names.add(stock.name)
            errors.extend(stock.validate())
        
        auxiliary_names = set()
        for aux in self.auxiliaries:
            if aux.name in auxiliary_names:
                errors.append(f"Duplicate auxiliary name: {aux.name}")
            if aux.name in stock_names:
                errors.append(f"Auxiliary name conflicts with stock: {aux.name}")
            auxiliary_names.add(aux.name)
        
        flow_names = set()
        for flow in self.flows:
            if flow.name in flow_names:
                errors.append(f"Duplicate flow name: {flow.name}")
            if flow.name in stock_names or flow.name in auxiliary_names:
                errors.append(f"Flow name conflicts with stock/auxiliary: {flow.name}")
            flow_names.add(flow.name)
        
        param_names = set(self.parameters.keys())
        
        table_names = set()
        for table in self.tables:
            if table.name in table_names:
                errors.append(f"Duplicate table name: {table.name}")
            table_names.add(table.name)
            errors.extend(table.validate())
        
        # Check for name overlaps
        all_names = stock_names | auxiliary_names | flow_names | param_names | table_names
        if len(all_names) != (len(stock_names) + len(auxiliary_names) + 
                              len(flow_names) + len(param_names) + len(table_names)):
            errors.append("Name overlap detected between stocks/auxiliaries/flows/parameters/tables")
        
        # Validate flows
        for flow in self.flows:
            errors.extend(flow.validate(stock_names, auxiliary_names, param_names))
        
        # Validate auxiliaries (order-independent validation)
        for aux in self.auxiliaries:
            errors.extend(aux.validate(stock_names, auxiliary_names, param_names, flow_names))
        
        # Check for circular dependencies in auxiliaries
        dep_errors = self._check_auxiliary_dependencies()
        errors.extend(dep_errors)
        
        # Check that each stock has at least one flow
        stocks_with_flows = set()
        for flow in self.flows:
            if flow.from_stock:
                stocks_with_flows.add(flow.from_stock)
            if flow.to_stock:
                stocks_with_flows.add(flow.to_stock)
        
        for stock_name in stock_names:
            if stock_name not in stocks_with_flows:
                errors.append(f"Stock {stock_name} has no flows (will remain constant)")
        
        return len(errors) == 0, errors
    
    def _check_auxiliary_dependencies(self) -> List[str]:
        """Check for circular dependencies in auxiliaries."""
        errors = []
        aux_deps: Dict[str, Set[str]] = {}
        
        stock_names = {s.name for s in self.stocks}
        aux_names = {a.name for a in self.auxiliaries}
        param_names = set(self.parameters.keys())
        flow_names = {f.name for f in self.flows}
        
        # Build dependency graph
        for aux in self.auxiliaries:
            try:
                expr = aux.parse_expression(stock_names, aux_names, param_names, flow_names)
                deps = {str(s) for s in expr.free_symbols if str(s) in aux_names}
                aux_deps[aux.name] = deps
            except Exception:
                # Already reported in validation
                aux_deps[aux.name] = set()
        
        # Check for cycles using DFS
        def has_cycle(node: str, visited: Set[str], rec_stack: Set[str]) -> bool:
            visited.add(node)
            rec_stack.add(node)
            
            for neighbor in aux_deps.get(node, set()):
                if neighbor not in visited:
                    if has_cycle(neighbor, visited, rec_stack):
                        return True
                elif neighbor in rec_stack:
                    return True
            
            rec_stack.remove(node)
            return False
        
        visited: Set[str] = set()
        for aux_name in aux_names:
            if aux_name not in visited:
                if has_cycle(aux_name, visited, set()):
                    errors.append(f"Circular dependency detected involving auxiliary: {aux_name}")
        
        return errors
    
    def get_stock_names(self) -> List[str]:
        """Get list of stock names."""
        return [s.name for s in self.stocks]
    
    def get_flow_names(self) -> List[str]:
        """Get list of flow names."""
        return [f.name for f in self.flows]
    
    def get_auxiliary_names(self) -> List[str]:
        """Get list of auxiliary names."""
        return [a.name for a in self.auxiliaries]
    
    def get_evaluation_order(self) -> List[str]:
        """
        Get evaluation order for auxiliaries (topological sort).
        Returns list of auxiliary names in order they should be evaluated.
        """
        aux_deps: Dict[str, Set[str]] = {}
        aux_names = {a.name for a in self.auxiliaries}
        stock_names = {s.name for s in self.stocks}
        param_names = set(self.parameters.keys())
        flow_names = {f.name for f in self.flows}
        
        # Build dependency graph
        for aux in self.auxiliaries:
            try:
                expr = aux.parse_expression(stock_names, aux_names, param_names, flow_names)
                deps = {str(s) for s in expr.free_symbols if str(s) in aux_names}
                aux_deps[aux.name] = deps
            except Exception:
                aux_deps[aux.name] = set()
        
        # Topological sort (Kahn's algorithm)
        in_degree = {name: 0 for name in aux_names}
        for deps in aux_deps.values():
            for dep in deps:
                in_degree[dep] = in_degree.get(dep, 0) + 1
        
        queue = [name for name in aux_names if in_degree[name] == 0]
        result = []
        
        while queue:
            node = queue.pop(0)
            result.append(node)
            
            for other_name in aux_names:
                if node in aux_deps.get(other_name, set()):
                    in_degree[other_name] -= 1
                    if in_degree[other_name] == 0:
                        queue.append(other_name)
        
        return result


def parse_sd_model_from_dict(spec: Dict[str, Any]) -> Tuple[Optional[SDModel], List[str]]:
    """
    Parse SD model from dictionary specification.
    
    Args:
        spec: Dictionary with keys:
            - stocks: List of stock specs with 'name', 'initial', optional 'non_negative'
            - flows: List of flow specs with 'name', 'formula', optional 'from_stock', 'to_stock'
            - auxiliaries: Optional list of auxiliary specs
            - parameters: Optional dict of parameter values
            - tables: Optional list of table function specs
    
    Returns:
        Tuple of (model, errors). Model is None if parsing fails.
    """
    errors = []
    
    try:
        # Parse stocks
        stocks = []
        for stock_spec in spec.get('stocks', []):
            try:
                stocks.append(Stock(
                    name=stock_spec['name'],
                    initial=float(stock_spec['initial']),
                    non_negative=stock_spec.get('non_negative', False)
                ))
            except Exception as e:
                errors.append(f"Invalid stock spec: {e}")
        
        # Parse flows
        flows = []
        for flow_spec in spec.get('flows', []):
            try:
                flows.append(Flow(
                    name=flow_spec['name'],
                    formula=flow_spec['formula'],
                    from_stock=flow_spec.get('from_stock'),
                    to_stock=flow_spec.get('to_stock'),
                    non_negative=flow_spec.get('non_negative', False)
                ))
            except Exception as e:
                errors.append(f"Invalid flow spec: {e}")
        
        # Parse auxiliaries
        auxiliaries = []
        for aux_spec in spec.get('auxiliaries', []):
            try:
                auxiliaries.append(Auxiliary(
                    name=aux_spec['name'],
                    formula=aux_spec['formula']
                ))
            except Exception as e:
                errors.append(f"Invalid auxiliary spec: {e}")
        
        # Parse parameters
        parameters = spec.get('parameters', {})
        
        # Parse tables
        tables = []
        for table_spec in spec.get('tables', []):
            try:
                tables.append(TableFunction(
                    name=table_spec['name'],
                    x_values=table_spec['x_values'],
                    y_values=table_spec['y_values'],
                    interpolation=table_spec.get('interpolation', 'linear')
                ))
            except Exception as e:
                errors.append(f"Invalid table spec: {e}")
        
        if errors:
            return None, errors
        
        model = SDModel(
            stocks=stocks,
            flows=flows,
            auxiliaries=auxiliaries,
            parameters=parameters,
            tables=tables
        )
        
        # Validate complete model
        is_valid, validation_errors = model.validate()
        if not is_valid:
            return None, validation_errors
        
        return model, []
        
    except Exception as e:
        errors.append(f"Model parsing error: {str(e)}")
        return None, errors
