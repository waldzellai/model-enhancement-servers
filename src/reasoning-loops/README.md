# Reasoning Loops MCP Server

An MCP server that provides structured OODA (Observe-Orient-Decide-Act) reasoning loops for systematic verification and analysis tasks.

## Overview

This server implements formal reasoning patterns that guide agents through systematic analysis. Using the toolhost pattern, it exposes multiple reasoning loops through a single tool interface, with each loop serving its embedded documentation as a resource.

## Features

### Reasoning Loops

1. **Fact Checking** - Systematic claim verification against multiple sources
   - Searches codebase, documentation, web, and APIs
   - Confidence-scored verdicts (VERIFIED, CONTRADICTED, OUTDATED, PARTIAL, UNVERIFIABLE)
   - Evidence quality assessment

2. **Consistency Check** - Cross-reference validation and terminology consistency
   - Validates references between documents
   - Checks terminology usage
   - Verifies version alignment
   - Schema consistency validation

3. **Bias Scanning** - Detection of logical fallacies and loaded language
   - 15+ logical fallacy patterns
   - Vocabulary bias detection (absolutist language, weasel words)
   - Structural analysis (unsupported claims, missing counterarguments)
   - Argumentation quality assessment

### Knowledge Base

- **Fallacy Catalog** - Comprehensive catalog of 15 logical fallacies with:
  - Definitions and examples
  - Detection patterns
  - Category classification

## Usage

### As a Tool

```javascript
// Start fact-checking loop
{
  "operation": "fact_checking",
  "args": {
    "claim": "The API uses OAuth2 authentication",
    "source_types": ["codebase", "documentation"],
    "confidence_threshold": 0.85
  }
}

// Start bias scanning loop
{
  "operation": "bias_scanning",
  "args": {
    "text": "Text to analyze...",
    "scan_types": ["vocabulary", "logical_fallacies"],
    "severity_threshold": "warning"
  }
}
```

### As a Resource

Access loop documentation directly:

- `reasoning-loop://docs/verification/fact-checking`
- `reasoning-loop://docs/refinement/consistency-check`
- `reasoning-loop://docs/verification/bias-scanning`
- `reasoning-loop://knowledge/fallacy-catalog`

### As a Prompt

Invoke loops as prompts:

```
reasoning-loop/verification/fact-checking
```

## Architecture

### Toolhost Pattern

Single `reasoning_loop` tool with operation dispatch:
- Avoids tool proliferation
- Consistent interface
- Each operation returns embedded loop documentation

### Resource Embedding

Tool responses include the loop guide as an embedded resource, allowing agents to:
- Understand current OODA phase
- See next steps
- Access signal definitions
- Follow termination conditions

### OODA Structure

Each loop follows the OODA framework:
1. **OBSERVE** - Gather data
2. **ORIENT** - Analyze and synthesize
3. **DECIDE** - Determine actions
4. **ACT** - Execute and emit results

## Installation

```bash
npm install @waldzellai/reasoning-loops
```

## Development

```bash
npm run build    # Compile TypeScript
npm run watch    # Watch mode
```

## Integration with Other Servers

This server is designed to work alongside other cognitive enhancement servers:
- **Structured Argumentation** - Formal dialectical reasoning
- **Scientific Method** - Hypothesis testing
- **Metacognitive Monitoring** - Knowledge boundary tracking

Together they provide a comprehensive cognitive toolkit for LLMs.

## License

MIT
