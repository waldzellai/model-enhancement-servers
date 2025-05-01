# Contributing to Cognitive Enhancement MCP Servers

Thank you for your interest in contributing to the Cognitive Enhancement MCP Servers!

## Development

### Structure

This repository is set up as a monorepo using npm workspaces. Each server is in its own package under the `src/` directory.

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build all packages:
   ```
   npm run build
   ```

### Testing Changes

To test local changes to a server:

1. Link the package:
   ```
   cd src/[server-name]
   npm link
   ```

2. Use the server in Claude Desktop by adding configuration to your `claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "[server-name]": {
         "command": "mcp-server-[server-name]"
       }
     }
   }
   ```

### Building Docker Images

Each server includes a Dockerfile. To build it:

```
cd src/[server-name]
docker build -t cognitive-enhancement-mcp/[server-name] .
```

## Pull Requests

When submitting a pull request:

1. Update the README.md for the server if you've added or changed features
2. Make sure all tests pass
3. Ensure your code follows the existing style in the project
4. Update the version number in package.json if needed
5. Include clear documentation for any new features

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.