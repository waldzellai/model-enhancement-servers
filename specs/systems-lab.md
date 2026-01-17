# Systems Lab: Specification

**Status**: Proof-of-Concept (Stub Implementation)  
**Version**: 0.1.0  
**Last Updated**: 2026-01-17

---

## Executive Summary

Systems Lab is an MCP server designed to provide LLMs with computational infrastructure for system dynamics (SD) and operations research (OR) experimentation. Unlike other cognitive enhancement servers that provide reasoning patterns, Systems Lab provides **computational engines** - it turns natural language problem descriptions into executable simulations and optimizations.

**Current State**: Infrastructure scaffolding with toy/stub implementations  
**Envisioned State**: Full-featured computational laboratory for quantitative modeling

---

## What It Currently Is

### Architecture (Implemented)

**Core Pattern: Stateful Research Workbench**

1. **Persistent Artifact Store**
   - File-backed storage at `$SYSLAB_STORE_DIR`
   - Custom URI scheme: `syslab://{kind}/{path}`
   - Four artifact categories:
     - `runs/` - Simulation outputs
     - `opt/` - Optimization solutions
     - `traces/` - Execution traces
     - `viz/` - Exported visualizations
   - All tool outputs persisted as resources
   - Catalog resource for discovering artifacts

2. **Sequential Trace Recording**
   - Each tool execution records a structured trace
   - OR: `plan → formulate → solve → verify → reflect`
   - SD: `plan → simulate → analyze → verify → reflect`
   - Traces include milestones with step numbers and summaries
   - Enables LLM to "show its work" and iterate

3. **Resource-Based I/O**
   - Tools write artifacts to store
   - Resources serve artifacts back to LLM
   - URIs allow reference without re-transmission
   - Supports building multi-step workflows

### Current Tools (Stubs)

#### 1. `sd.run_simulation` - System Dynamics Simulation

**Current Implementation**: Toy logistic growth model

```python
y' = r * y * (1 - y/K) * dt
```

**Parameters**:
- `params`: Dict with `r` (growth rate), `K` (carrying capacity), `y0` (initial value)
- `horizon_steps`: Number of time steps
- `dt`: Time step size

**Outputs**:
- `syslab://runs/{uuid}/series.json` - Time series data
- `syslab://runs/{uuid}/metrics.json` - Summary statistics
- `syslab://runs/{uuid}/provenance.json` - Execution metadata

**Limitation**: Only implements one hardcoded equation, not a general SD engine.

#### 2. `or.optimize_policy_seq` - Operations Research Optimization

**Current Implementation**: Toy linear program (ignores all inputs)

```python
maximize x + y
subject to x + y ≤ 1
           x, y ≥ 0
```

**Parameters**:
- `objective`: String describing objective function (IGNORED)
- `constraints`: List of constraint definitions (IGNORED)
- `decision_vars`: List of variable definitions (IGNORED)
- `inputs`: List of input data URIs (IGNORED)
- `stepsMax`: Max sequential thinking steps
- `explainForHumans`: Human-readable output flag

**Outputs**:
- Solution with status, objective value, variable values
- Trace URI with sequential thinking steps
- Milestones array for progress tracking
- Resource URIs for artifacts

**Limitation**: Completely ignores input parameters and solves hardcoded problem.

#### 3. `pack.export_notebook` - Static Publishing

**Current Implementation**: Working (not a stub)

Exports stored artifacts as HTML notebook for human consumption.

**Parameters**:
- `title`: Notebook title
- `sections`: List of artifact URIs to include
- `format`: Output format (only `"html"` supported)

**Outputs**:
- `syslab://viz/exports/{title}.html` - HTML file

### Current Resources

1. **`syslab://catalog`** - JSON listing of all artifacts in store
2. **`syslab://{kind}/{path}`** - Dynamic serving of any stored artifact

### Current Prompts

1. **`prompts/or.sequential-playbook`** - Workflow guidance for OR tasks
2. **`prompts/sd.sequential-playbook`** - Workflow guidance for SD tasks

---

## What It's Envisioned To Become

### Vision Statement

**Systems Lab should be a computational substrate that allows LLMs to:**

1. **Formulate** - Parse natural language problem descriptions into formal mathematical models
2. **Simulate** - Execute system dynamics models with arbitrary stock-flow structures
3. **Optimize** - Solve operations research problems (LP, MIP, CP, NLP)
4. **Analyze** - Compute metrics, perform sensitivity analysis, generate insights
5. **Iterate** - Refine models based on results using sequential thinking traces

