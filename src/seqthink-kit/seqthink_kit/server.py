"""Sequential Thinking MCP server.
This server provides a simple tool for models to externalize their reasoning
by recording thoughts one-by-one. Each thought is stored in an in-memory
history along with basic metadata that can be retrieved later.
"""

from __future__ import annotations

import json
from fastmcp import FastMCP

server = FastMCP(name="seqthink-kit", version="1.0")

# In-memory store for thought history
thought_history: list[dict] = []


@server.resource("seqthink://thoughts", name="thoughts", description="JSON array of all recorded thoughts")
async def thoughts() -> bytes:
    """Return the full thought history as JSON."""
    return json.dumps(thought_history).encode("utf-8")


@server.tool(
    "sequential_thinking",
    description="Record a thought and receive sequencing metadata.",
    output_schema={
        "type": "object",
        "properties": {
            "thoughtNumber": {"type": "integer"},
            "totalThoughts": {"type": "integer"},
            "nextThoughtNeeded": {"type": "boolean"},
        },
        "required": ["thoughtNumber", "totalThoughts", "nextThoughtNeeded"],
    },
)
async def sequential_thinking(
    thought: str,
    nextThoughtNeeded: bool = True,
    totalThoughts: int | None = None,
    isRevision: bool = False,
    revisesThought: int | None = None,
    branchFromThought: int | None = None,
    branchId: str | None = None,
):
    """Record a sequential thought from the model.

    Parameters mirror the popular sequential thinking MCP server so models can
    revise or branch their reasoning when needed.
    """
    entry = {
        "thought": thought,
        "isRevision": isRevision,
        "revisesThought": revisesThought,
        "branchFromThought": branchFromThought,
        "branchId": branchId,
    }
    thought_history.append(entry)

    number = len(thought_history)
    total = totalThoughts or number
    return {
        "thoughtNumber": number,
        "totalThoughts": total,
        "nextThoughtNeeded": nextThoughtNeeded,
    }


if __name__ == "__main__":
    server.run()
