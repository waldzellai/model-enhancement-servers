# MCP Server HTTP Transport Migration Plan

## Executive Summary

This migration plan follows the Smithery Migration Guide for converting MCP servers from STDIO transport to HTTP transport using the TypeScript with Smithery CLI approach (recommended path).

## Current State

7 MCP servers currently using STDIO transport:
- analogical-reasoning
- collaborative-reasoning  
- decision-framework
- metacognitive-monitoring
- scientific-method
- structured-argumentation
- visual-reasoning

## Migration Approach: TypeScript with Smithery CLI

### Why This Approach
- **RECOMMENDED** by Smithery Migration Guide
- Simplest migration path with built-in development tools
- Automatic containerization and deployment
- Minimal configuration required
- GitHub auto-deploy integration

### Prerequisites
- Node.js 18+ installed
- GitHub repository for deployment
- Existing TypeScript MCP servers with STDIO transport

## Required Changes Per Server

### 1. Transform Main Entry Point

**Current Structure** (e.g., `src/analogical-reasoning/index.ts`):
```typescript
const server = new Server(...);
const transport = new StdioServerTransport();
await server.connect(transport);
```

**New Structure** - Export createServer function:
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export default function createServer({ config }) {
  const server = new McpServer({
    name: "server-name",
    version: "0.1.0",
  });
  
  // Register tools here
  server.registerTool(...);
  
  return server.server;
}
```

### 2. Update package.json

Add Smithery CLI scripts and module field:
```json
{
  "module": "./src/index.ts",
  "scripts": {
    "build": "npx @smithery/cli build",
    "dev": "npx @smithery/cli dev"
  }
}
```

### 3. Update smithery.yaml

Replace entire file with TypeScript runtime:
```yaml
runtime: "typescript"
```

Or with optional environment variables:
```yaml
runtime: "typescript"
env:
  NODE_ENV: "production"
```

## Project Structure After Migration

```
my-mcp-server/
├── src/
│   └── index.ts          # Exports createServer function
├── package.json          # Updated with Smithery CLI config
├── smithery.yaml         # runtime: typescript
├── tsconfig.json         
└── README.md            
```

## Migration Steps

### Phase 1: Infrastructure Setup
- [ ] Install Smithery CLI dependencies
- [ ] Create migration template based on Smithery tools
- [ ] Set up test environment

### Phase 2: Server Migrations

For each server:
1. Use `mcp__smithery-ai-migration-guide-mcp__create_migration_template` to generate template
2. Refactor existing tool handlers to fit new structure
3. Update package.json with required scripts
4. Generate new smithery.yaml with `mcp__smithery-ai-migration-guide-mcp__generate_smithery_yaml`
5. Validate with `mcp__smithery-ai-migration-guide-mcp__validate_package_json`
6. Test locally with `npm run dev` (interactive playground)

### Phase 3: Deployment
1. Push changes to GitHub repository
2. Wait for auto-deploy or manually trigger from Smithery dashboard
3. Verify deployment status
4. Test deployed endpoints

## Key Differences from STDIO

1. **No Dockerfile needed** - Smithery CLI handles containerization
2. **Session-based configuration** - Config passed to createServer
3. **HTTP transport** - Automatic handling by Smithery
4. **Interactive dev server** - Built-in testing playground

## Testing Strategy

### Local Testing
- Use `npm run dev` for interactive testing
- Smithery CLI provides automatic playground

### Integration Testing  
- Test with actual MCP clients
- Verify tool registration and execution
- Validate configuration schema

## Important Notes

From Smithery Migration Guide:
- The 'module' field in package.json MUST point to the file that exports createServer
- Include lock files (yarn.lock/pnpm-lock.yaml) if using yarn/pnpm
- No backward compatibility needed unless supporting legacy STDIO clients
- Configuration is session-based, not environment-based

## Validation Tools Available

The Smithery Migration Guide MCP server provides:
- `get_migration_overview` - Overview and requirements
- `create_migration_template` - Generate server code template
- `generate_smithery_yaml` - Create configuration file
- `validate_package_json` - Ensure correct setup
- `validate_smithery_yaml` - Validate configuration

## Success Criteria

1. All servers successfully export createServer function
2. Local testing passes with `npm run dev`
3. Successful deployment to Smithery
4. Clients can connect via HTTP transport
5. All tools function correctly

## Next Steps

1. Start with pilot server (e.g., analogical-reasoning)
2. Use Smithery Migration Guide tools to generate templates
3. Test locally with Smithery CLI dev server
4. Deploy to GitHub and verify auto-deployment
5. Iterate based on learnings from pilot