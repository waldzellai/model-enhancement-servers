from __future__ import annotations
from urllib.parse import urlparse


def parse_syslab_uri(uri: str) -> tuple[str, str]:
    """Parse a syslab:// URI into (kind, relative_path)."""
    parsed = urlparse(uri)
    if parsed.scheme != "syslab":
        raise ValueError(f"Unsupported URI scheme: {parsed.scheme}")
    path = parsed.path.lstrip("/")
    if "/" in path:
        kind, rel = path.split("/", 1)
    else:
        kind, rel = path, ""
    return kind, rel


def make_syslab_uri(kind: str, *parts: str) -> str:
    rel = "/".join(p.strip("/") for p in parts if p)
    return f"syslab://{kind}/{rel}" if rel else f"syslab://{kind}"