The server provides **engines and infrastructure**, the LLM provides **intelligence and interpretation**.

### Envisioned Capabilities

#### System Dynamics Engine

**Replace stub with**: General-purpose SD engine supporting:

- **Model Definition**:
  - Stocks (accumulations)
  - Flows (rates of change)
  - Converters (auxiliary variables)
  - Connectors (dependencies)
  - Table functions (nonlinear relationships)
  
- **Model Input Formats**:
  - XMILE/XML (Stella/iThink/Vensim format)
  - JSON schema (custom format)
  - Natural language → parsed into structure
  
- **Simulation Capabilities**:
  - Multiple integration methods (Euler, RK4, Runge-Kutta-Fehlberg)
  - Time-varying parameters
  - Discrete events
  - Monte Carlo / sensitivity analysis
  - Multi-scenario comparison

- **Analysis Features**:
  - Equilibrium detection
  - Oscillation characterization
  - Phase plane analysis
  - Stability analysis
  - Behavior mode classification

**Example Usage**:
```json
{
  "model": {
    "stocks": [
      {"name": "Population", "initial": 100},
      {"name": "Resources", "initial": 1000}
    ],
    "flows": [
      {"name": "BirthRate", "formula": "Population * 0.05"},
      {"name": "DeathRate", "formula": "Population * (0.01 + Population/Resources * 0.1)"},
      {"name": "ResourceConsumption", "formula": "Population * 2"}
    ]
  },
  "horizon": 100,
  "dt": 0.1
}
```

#### Operations Research Engine

**Replace stub with**: Multi-paradigm optimization supporting:

- **Problem Types**:
  - Linear Programming (LP)
  - Mixed-Integer Programming (MIP)
  - Constraint Programming (CP)
  - Nonlinear Programming (NLP)
  - Multi-objective optimization
  
- **Model Input Formats**:
  - Mathematical notation (parsed from text)
  - JSON schema (structured format)
  - MPS/LP file formats
  - Natural language → parsed into model

- **Formulation Support**:
  - Variable declaration with domains
  - Objective function specification
  - Constraint definition (equality, inequality, logical)
  - Parameter handling from data sources
  
- **Solution Features**:
  - Multiple solver backends (GLPK, CBC, SCIP, Gurobi, etc.)
  - Solution verification
  - Sensitivity analysis
  - Infeasibility diagnosis
  - Alternative optima enumeration

**Example Usage**:
```json
{
  "decision_vars": [
    {"name": "x", "type": "continuous", "lb": 0, "ub": 10},
    {"name": "y", "type": "integer", "lb": 0, "ub": 5}
  ],
  "objective": {
    "sense": "maximize",
    "expr": "3*x + 2*y"
  },
  "constraints": [
    {"expr": "2*x + y <= 10", "name": "resource_limit"},
    {"expr": "x - y >= 1", "name": "minimum_difference"}
  ]
}
```

#### Sequential Thinking Integration

**Enhance stubs with**: Real multi-step reasoning workflow

Current sequential trace is synthetic (server just writes placeholder milestones). Should become:

1. **PLAN**: LLM examines problem, proposes approach, tool validates
2. **FORMULATE**: LLM specifies model, tool parses and checks for errors
3. **SOLVE/SIMULATE**: Tool executes computation, returns results
4. **VERIFY**: Tool checks solution feasibility/validity, LLM interprets
5. **REFLECT**: LLM analyzes results, decides if refinement needed

Each step:
- Records actual reasoning from LLM
- Allows iteration if problems detected
- Builds auditable trace of methodology

#### Expanded Resource Management

**Add capabilities**:

- **Model Library**:
  - `syslab://models/{domain}/{name}` - Pre-built model templates
  - Population dynamics, epidemiology, supply chain, etc.
  
- **Data Sources**:
  - `syslab://data/{dataset}` - Parameter data and time series
  - CSV, JSON, time-series formats
  
- **Visualizations**:
  - Phase portraits
  - Time series plots (as SVG/PNG)
  - Sensitivity tornado charts
  - Solution visualizations

- **Provenance Tracking**:
  - Full lineage of artifacts
  - Reproducibility metadata (versions, seeds, inputs)
  - Computational hashes for validation

#### Analysis & Verification Tools

**Add new tools**:

1. **`sd.analyze_behavior`** - Classify system behavior modes
   - Growth, decline, oscillation, equilibrium, chaos
   - Dominant feedback loops
   - Tipping points / thresholds

