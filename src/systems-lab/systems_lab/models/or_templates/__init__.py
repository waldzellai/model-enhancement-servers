"""Operations Research model templates."""

# Knapsack Problem
KNAPSACK_01 = {
    "name": "0-1 Knapsack",
    "description": "Classic 0-1 knapsack optimization problem",
    "parameters": ["items", "capacity"],
    "model_template": {
        "decision_vars": [
            # Generated: {"name": "x_i", "type": "binary"} for each item
        ],
        "objective": {
            "sense": "maximize",
            "expr": "sum(value_i * x_i)"
        },
        "constraints": [
            {"expr": "sum(weight_i * x_i) <= capacity", "name": "capacity_constraint"}
        ]
    },
    "example": {
        "decision_vars": [
            {"name": "x1", "type": "binary"},
            {"name": "x2", "type": "binary"},
            {"name": "x3", "type": "binary"}
        ],
        "objective": {
            "sense": "maximize",
            "expr": "60*x1 + 100*x2 + 120*x3"
        },
        "constraints": [
            {"expr": "10*x1 + 20*x2 + 30*x3 <= 50", "name": "capacity"}
        ]
    }
}

# Production Planning
PRODUCTION_MIX = {
    "name": "Product Mix Optimization",
    "description": "Optimal product mix given resource constraints",
    "parameters": ["products", "resources", "profits", "resource_usage", "capacity"],
    "example": {
        "decision_vars": [
            {"name": "widgets", "type": "integer", "lb": 0},
            {"name": "gadgets", "type": "integer", "lb": 0}
        ],
        "objective": {
            "sense": "maximize",
            "expr": "30*widgets + 20*gadgets"
        },
        "constraints": [
            {"expr": "2*widgets + 1*gadgets <= 100", "name": "labor_hours"},
            {"expr": "1*widgets + 1*gadgets <= 80", "name": "materials"},
            {"expr": "widgets >= 10", "name": "min_widgets"}
        ]
    }
}

# Resource Allocation
RESOURCE_ALLOCATION = {
    "name": "Resource Allocation",
    "description": "Allocate limited resources to maximize utility",
    "parameters": ["projects", "budget"],
    "example": {
        "decision_vars": [
            {"name": "project_A", "type": "continuous", "lb": 0},
            {"name": "project_B", "type": "continuous", "lb": 0},
            {"name": "project_C", "type": "continuous", "lb": 0}
        ],
        "objective": {
            "sense": "maximize",
            "expr": "0.5*project_A + 0.7*project_B + 0.3*project_C"
        },
        "constraints": [
            {"expr": "project_A + project_B + project_C <= 1000000", "name": "budget"},
            {"expr": "project_A >= 100000", "name": "min_A"},
            {"expr": "project_B >= 150000", "name": "min_B"}
        ]
    }
}

# Diet Problem
DIET_PROBLEM = {
    "name": "Diet Optimization",
    "description": "Minimum cost diet meeting nutritional requirements",
    "parameters": ["foods", "nutrients", "requirements"],
    "example": {
        "decision_vars": [
            {"name": "bread", "type": "continuous", "lb": 0},
            {"name": "milk", "type": "continuous", "lb": 0},
            {"name": "eggs", "type": "continuous", "lb": 0}
        ],
        "objective": {
            "sense": "minimize",
            "expr": "2*bread + 3.5*milk + 4*eggs"  # Costs
        },
        "constraints": [
            {"expr": "4*bread + 8*milk + 6*eggs >= 20", "name": "protein"},
            {"expr": "15*bread + 12*milk + 1*eggs >= 50", "name": "carbs"},
            {"expr": "1*bread + 10*milk + 5*eggs >= 15", "name": "fat"}
        ]
    }
}

# Facility Location
FACILITY_LOCATION = {
    "name": "Facility Location",
    "description": "Optimal placement of facilities to minimize cost",
    "parameters": ["locations", "customers", "fixed_costs", "transport_costs"],
    "example": {
        "decision_vars": [
            {"name": "open_loc1", "type": "binary"},
            {"name": "open_loc2", "type": "binary"},
            {"name": "serve_c1_from_l1", "type": "continuous", "lb": 0, "ub": 1},
            {"name": "serve_c1_from_l2", "type": "continuous", "lb": 0, "ub": 1}
        ],
        "objective": {
            "sense": "minimize",
            "expr": "1000*open_loc1 + 1500*open_loc2 + 10*serve_c1_from_l1 + 15*serve_c1_from_l2"
        },
        "constraints": [
            {"expr": "serve_c1_from_l1 + serve_c1_from_l2 == 1", "name": "demand_c1"},
            {"expr": "serve_c1_from_l1 <= open_loc1", "name": "capacity_l1"},
            {"expr": "serve_c1_from_l2 <= open_loc2", "name": "capacity_l2"}
        ]
    }
}

# All templates
ALL_TEMPLATES = {
    "knapsack": KNAPSACK_01,
    "production_mix": PRODUCTION_MIX,
    "resource_allocation": RESOURCE_ALLOCATION,
    "diet": DIET_PROBLEM,
    "facility_location": FACILITY_LOCATION
}


def get_template(name: str) -> dict:
    """Get a template by name."""
    return ALL_TEMPLATES.get(name)


def list_templates() -> list:
    """List all available templates."""
    return [
        {"id": key, "name": val["name"], "description": val["description"]}
        for key, val in ALL_TEMPLATES.items()
    ]
