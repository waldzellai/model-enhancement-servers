# Cognitive Enhancement MCP Servers

A curated collection of Model Context Protocol servers that provide structured reasoning frameworks for large language models.

## Overview

These MCP servers transform how LLMs approach complex reasoning tasks by providing explicit cognitive scaffolding. Instead of free-form responses, models can leverage formal frameworks for argumentation, hypothesis testing, decision analysis, and more.

## Available Servers

### Core Reasoning Frameworks

1. **[Structured Argumentation](./src/structured-argumentation/)** - Formal dialectical reasoning with thesis-antithesis-synthesis progression, argument mapping, and relationship tracking.

2. **[Scientific Method](./src/scientific-method/)** - Systematic hypothesis testing with explicit variable identification, experimental design, and evidence evaluation.

3. **[Decision Framework](./src/decision-framework/)** - Multi-criteria decision analysis supporting expected utility, maximin, minimax-regret, and satisficing approaches.

4. **[Ethical Reasoning](./src/ethical-reasoning/)** - Framework-based ethical evaluation using utilitarianism, deontology, virtue ethics, care ethics, and social contract theory.

### Perspective and Insight Tools

5. **[Analogical Reasoning](./src/analogical-reasoning/)** - Structured metaphorical thinking with explicit source-target mapping, inference generation, and analogy evaluation.

6. **[Collaborative Reasoning](./src/collaborative-reasoning/)** - Multi-persona problem solving with diverse expert perspectives, disagreement management, and perspective synthesis.

7. **[Visual Reasoning](./src/visual-reasoning/)** - Diagrammatic thinking and spatial representation for graphs, flowcharts, concept maps, and system architecture.

### Meta-Cognitive Tools

8. **[Metacognitive Monitoring](./src/metacognitive-monitoring/)** - Knowledge boundary tracking, claim classification, reasoning quality assessment, and bias detection.

### Systems Modeling

9. **[Systems Lab](./src/systems-lab/)** - Production-ready System Dynamics and Operations Research server. Provides real computational engines for quantitative modeling: solve LP/MIP problems, simulate stock-flow dynamics, perform sensitivity analysis, and generate visualizations. **[Full implementation complete - v2.0]**

### Reasoning Orchestration

10. **[Reasoning Loops](./src/reasoning-loops/)** - OODA-structured reasoning loops for systematic verification and analysis. Provides fact-checking, consistency validation, and bias scanning with embedded loop guidance.

## Installation

Each server can be installed individually:

```bash
# Using npm
npm install @waldzellai/structured-argumentation

# Using yarn  
yarn add @waldzellai/structured-argumentation
```

## Usage with Claude Desktop

Add servers to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "structured-argumentation": {
      "command": "npx",
      "args": [
        "-y",
        "@waldzellai/structured-argumentation"
      ]
    },
    "scientific-method": {
      "command": "npx",
      "args": [
        "-y",
        "@waldzellai/scientific-method"
      ]
    }
  }
}
```

## Docker

All servers are available as Docker images:

```bash
docker run --rm -i waldzellai/structured-argumentation
docker run --rm -i waldzellai/scientific-method
```

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/waldzellai/model-enhancement-servers.git
cd model-enhancement-servers
npm install
```

Build all packages:

```bash
npm run build
```

Run tests:

```bash
cd mcp-pewter-zero
npm test
```

## Design Philosophy

These servers implement cognitive scaffolding through:

- **Explicit Structure**: Force decomposition of complex reasoning into well-defined steps
- **State Management**: Track reasoning progress across iterations
- **Relationship Mapping**: Maintain connections between ideas, arguments, and hypotheses
- **Confidence Tracking**: Explicit confidence scores and uncertainty acknowledgment
- **Iterative Refinement**: Support for multi-turn reasoning with state persistence

## Use Cases

- **Complex Analysis**: When problems require systematic decomposition
- **Multi-Stakeholder Decisions**: Evaluating options with competing criteria
- **Hypothesis Testing**: Scientific or business hypothesis evaluation
- **Ethical Dilemmas**: Structured moral reasoning across frameworks
- **System Design**: Architecture and process modeling
- **Metacognition**: Knowledge boundary awareness and bias detection

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Status

These servers are production-ready cognitive tools built on the MCP protocol. The systems-lab server includes comprehensive tests. Additional test coverage for other servers is planned.
