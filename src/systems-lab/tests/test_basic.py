"""Basic smoke tests for Systems Lab."""
import os
import tempfile
import pytest
from pathlib import Path

# Set up test store
test_store_dir = tempfile.mkdtemp()
os.environ["SYSLAB_STORE_DIR"] = test_store_dir


def test_or_engine():
    """Test OR engine can solve a simple LP."""
    from systems_lab.or.parsers import parse_or_model_from_dict
    from systems_lab.or.engine import OREngine
    
    # Simple knapsack problem
    model_spec = {
        "decision_vars": [
            {"name": "x", "type": "continuous", "lb": 0, "ub": 10},
            {"name": "y", "type": "continuous", "lb": 0, "ub": 10}
        ],
        "objective": {
            "sense": "maximize",
            "expr": "3*x + 2*y"
        },
        "constraints": [
            {"expr": "x + y <= 5"}
        ]
    }
    
    model, errors = parse_or_model_from_dict(model_spec)
    assert errors == [], f"Model parsing failed: {errors}"
    assert model is not None
    
    engine = OREngine("CBC")
    solution, warnings = engine.solve(model)
    
    assert solution.status == "OPTIMAL"
    assert solution.objective_value is not None
    assert solution.objective_value > 14.9  # Should be 15


def test_sd_engine():
    """Test SD engine can simulate a simple model."""
    from systems_lab.sd.parsers import parse_sd_model_from_dict
    from systems_lab.sd.engine import SDEngine
    
    # Simple exponential growth
    model_spec = {
        "stocks": [
            {"name": "Population", "initial": 100}
        ],
        "flows": [
            {"name": "Growth", "formula": "0.05 * Population", "to_stock": "Population"}
        ]
    }
    
    model, errors = parse_sd_model_from_dict(model_spec)
    assert errors == [], f"Model parsing failed: {errors}"
    assert model is not None
    
    engine = SDEngine("euler")
    result, sim_errors = engine.simulate(model, t_start=0, t_end=10, dt=1.0)
    
    assert sim_errors == []
    assert result.success
    assert len(result.time) == 11  # 0 to 10 inclusive
    assert result.stocks["Population"][-1] > 100  # Should grow


def test_sd_analysis():
    """Test SD analysis can detect patterns."""
    from systems_lab.sd.analysis import analyze_simulation
    
    # Create synthetic data with equilibrium
    time = list(range(100))
    stocks = {
        "Stock1": [100 + i * 0.1 for i in range(50)] + [105.0] * 50
    }
    
    metrics = analyze_simulation(time, stocks)
    
    assert len(metrics.equilibria) > 0
    assert metrics.equilibria[0].is_stable
    assert "equilibrium" in metrics.summary.lower()


def test_sensitivity_analysis():
    """Test sensitivity analysis basic functionality."""
    from systems_lab.analysis.sensitivity import one_at_a_time_sensitivity
    
    # Simple linear model
    def model_func(params):
        return 2 * params["x"] + 3 * params["y"]
    
    base_params = {"x": 1.0, "y": 1.0}
    param_ranges = {
        "x": (0.0, 2.0),
        "y": (0.0, 2.0)
    }
    
    analysis = one_at_a_time_sensitivity(
        model_func,
        base_params,
        param_ranges,
        num_samples=5
    )
    
    assert len(analysis.results) == 2
    # y should be more sensitive (coefficient 3 vs 2)
    assert analysis.results[0].parameter in ["y", "x"]


def test_visualization():
    """Test visualization generates images."""
    from systems_lab.visualization.timeseries import plot_time_series
    
    time = list(range(10))
    series = {
        "Variable1": [i * 2 for i in range(10)],
        "Variable2": [i ** 2 for i in range(10)]
    }
    
    img_bytes = plot_time_series(time, series, title="Test Plot")
    
    assert len(img_bytes) > 0
    assert img_bytes[:4] == b'\x89PNG'  # PNG magic number


def test_store():
    """Test artifact store operations."""
    from systems_lab.resources.store import Store
    from systems_lab.resources.uris import make_syslab_uri
    from pathlib import Path
    
    store = Store(Path(test_store_dir))
    store.ensure()
    
    # Write JSON
    test_uri = make_syslab_uri("runs", "test123", "data.json")
    test_data = {"value": 42}
    store.write_json(test_uri, test_data)
    
    # Check catalog
    catalog = store.catalog()
    assert "artifacts" in catalog
    assert any("test123" in uri for uri in catalog["artifacts"])


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
