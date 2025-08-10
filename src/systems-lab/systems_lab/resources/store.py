from __future__ import annotations
import json
from pathlib import Path
from typing import Any

from .uris import parse_syslab_uri


class Store:
    """Simple file-backed store for systems-lab artifacts."""

    def __init__(self, root: Path):
        self.root = Path(root)
        self.kinds = {
            "runs": self.root / "runs",
            "opt": self.root / "opt",
            "traces": self.root / "traces",
            "viz": self.root / "viz",
        }

    def ensure(self) -> None:
        for path in self.kinds.values():
            path.mkdir(parents=True, exist_ok=True)

    # ------------------------------------------------------------------
    # Path helpers
    def _path_from_uri(self, uri: str) -> Path:
        kind, rel = parse_syslab_uri(uri)
        base = self.kinds.get(kind)
        if base is None:
            raise ValueError(f"Unknown kind: {kind}")
        return base / rel

    # ------------------------------------------------------------------
    # Read / write
    def write_json(self, uri: str, data: Any) -> str:
        path = self._path_from_uri(uri)
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        return uri

    def write_bytes(self, uri: str, data: bytes) -> str:
        path = self._path_from_uri(uri)
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("wb") as f:
            f.write(data)
        return uri

    def read_bytes(self, kind: str, rel: str) -> bytes:
        path = self.kinds[kind] / rel
        return path.read_bytes()

    # ------------------------------------------------------------------
    def catalog(self) -> dict[str, list[str]]:
        items: list[str] = []
        for kind, base in self.kinds.items():
            if base.exists():
                for p in base.rglob("*"):
                    if p.is_file():
                        rel = p.relative_to(base).as_posix()
                        items.append(f"syslab://{kind}/{rel}")
        return {"artifacts": items}