2. **`or.verify_solution`** - Validate optimization results
   - Constraint satisfaction checking
   - Optimality verification
   - Sensitivity to parameters
   - Dual values / shadow prices

3. **`compare_scenarios`** - Multi-scenario comparison
   - Overlay time series
   - Compare metrics
   - Highlight differences

4. **`sensitivity_analysis`** - Parameter sensitivity
   - One-at-a-time (OAT)
   - Latin hypercube sampling
   - Sobol indices

---

## Technical Architecture

### Current Stack

- **Language**: Python 3.10+
- **MCP Framework**: FastMCP
- **OR Solver**: OR-Tools (CBC backend)
- **SD Engine**: Inline Python (stub)
- **Storage**: File system

### Envisioned Stack

- **Language**: Python 3.10+
- **MCP Framework**: FastMCP
- **OR Solvers**: 
  - OR-Tools (GLPK, CBC, SCIP)
  - Optional: Gurobi, CPLEX (if licensed)
  - PuLP for model abstraction
- **SD Engine Options**:
  - Custom implementation (stock-flow simulator)
  - PySD (XMILE/Vensim parser + simulator)
  - Integration with external simulators
- **Parser**: 
  - Tree-sitter or Lark for math notation
  - JSON schema validation
- **Storage**: 
  - File system (current)
  - Optional: SQLite for metadata
- **Visualization**:
  - Matplotlib/Plotly for charts
  - NetworkX for model structure graphs

### Design Principles

1. **Server = Computational Engine, LLM = Intelligence**
   - Server provides numerical computation
   - LLM provides problem interpretation and iteration logic
   - Clear separation of concerns

2. **Everything is an Artifact**
   - Models, solutions, traces, visualizations all persisted
   - URI-based references prevent data re-transmission
   - Enables multi-step workflows and reproducibility

3. **Sequential Thinking as Protocol**
   - Structured workflow prevents premature solving
   - Forces validation at each stage
   - Creates auditable methodology trace

4. **Fail Gracefully with Guidance**
   - Infeasible models → diagnostic messages
   - Parse errors → suggest corrections
   - Invalid parameters → explain constraints
   - All errors actionable by LLM

---

## Implementation Roadmap

### Phase 1: Enhanced OR Engine (Foundation)

**Goal**: Replace stub optimizer with real formulation parser

- [ ] Implement JSON-based model specification
- [ ] Parse decision variables with types/bounds
- [ ] Parse objective function expressions
- [ ] Parse constraint expressions
- [ ] Variable resolution and validation
- [ ] OR-Tools solver integration with multiple backends
- [ ] Infeasibility diagnosis
- [ ] Solution verification

**Milestone**: Solve arbitrary LP/MIP from JSON spec

### Phase 2: SD Engine Core

**Goal**: General-purpose stock-flow simulator

- [ ] Define model schema (stocks, flows, converters)
- [ ] Implement Euler integration
- [ ] Implement RK4 integration
- [ ] Expression evaluator for flow equations
- [ ] Time series output
- [ ] Metrics computation (peak, equilibrium, etc.)

**Milestone**: Simulate predator-prey or SIR epidemic model

### Phase 3: Natural Language Parsing

**Goal**: LLM describes problem → formal model

- [ ] Math expression parser (tree-sitter grammar)
- [ ] OR: objective/constraint extraction from text
- [ ] SD: causal loop diagram → stock-flow
- [ ] Validation and ambiguity detection
- [ ] Iterative refinement protocol

**Milestone**: "Maximize profit from products X and Y..." → solved

### Phase 4: Analysis & Verification

**Goal**: Rich analysis beyond basic solve/simulate

- [ ] Sensitivity analysis (OAT, sampling)
- [ ] Equilibrium detection for SD
- [ ] Behavior mode classification
- [ ] Dual values / shadow prices for OR
- [ ] Multi-scenario comparison

**Milestone**: Answer "What if K doubles?" without re-prompting

### Phase 5: Visualization & Publishing

**Goal**: Human-consumable outputs

- [ ] Time series plots (SVG/PNG)
- [ ] Phase portraits
- [ ] Sensitivity charts
- [ ] Model structure diagrams
- [ ] Enhanced notebook export with charts

**Milestone**: Export publication-ready analysis report

### Phase 6: Model Library & Templates

**Goal**: Accelerate common problems

- [ ] Pre-built SD models (population, epidemics, supply chain)
- [ ] OR templates (knapsack, scheduling, routing)
- [ ] Parameter datasets
- [ ] Documentation and examples

