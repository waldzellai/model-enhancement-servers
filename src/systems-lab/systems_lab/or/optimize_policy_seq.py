from __future__ import annotations
import uuid
from typing import Any, Dict, List

from ..resources.store import Store
from ..resources.uris import make_syslab_uri
from .seq_utils import compute_job_id
from .parsers import parse_or_model_from_dict
from .engine import OREngine
from .verification import verify_solution, diagnose_infeasibility


ROLES = ["plan", "formulate", "solve", "verify", "reflect"]


def optimize_policy_seq(
    *,
    objective: str | None = None,
    constraints: List[Dict[str, Any]] | None = None,
    decision_vars: List[Dict[str, Any]] | None = None,
    inputs: List[str] | None = None,
    stepsMax: int = 6,
    explainForHumans: bool = False,
    store: Store,
) -> Dict[str, Any]:
    """
    Solve optimization problem using OR-Tools with sequential thinking trace.
    
    Args:
        objective: Objective specification (legacy, use decision_vars format)
        constraints: List of constraint dicts (legacy)
        decision_vars: List of decision variable dicts
        inputs: List of input data URIs (legacy)
        stepsMax: Maximum sequential thinking steps
        explainForHumans: Add human-readable explanations
        store: Artifact store
    
    Returns:
        Dict with solution, trace URI, milestones, verifications, and resources
    """
    job_id = compute_job_id(objective, constraints, decision_vars, inputs or [])
    trace_id = str(uuid.uuid4())
    
    trace = {"steps": []}
    milestones = []
    verifications = []
    warnings = []
    
    # Step 1: PLAN
    trace["steps"].append({
        "step": 1,
        "role": "plan",
        "thought": "Analyzing problem structure and selecting optimization approach"
    })
    milestones.append({
        "step": 1,
        "title": "plan",
        "summary": "Problem analysis complete"
    })
    
    # Step 2: FORMULATE - Parse model specification
    trace["steps"].append({
        "step": 2,
        "role": "formulate",
        "thought": "Parsing model specification and validating structure"
    })
    
    # Build model spec from inputs
    model_spec = {}
    if decision_vars is not None:
        model_spec["decision_vars"] = decision_vars
    if objective is not None:
        # Handle both string and dict objective
        if isinstance(objective, str):
            model_spec["objective"] = {"sense": "maximize", "expr": objective}
        else:
            model_spec["objective"] = objective
    if constraints is not None:
        model_spec["constraints"] = constraints
    
    # Parse model
    model, parse_errors = parse_or_model_from_dict(model_spec)
    
    if parse_errors or model is None:
        # Formulation failed
        milestones.append({
            "step": 2,
            "title": "formulate",
            "summary": f"Formulation failed: {'; '.join(parse_errors[:3])}"
        })
        
        error_solution = {
            "status": "FORMULATION_ERROR",
            "errors": parse_errors,
            "objective_value": None,
            "vars": {}
        }
        
        sol_uri = make_syslab_uri("opt", job_id, "solution.json")
        trace_uri = make_syslab_uri("traces", trace_id, "trace.json")
        store.write_json(sol_uri, error_solution)
        store.write_json(trace_uri, trace)
        
        return {
            "solution": error_solution,
            "traceUri": trace_uri,
            "milestones": milestones,
            "verifications": [],
            "resources": [trace_uri, sol_uri],
        }
    
    milestones.append({
        "step": 2,
        "title": "formulate",
        "summary": f"Model formulated: {len(model.decision_vars)} variables, {len(model.constraints)} constraints"
    })
    
    # Step 3: SOLVE - Run optimization
    trace["steps"].append({
        "step": 3,
        "role": "solve",
        "thought": "Executing optimization with OR-Tools solver"
    })
    
    engine = OREngine(solver_name="CBC")
    solution, solve_warnings = engine.solve(model, time_limit_ms=30000)
    warnings.extend(solve_warnings)
    
    milestones.append({
        "step": 3,
        "title": "solve",
        "summary": f"Solver status: {solution.status}, time: {solution.solve_time_ms:.1f}ms"
    })
    
    # Step 4: VERIFY - Check solution validity
    trace["steps"].append({
        "step": 4,
        "role": "verify",
        "thought": "Verifying solution satisfies all constraints and bounds"
    })
    
    if solution.is_feasible():
        verification = verify_solution(model, solution)
        verifications.append({
            "is_valid": verification.is_valid,
            "objective_verified": verification.objective_verified,
            "objective_error": verification.objective_error,
            "constraint_violations": len(verification.constraint_violations),
            "bound_violations": len(verification.variable_bound_violations),
            "warnings": verification.warnings
        })
        
        if verification.is_valid:
            verify_summary = "Solution verified: all constraints satisfied"
        else:
            verify_summary = f"Verification issues: {len(verification.constraint_violations)} constraint violations"
    elif solution.status == "INFEASIBLE":
        # Diagnose infeasibility
        diagnostics = diagnose_infeasibility(model)
        verifications.append({
            "is_valid": False,
            "infeasible": True,
            "diagnostics": diagnostics
        })
        verify_summary = "Problem is infeasible"
    else:
        verify_summary = f"Solution status: {solution.status}"
    
    milestones.append({
        "step": 4,
        "title": "verify",
        "summary": verify_summary
    })
    
    # Step 5: REFLECT - Analyze results
    trace["steps"].append({
        "step": 5,
        "role": "reflect",
        "thought": "Analyzing solution quality and providing insights"
    })
    
    if solution.is_optimal():
        reflect_summary = "Optimal solution found"
    elif solution.is_feasible():
        reflect_summary = "Feasible solution found (may not be optimal)"
    elif solution.status == "INFEASIBLE":
        reflect_summary = "Problem has no feasible solution - consider relaxing constraints"
    elif solution.status == "UNBOUNDED":
        reflect_summary = "Problem is unbounded - add constraints to bound the solution"
    else:
        reflect_summary = f"Solver terminated with status: {solution.status}"
    
    milestones.append({
        "step": 5,
        "title": "reflect",
        "summary": reflect_summary
    })
    
    # Prepare solution output
    solution_dict = {
        "status": solution.status,
        "objective_value": solution.objective_value,
        "vars": solution.variables,
        "solve_time_ms": solution.solve_time_ms,
        "iterations": solution.iterations,
        "warnings": warnings if warnings else None
    }
    
    # Save artifacts
    sol_uri = make_syslab_uri("opt", job_id, "solution.json")
    trace_uri = make_syslab_uri("traces", trace_id, "trace.json")
    
    store.write_json(sol_uri, solution_dict)
    store.write_json(trace_uri, trace)
    
    # Save model spec for reference
    model_uri = make_syslab_uri("opt", job_id, "model.json")
    store.write_json(model_uri, model_spec)
    
    return {
        "solution": solution_dict,
        "traceUri": trace_uri,
        "milestones": milestones,
        "verifications": verifications,
        "resources": [trace_uri, sol_uri, model_uri],
    }
