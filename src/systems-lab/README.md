# Systems Lab MCP Server

**Version**: 2.0  
**Status**: Production-Ready Core Features

An MCP server providing computational infrastructure for System Dynamics (SD) and Operations Research (OR) experimentation. Transform natural language problem descriptions into executable simulations and optimizations.

## Features

### System Dynamics Engine
- ✅ Full stock-flow simulator with Euler and RK4 integration
- ✅ JSON model specification (stocks, flows, auxiliaries, parameters)
- ✅ PySD integration for XMILE file support
- ✅ Automated behavior analysis (equilibria, oscillations, growth patterns)
- ✅ Table functions for nonlinear relationships
- ✅ Non-negativity constraints

### Operations Research Engine
- ✅ Real LP/MIP solver using OR-Tools (CBC backend)
- ✅ Expression parsing with sympy
- ✅ JSON model specification (variables, objective, constraints)
- ✅ Solution verification and constraint checking
- ✅ Infeasibility diagnosis with actionable suggestions
- ✅ Support for continuous, integer, and binary variables

### Analysis Tools
- ✅ One-at-a-time (OAT) sensitivity analysis
- ✅ Latin Hypercube Sampling for parameter exploration
- ✅ Multi-scenario comparison
- ✅ Automated metrics computation
- ✅ Behavior pattern classification

### Visualization
- ✅ Time series plots
- ✅ Phase portraits (2D state space)
- ✅ Tornado charts for sensitivity
- ✅ PNG export to artifact store

### Infrastructure
- ✅ Persistent artifact store with URI scheme (`syslab://`)
- ✅ Sequential thinking traces for iterative refinement
- ✅ Resource-based I/O (tools write, resources serve)
- ✅ Provenance tracking for reproducibility

## Installation

```bash
cd src/systems-lab
pip install -e .
```

### Dependencies

```
fastmcp>=2.11
ortools>=9.0
pysd>=3.14
sympy>=1.12
numpy>=1.24
pandas>=2.0
matplotlib>=3.7
networkx>=3.1
scipy>=1.10
```

## Quick Start

### System Dynamics: Predator-Prey Model

```json
{
  "model": {
    "stocks": [
      {"name": "Prey", "initial": 100},
      {"name": "Predators", "initial": 20}
    ],
    "flows": [
      {
        "name": "PreyBirth",
        "formula": "0.05 * Prey",
        "to_stock": "Prey"
      },
      {
        "name": "Predation",
        "formula": "0.001 * Prey * Predators",
        "from_stock": "Prey"
      },
      {
        "name": "PredatorGrowth",
        "formula": "0.0002 * Prey * Predators",
        "to_stock": "Predators"
      },
      {
        "name": "PredatorDeath",
        "formula": "0.02 * Predators",
        "from_stock": "Predators"
      }
    ]
  },
  "horizon_steps": 500,
  "dt": 0.1,
  "method": "rk4"
}
```

Call tool: `sd.run_simulation`

### Operations Research: Knapsack Problem

```json
{
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
```

Call tool: `or.optimize_policy_seq`

## Tool Reference

### Core Tools

#### `sd.run_simulation`
Run System Dynamics simulation.

**Parameters:**
- `model` (dict): Model specification with stocks, flows, auxiliaries
- `params` (dict, optional): Legacy format for simple models
- `horizon_steps` (int): Number of time steps
- `dt` (float): Time step size
- `t_start` (float): Start time
- `method` (str): Integration method ('euler' or 'rk4')

**Returns:**
- `resources`: URIs for series, metrics, analysis data
- `summary`: Quick metrics (final values, equilibrium status)
- `analysis_summary`: Human-readable behavior description
- `provenance`: Execution metadata URI

#### `or.optimize_policy_seq`
Solve optimization problem with sequential thinking.

**Parameters:**
- `decision_vars` (list): Variable specifications
- `objective` (dict): Objective function (sense, expr)
- `constraints` (list): Constraint specifications
- `parameters` (dict, optional): Constant parameters
- `stepsMax` (int): Max sequential steps

**Returns:**
- `solution`: Status, objective value, variable values
- `traceUri`: Sequential thinking trace
- `milestones`: Progress markers
- `verifications`: Validation results
- `resources`: Artifact URIs

### Analysis Tools

#### `analysis.sensitivity_oat`
One-at-a-time sensitivity analysis.

**Parameters:**
- `run_uris` (list): Simulation run URIs
- `parameter_ranges` (dict): Parameter min/max values
- `output_metric` (str): Metric to analyze
- `num_samples` (int): Samples per parameter

#### `analysis.compare_scenarios`
Compare multiple simulation scenarios.

**Parameters:**
- `scenario_uris` (list): URIs of scenarios to compare

#### `or.verify_solution`
Verify optimization solution validity.

**Parameters:**
- `model` (dict): Model specification
- `solution` (dict): Solution to verify

#### `sd.analyze_behavior`
Classify system dynamics behavior patterns.

**Parameters:**
- `series_uri` (str): Simulation results URI

### Visualization Tools

#### `viz.plot_time_series`
Generate time series plot.

**Parameters:**
- `series_uri` (str): Data URI
- `variables` (list): Variables to plot
- `title` (str): Plot title

#### `viz.plot_phase_portrait`
Create phase portrait for 2-stock model.

**Parameters:**
- `series_uri` (str): Data URI
- `stock1` (str): X-axis stock
- `stock2` (str): Y-axis stock
- `title` (str): Plot title

#### `pack.export_notebook`
Export artifacts as HTML notebook.

**Parameters:**
- `title` (str): Notebook title
- `sections` (list): Artifact URIs to include
- `format` (str): Output format (html)