**Milestone**: "Run Bass diffusion model" → instant setup

---

## Success Criteria

Systems Lab will be considered production-ready when:

1. **OR**: Can solve arbitrary LP/MIP from natural language description
2. **SD**: Can simulate stock-flow models defined in XMILE or natural language
3. **Workflow**: Sequential thinking produces real validation at each stage
4. **Robustness**: Handles infeasibility, ambiguity, errors with actionable messages
5. **Analysis**: Provides sensitivity analysis and behavior characterization
6. **Provenance**: Full reproducibility of all computational artifacts
7. **Performance**: Solves realistic problems (100s of variables, 1000s of time steps)

---

## Non-Goals

What Systems Lab is **NOT**:

- **Not a statistics package** - No regression, hypothesis testing, machine learning
- **Not a numerical PDE solver** - Focuses on SD/OR, not general differential equations
- **Not a database** - Stores artifacts, not general data management
- **Not a visualization dashboard** - Generates plots, but not interactive exploration
- **Not an autonomous agent** - LLM drives the workflow, server provides computation

---

## Related Work

**Comparison to other servers in this repository:**

| Server | Focus | Intelligence Location |
|--------|-------|----------------------|
| Analogical Reasoning | Reasoning patterns | LLM |
| Scientific Method | Hypothesis testing workflow | LLM |
| Structured Argumentation | Dialectical reasoning | LLM |
| **Systems Lab** | **Numerical computation** | **Server** |
| Reasoning Loops | OODA workflows | LLM |

Systems Lab is unique in that the **server does real computation**, not just pattern guidance.

**Comparison to Thoughtbox:**

- Thoughtbox: Reasoning ledger (thought persistence, metacognition)
- Systems Lab: Computational ledger (simulation/optimization persistence)
- Both: Sequential traces, artifact storage, reproducibility
- Integration: Thoughtbox could use Systems Lab for quantitative reasoning steps

---

## Appendix: Example Workflows

### Example 1: Operations Research Problem

**LLM Task**: "A factory makes widgets and gadgets. Widgets take 2 hours and sell for $30. Gadgets take 1 hour and sell for $20. You have 100 hours. Maximize profit."

**Workflow**:

1. **LLM → PLAN**: "This is a linear program. Two decision variables, one resource constraint, profit objective."

2. **LLM → FORMULATE**: 
   ```json
   {
     "decision_vars": [
       {"name": "widgets", "type": "integer", "lb": 0},
       {"name": "gadgets", "type": "integer", "lb": 0}
     ],
     "objective": {"sense": "maximize", "expr": "30*widgets + 20*gadgets"},
     "constraints": [{"expr": "2*widgets + 1*gadgets <= 100"}]
   }
   ```

3. **Tool → SOLVE**: 
   ```json
   {
     "status": "OPTIMAL",
     "objective_value": 1500,
     "solution": {"widgets": 50, "gadgets": 0}
   }
   ```

4. **LLM → VERIFY**: "Solution uses all 100 hours (2*50), is integer, maximizes profit. ✓"

5. **LLM → REFLECT**: "Gadgets have lower profit per hour, so optimal is all widgets."

### Example 2: System Dynamics Model

**LLM Task**: "Simulate a population with 5% birth rate and density-dependent death rate."

**Workflow**:

1. **LLM → PLAN**: "Stock: Population. Flows: births, deaths. Death rate increases with density."

2. **LLM → FORMULATE**:
   ```json
   {
     "stocks": [{"name": "Population", "initial": 100}],
     "flows": [
       {"name": "births", "formula": "Population * 0.05"},
       {"name": "deaths", "formula": "Population * (0.01 + Population/1000 * 0.1)"}
     ]
   }
   ```

3. **Tool → SIMULATE**: Returns time series + equilibrium analysis

4. **LLM → VERIFY**: "Population stabilizes around carrying capacity. Behavior matches expectations. ✓"

5. **LLM → REFLECT**: "System shows logistic growth. Could explore different carrying capacities."

---

## Conclusion

Systems Lab is currently a **proof-of-concept** demonstrating the architecture for an AI-native computational laboratory. The infrastructure (artifact storage, sequential traces, resource serving) is solid. The computational engines (SD simulation, OR optimization) are stubs that need replacement with full implementations.

When complete, it will enable LLMs to perform quantitative modeling tasks that currently require specialized software and human expertise, while maintaining full transparency and reproducibility through the trace and artifact system.
