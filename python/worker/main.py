from __future__ import annotations

from typing import Any, Dict

import pandas as pd


def run_model(spec: Dict[str, Any]) -> pd.DataFrame:
    """Run a system dynamics model based on a spec dict.

    Supported kinds:
    - 'xmile': Load and run an XMILE model via PySD.

    Expected spec keys for 'xmile':
    - 'path': Path to the .xmile file
    - 'params': Dict of constant/aux overrides (optional)
    - 'initial_time', 'final_time', 'time_step': Simulation controls (optional)
    - 'return_columns': List of variables to return (optional)
    - 'return_timestamps': Iterable of times to sample (optional)
    """

    kind = spec.get("kind")

    if kind == "xmile":
        try:
            import pysd  # Imported lazily to avoid hard dependency when unused
        except Exception as exc:
            raise RuntimeError("PySD is required to run XMILE models. Please install dependencies from requirements.txt") from exc

        model_path = spec["path"]
        model = pysd.read_xmile(model_path)

        params = spec.get("params") or {}

        run_kwargs: Dict[str, Any] = {}
        for key in ("final_time", "time_step", "return_timestamps"):
            if key in spec and spec[key] is not None:
                run_kwargs[key] = spec[key]
        if "return_columns" in spec and spec["return_columns"] is not None:
            run_kwargs["return_columns"] = spec["return_columns"]

        result = model.run(params=params, **run_kwargs)
        if isinstance(result, pd.Series):
            result = result.to_frame()
        return result

    raise ValueError(f"Unsupported model kind: {kind}")