## Model Specification Formats

### SD Model JSON Schema

```json
{
  "stocks": [
    {
      "name": "StockName",
      "initial": 100.0,
      "non_negative": false
    }
  ],
  "flows": [
    {
      "name": "FlowName",
      "formula": "expression",
      "from_stock": "SourceStock",
      "to_stock": "DestStock",
      "non_negative": false
    }
  ],
  "auxiliaries": [
    {
      "name": "AuxName",
      "formula": "expression"
    }
  ],
  "parameters": {
    "param_name": 0.5
  },
  "tables": [
    {
      "name": "TableName",
      "x_values": [0, 1, 2],
      "y_values": [0, 10, 15],
      "interpolation": "linear"
    }
  ]
}
```

### OR Model JSON Schema

```json
{
  "decision_vars": [
    {
      "name": "x",
      "type": "continuous",
      "lb": 0.0,
      "ub": 10.0
    }
  ],
  "objective": {
    "sense": "maximize",
    "expr": "3*x + 2*y"
  },
  "constraints": [
    {
      "expr": "2*x + y <= 10",
      "name": "resource_limit"
    }
  ],
  "parameters": {
    "capacity": 100
  }
}
```

## Resource URI Scheme

All artifacts are stored with the `syslab://` URI scheme:

- `syslab://runs/{uuid}/` - SD simulation results
  - `series.json` - Time series data
  - `metrics.json` - Summary metrics
  - `analysis.json` - Detailed behavior analysis
  - `model.json` - Model specification
  - `provenance.json` - Execution metadata

- `syslab://opt/{job_id}/` - OR optimization results
  - `solution.json` - Optimal solution
  - `model.json` - Model specification

- `syslab://traces/{uuid}/` - Sequential thinking traces
  - `trace.json` - Step-by-step reasoning

- `syslab://viz/{uuid}/` - Visualizations
  - `*.png` - Generated plots

- `syslab://catalog` - List of all artifacts

## Configuration

Set environment variable for artifact storage:

```bash
export SYSLAB_STORE_DIR=/path/to/storage
```

## Sequential Thinking Workflow

Both SD and OR tools follow a structured workflow:

1. **PLAN**: Analyze problem and select approach
2. **FORMULATE**: Parse and validate model specification
3. **SOLVE/SIMULATE**: Execute computation
4. **VERIFY**: Check solution validity
5. **REFLECT**: Analyze results and suggest refinements

Traces are recorded at `syslab://traces/` for reproducibility.

## Examples

### SIR Epidemic Model

```json
{
  "model": {
    "stocks": [
      {"name": "Susceptible", "initial": 990},
      {"name": "Infected", "initial": 10},
      {"name": "Recovered", "initial": 0}
    ],
    "flows": [
      {
        "name": "Infection",
        "formula": "0.0003 * Susceptible * Infected",
        "from_stock": "Susceptible",
        "to_stock": "Infected"
      },
      {
        "name": "Recovery",
        "formula": "0.1 * Infected",
        "from_stock": "Infected",
        "to_stock": "Recovered"
      }
    ]
  },
  "horizon_steps": 200,
  "dt": 1.0,
  "method": "rk4"
}
```

### Product Mix Optimization

```json
{
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
    {"expr": "1*widgets + 1*gadgets <= 80", "name": "materials"}
  ]
}
```

## Performance

- **SD**: Handles 1000+ time steps with 10+ stocks efficiently
- **OR**: Solves problems with 100+ variables and constraints
- **Integration**: RK4 more accurate but ~4x slower than Euler
- **Solver**: CBC handles most LP/MIP problems < 30 seconds

## Troubleshooting

### "FORMULATION_ERROR" in OR results
- Check that all variables in expressions are defined
- Verify constraint syntax (use `<=`, `>=`, or `==`)
- Ensure objective uses at least one decision variable

### "PARSE_ERROR" in SD results
- Validate JSON structure matches schema
- Check formula syntax (use Python-style expressions)
- Ensure stock/flow/auxiliary names are valid identifiers

### Negative stock values
- Set `non_negative: true` for stocks that shouldn't go negative
- Consider using smaller `dt` or RK4 integration for stability

## Architecture

```
systems_lab/
├── server.py              # FastMCP server
├── config.py              # Configuration
├── resources/             # Artifact store
│   ├── store.py
│   └── uris.py
├── sd/                    # System Dynamics
│   ├── engine.py         # Simulation engine
│   ├── parsers.py        # Model parsing
│   ├── analysis.py       # Behavior analysis
│   └── run_simulation.py
├── or/                    # Operations Research
│   ├── engine.py         # OR-Tools integration
│   ├── parsers.py        # Expression parsing
│   ├── verification.py   # Solution checking
│   └── optimize_policy_seq.py
├── analysis/              # Cross-domain analysis
│   ├── sensitivity.py
│   └── comparison.py
└── visualization/         # Plotting
    ├── timeseries.py
    ├── phase.py
    └── sensitivity.py
```

## License

MIT

## Contributing

Systems Lab is part of the Cognitive Enhancement MCP Servers collection. Contributions welcome for:
- Additional model templates
- New analysis algorithms
- Visualization enhancements
- Performance optimizations
- Documentation improvements

## Version History

### 2.0.0 (2026-01-17)
- Complete rewrite with real SD and OR engines
- PySD integration for XMILE support
- Expression parsing with sympy
- Automated behavior analysis
- Sensitivity analysis tools
- Visualization suite
- Enhanced sequential thinking

### 1.1.0 (Previous)
- Stub implementations
- Basic infrastructure
- Proof of concept
