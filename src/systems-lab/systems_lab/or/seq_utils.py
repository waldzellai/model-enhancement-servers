from __future__ import annotations
import hashlib
import json
from typing import Any


def compute_job_id(objective: Any, constraints: Any, decision_vars: Any, inputs: list[str]) -> str:
    payload = json.dumps({
        "objective": objective,
        "constraints": constraints,
        "decision_vars": decision_vars,
        "inputs": inputs,
    }, sort_keys=True).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()[:16]
