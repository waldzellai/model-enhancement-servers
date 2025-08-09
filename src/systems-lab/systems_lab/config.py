from __future__ import annotations
import os
from pathlib import Path


def get_store_dir() -> Path:
    path = os.environ.get("SYSLAB_STORE_DIR")
    if not path:
        raise RuntimeError("SYSLAB_STORE_DIR environment variable is required")
    return Path(path)


STORE_ROOT = get_store_dir()
