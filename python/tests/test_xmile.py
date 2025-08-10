import os

import pandas as pd

from python.worker.main import run_model


def test_xmile_single_run_shape():
    spec = {
        "kind": "xmile",
        "path": os.path.abspath("examples/bass.xmile"),
        "params": {"k": 0.2},
        "initial_time": 0,
        "final_time": 10,
        "time_step": 1,
        "return_columns": ["stock"],
    }

    df = run_model(spec)

    assert isinstance(df, pd.DataFrame)
    assert len(df) == 11  # 0..10 inclusive
    assert "stock" in df.columns