from __future__ import annotations
import json

from fastmcp import FastMCP

from .config import STORE_ROOT
from .resources.store import Store
from .prompts.or_sequential_playbook import SUMMARY as OR_SUMMARY, BODY as OR_BODY
from .prompts.sd_sequential_playbook import SUMMARY as SD_SUMMARY, BODY as SD_BODY
from .sd.run_simulation import run_simulation
from .pack.export_notebook import export_notebook
from importlib import import_module

# `or` is a reserved keyword; import via importlib
optimize_policy_seq = import_module('.or.optimize_policy_seq', __package__).optimize_policy_seq

store = Store(STORE_ROOT)
store.ensure()

server = FastMCP(name="systems_lab", version="1.1")


# ---------------------------------------------------------------------------
# Resources
@server.resource("syslab://catalog", name="catalog", description="JSON listing of all discovered artifacts on local store")
async def catalog() -> bytes:
    return json.dumps(store.catalog()).encode("utf-8")


@server.resource("syslab://{kind}/{path}", name="dynamic_read", description="Serve bytes for any stored artifact via syslab URI")
async def dynamic_read(kind: str, path: str) -> bytes:
    return store.read_bytes(kind, path)


# ---------------------------------------------------------------------------
# Tools
@server.tool(
    "sd.run_simulation",
    description="Run Simulation (Toy Logistic Growth)",
    output_schema={
        "type": "object",
        "properties": {
            "resources": {"type": "array", "items": {"type": "string", "format": "uri"}},
            "summary": {"type": "object"},
            "provenance": {"type": "string", "format": "uri"},
        },
        "required": ["resources", "provenance"],
    },
)
async def sd_run_simulation(params: dict, horizon_steps: int = 20, dt: float = 1.0):
    return run_simulation(params=params, horizon_steps=horizon_steps, dt=dt, store=store)


@server.tool(
    "or.optimize_policy_seq",
    description="Optimize Policy (Sequential Thinking)",
    output_schema={
        "type": "object",
        "properties": {
            "solution": {"type": "object"},
            "traceUri": {"type": "string", "format": "uri"},
            "milestones": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "step": {"type": "integer"},
                        "title": {"type": "string"},
                        "summary": {"type": "string"},
                    },
                    "required": ["step", "title", "summary"],
                },
            },
            "verifications": {"type": "array", "items": {"type": "object"}},
            "resources": {"type": "array", "items": {"type": "string", "format": "uri"}},
        },
        "required": ["solution", "traceUri"],
    },
)
async def or_optimize_policy_seq(
    objective: str | None = None,
    constraints: list[dict] | None = None,
    decision_vars: list[dict] | None = None,
    inputs: list[str] | None = None,
    stepsMax: int = 6,
    explainForHumans: bool = False,
):
    return optimize_policy_seq(
        objective=objective,
        constraints=constraints,
        decision_vars=decision_vars,
        inputs=inputs,
        stepsMax=stepsMax,
        explainForHumans=explainForHumans,
        store=store,
    )


@server.tool(
    "pack.export_notebook",
    description="Static Publish (HTML)",
    output_schema={"type": "object", "properties": {"uri": {"type": "string", "format": "uri"}}, "required": ["uri"]},
)
async def pack_export_notebook(title: str, sections: list[str], format: str = "html"):
    return export_notebook(title=title, sections=sections, format=format, store=store)


# ---------------------------------------------------------------------------
# Prompts
@server.prompt("prompts/or.sequential-playbook", description=OR_SUMMARY)
async def or_sequential_playbook() -> str:
    return OR_BODY


@server.prompt("prompts/sd.sequential-playbook", description=SD_SUMMARY)
async def sd_sequential_playbook() -> str:
    return SD_BODY


if __name__ == "__main__":
    server.run()
