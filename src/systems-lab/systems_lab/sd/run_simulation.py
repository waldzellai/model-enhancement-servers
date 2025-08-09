from __future__ import annotations
import uuid
from typing import Dict, Any

from ..resources.store import Store
from ..resources.uris import make_syslab_uri


def run_simulation(*, params: Dict[str, float], horizon_steps: int = 20, dt: float = 1.0, store: Store) -> Dict[str, Any]:
    """Simulate logistic growth y_{t+1}=y_t+r*y_t*(1-y_t/K)*dt."""
    r = float(params.get("r", 0.3))
    K = float(params.get("K", 100.0))
    y = float(params.get("y0", 10.0))

    series = [y]
    for _ in range(horizon_steps):
        y = y + r * y * (1 - y / K) * dt
        series.append(y)

    run_id = str(uuid.uuid4())
    series_uri = make_syslab_uri("runs", run_id, "series.json")
    metrics_uri = make_syslab_uri("runs", run_id, "metrics.json")
    prov_uri = make_syslab_uri("runs", run_id, "provenance.json")

    metrics = {"final": series[-1], "max": max(series)}
    provenance = {
        "tool": "sd.run_simulation",
        "versions": {},
        "seeds": {},
        "inputs": [],
        "hashes": {},
    }

    store.write_json(series_uri, {"series": series, "dt": dt})
    store.write_json(metrics_uri, metrics)
    store.write_json(prov_uri, provenance)

    return {
        "resources": [series_uri, metrics_uri],
        "summary": metrics,
        "provenance": prov_uri,
    }
