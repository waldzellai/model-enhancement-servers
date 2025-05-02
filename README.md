# Cognitive Enhancement MCP Servers

A collection of Model Context Protocol servers that provide cognitive enhancement tools for large language models.

## Servers

This monorepo contains the following MCP servers:

1. **Structured Argumentation** - A server for formal dialectical reasoning
2. **Visual Reasoning** - A server for diagrammatic thinking and spatial representation
3. **Scientific Method** - A server for hypothesis testing and evidence evaluation
4. **Analogical Reasoning** - A server for structured metaphorical thinking
5. **Metacognitive Monitoring** - A server for knowledge assessment and confidence tracking
6. **Decision Framework** - A server for structured decision analysis
7. **Collaborative Reasoning** - A server for multi-perspective problem solving

## Installation

Each server can be installed individually:

```bash
# Using npm
npm install @waldzellai/structured-argumentation

# Using yarn
yarn add @waldzellai/structured-argumentation
```

## Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "structured-argumentation": {
      "command": "npx",
      "args": [
        "-y",
        "@waldzellai/structured-argumentation"
      ]
    }
  }
}
```

## Docker

All servers are available as Docker images:

```bash
docker run --rm -i waldzellai/structured-argumentation
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

## License

This project is licensed under the MIT License - see the LICENSE file for details.