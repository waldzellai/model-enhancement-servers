# Focus Group MCP Server

An MCP server for simulating focus groups with different LLM user personas to evaluate and critique other MCP servers.

## Overview

The Focus Group MCP server allows language models to:

- Simulate multiple LLM user personas with different needs and expectations
- Provide structured feedback on MCP servers from diverse perspectives
- Analyze specific focus areas like API design, usability, and documentation
- Generate actionable recommendations for server improvements
- Prioritize enhancements based on user impact

This server is particularly valuable during the development process of MCP servers to ensure they meet the needs of various types of LLM users.

## Installation

```bash
npm install
npm run build
```

## Usage

The Focus Group server can be run using:

```bash
node dist/index.js
```

As an MCP server, it communicates using stdin/stdout according to the MCP protocol.

## Key Features

- Multi-persona simulation for diverse user perspectives
- Structured feedback collection process
- Focus area analysis for targeted improvements
- Feedback categorization to make input actionable
- Recommendation generation and prioritization

For complete documentation, see [focus-group-server.md](./docs/focus-group-server.md).

## Example

Here's a simplified example of invoking the Focus Group tool:

```json
{
  "targetServer": "scientific-method-server",
  "personas": [
    {
      "id": "novice-llm",
      "name": "Novice LLM",
      "userType": "beginner",
      "usageScenario": "First-time use of MCP tools",
      "expectations": ["Clear instructions", "Simple API"],
      "priorities": ["Ease of use", "Good error messages"],
      "constraints": ["Limited tool experience", "Needs guidance"],
      "communication": {
        "style": "direct",
        "tone": "casual"
      }
    },
    {
      "id": "expert-llm",
      "name": "Expert LLM",
      "userType": "advanced",
      "usageScenario": "Complex reasoning tasks",
      "expectations": ["Flexible API", "Advanced features"],
      "priorities": ["Power", "Efficiency"],
      "constraints": ["Needs optimal workflows"],
      "communication": {
        "style": "analytical",
        "tone": "professional"
      }
    }
  ],
  "feedback": [],
  "stage": "introduction",
  "activePersonaId": "novice-llm",
  "sessionId": "session-123",
  "iteration": 0,
  "nextFeedbackNeeded": true
}
```

The Focus Group server would process this data, set up the participants, and begin the evaluation process, managing the turn-taking and feedback integration to produce useful insights for improving the target server.