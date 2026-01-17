"""System Dynamics model templates."""

# Logistic Growth
LOGISTIC_GROWTH = {
    "name": "Logistic Growth",
    "description": "Population growth with carrying capacity",
    "parameters": ["r", "K", "initial_population"],
    "model": {
        "stocks": [
            {"name": "Population", "initial": "{initial_population}"}
        ],
        "flows": [
            {"name": "NetGrowth", "formula": "{r} * Population * (1 - Population / {K})", "to_stock": "Population"}
        ],
        "parameters": {
            "r": 0.05,
            "K": 1000,
            "initial_population": 100
        }
    }
}

# SIR Epidemic Model
SIR_MODEL = {
    "name": "SIR Epidemic Model",
    "description": "Susceptible-Infected-Recovered epidemic dynamics",
    "parameters": ["beta", "gamma", "initial_infected", "total_population"],
    "model": {
        "stocks": [
            {"name": "Susceptible", "initial": "{total_population} - {initial_infected}"},
            {"name": "Infected", "initial": "{initial_infected}"},
            {"name": "Recovered", "initial": 0}
        ],
        "flows": [
            {
                "name": "Infection",
                "formula": "{beta} * Susceptible * Infected / {total_population}",
                "from_stock": "Susceptible",
                "to_stock": "Infected"
            },
            {
                "name": "Recovery",
                "formula": "{gamma} * Infected",
                "from_stock": "Infected",
                "to_stock": "Recovered"
            }
        ],
        "parameters": {
            "beta": 0.5,
            "gamma": 0.1,
            "initial_infected": 10,
            "total_population": 1000
        }
    }
}

# Predator-Prey
PREDATOR_PREY = {
    "name": "Predator-Prey (Lotka-Volterra)",
    "description": "Classic predator-prey dynamics",
    "parameters": ["prey_growth", "predation_rate", "predator_growth", "predator_death"],
    "model": {
        "stocks": [
            {"name": "Prey", "initial": 100},
            {"name": "Predators", "initial": 20}
        ],
        "flows": [
            {
                "name": "PreyBirth",
                "formula": "{prey_growth} * Prey",
                "to_stock": "Prey"
            },
            {
                "name": "Predation",
                "formula": "{predation_rate} * Prey * Predators",
                "from_stock": "Prey"
            },
            {
                "name": "PredatorGrowth",
                "formula": "{predator_growth} * Prey * Predators",
                "to_stock": "Predators"
            },
            {
                "name": "PredatorDeath",
                "formula": "{predator_death} * Predators",
                "from_stock": "Predators"
            }
        ],
        "parameters": {
            "prey_growth": 0.05,
            "predation_rate": 0.001,
            "predator_growth": 0.0002,
            "predator_death": 0.02
        }
    }
}

# Bass Diffusion
BASS_DIFFUSION = {
    "name": "Bass Diffusion Model",
    "description": "Product adoption with innovation and imitation",
    "parameters": ["p", "q", "m"],
    "model": {
        "stocks": [
            {"name": "Adopters", "initial": 0},
            {"name": "PotentialAdopters", "initial": "{m}"}
        ],
        "flows": [
            {
                "name": "Adoption",
                "formula": "({p} + {q} * Adopters / {m}) * PotentialAdopters",
                "from_stock": "PotentialAdopters",
                "to_stock": "Adopters"
            }
        ],
        "parameters": {
            "p": 0.03,  # Innovation coefficient
            "q": 0.38,  # Imitation coefficient
            "m": 1000   # Market potential
        }
    }
}

# Inventory Management
INVENTORY_MODEL = {
    "name": "Inventory Management",
    "description": "Simple inventory system with reordering",
    "parameters": ["demand_rate", "lead_time", "reorder_point"],
    "model": {
        "stocks": [
            {"name": "Inventory", "initial": 100},
            {"name": "OnOrder", "initial": 0}
        ],
        "flows": [
            {
                "name": "Sales",
                "formula": "{demand_rate}",
                "from_stock": "Inventory"
            },
            {
                "name": "Ordering",
                "formula": "(Inventory < {reorder_point}) * (100 - Inventory - OnOrder)",
                "to_stock": "OnOrder"
            },
            {
                "name": "Receiving",
                "formula": "OnOrder / {lead_time}",
                "from_stock": "OnOrder",
                "to_stock": "Inventory"
            }
        ],
        "parameters": {
            "demand_rate": 10,
            "lead_time": 5,
            "reorder_point": 30
        }
    }
}

# All templates
ALL_TEMPLATES = {
    "logistic_growth": LOGISTIC_GROWTH,
    "sir_model": SIR_MODEL,
    "predator_prey": PREDATOR_PREY,
    "bass_diffusion": BASS_DIFFUSION,
    "inventory": INVENTORY_MODEL
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
