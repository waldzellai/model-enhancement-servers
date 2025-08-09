from __future__ import annotations
import uuid
from typing import Any, Dict, List

from ortools.linear_solver import pywraplp

from ..resources.store import Store
from ..resources.uris import make_syslab_uri
from .seq_utils import compute_job_id


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
    """Toy optimizer using OR-Tools; records a simple sequential trace."""
    solver = pywraplp.Solver.CreateSolver("CBC")
    x = solver.NumVar(0.0, solver.infinity(), "x")
    y = solver.NumVar(0.0, solver.infinity(), "y")
    solver.Maximize(x + y)
    solver.Add(x + y <= 1)
    status = solver.Solve()

    solution = {
        "status": solver.StatusName(status),
        "objective_value": solver.Objective().Value(),
        "vars": {"x": x.solution_value(), "y": y.solution_value()},
    }

    job_id = compute_job_id(objective, constraints, decision_vars, inputs or [])
    trace_id = str(uuid.uuid4())

    trace = {"steps": []}
    for i, role in enumerate(ROLES, 1):
        trace["steps"].append({"step": i, "role": role, "thought": role})

    trace_uri = make_syslab_uri("traces", trace_id, "trace.json")
    sol_uri = make_syslab_uri("opt", job_id, "solution.json")
    store.write_json(trace_uri, trace)
    store.write_json(sol_uri, solution)

    milestones = [{"step": i, "title": role, "summary": role} for i, role in enumerate(ROLES, 1)]

    return {
        "solution": solution,
        "traceUri": trace_uri,
        "milestones": milestones,
        "verifications": [],
        "resources": [trace_uri, sol_uri],
    }
