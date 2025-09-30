# HTTP Transport and Smithery CLI Migration Summary

This document summarizes the migration of all MCP servers to use HTTP transport and Smithery CLI.

## Overview

All servers have been updated to support HTTP transport through the Smithery CLI framework. This enables:
- HTTP-based communication instead of stdio-only
- Easier deployment and integration
- Better compatibility with cloud environments
- Simplified configuration through smithery.yaml

## Changes Made

### 1. TypeScript Servers - smithery.yaml Updates

All TypeScript servers now use the simplified smithery.yaml format:

**Files Updated:**
- `/workspace/src/decision-framework/smithery.yaml`
- `/workspace/src/analogical-reasoning/smithery.yaml` (already updated)
- `/workspace/src/collaborative-reasoning/smithery.yaml`
- `/workspace/src/visual-reasoning/smithery.yaml`
- `/workspace/src/metacognitive-monitoring/smithery.yaml`
- `/workspace/src/structured-argumentation/smithery.yaml`
- `/workspace/src/ethical-reasoning/smithery.yaml`
- `/workspace/src/focus-group/smithery.yaml`
- `/workspace/src/scientific-method/smithery.yaml`

**New Format:**
```yaml
runtime: typescript
```

**Old Format (replaced):**
```yaml
build:
  dockerBuildPath: ../../
  dockerfile: src/[server-name]/Dockerfile
startCommand:
  type: stdio
  configSchema:
    type: object
    properties: {}
  commandFunction: |
    (config) => ({
      command: 'node',
      args: ['dist/index.js'],
      env: {}
    })
```

### 2. Python Servers - smithery.yaml Creation

Created smithery.yaml files for Python servers:

**Files Created:**
- `/workspace/src/systems-lab/smithery.yaml`
- `/workspace/src/seqthink-kit/smithery.yaml`

**Format:**
```yaml
runtime: python
entrypoint: [module_name].server:server
```

### 3. MCP Pewter Zero Server

**Updated Files:**
- `/workspace/mcp-pewter-zero/smithery.yaml`
- `/workspace/mcp-pewter-zero/src/server.ts`
- `/workspace/mcp-pewter-zero/package.json`

**Changes:**
- Converted from stdio-only to Smithery CLI pattern
- Added `createServer` export function
- Added `zod` dependency for config schema
- Updated package.json scripts to use Smithery CLI commands

### 4. Decision Framework Server (Complete Example)

**Updated Files:**
- `/workspace/src/decision-framework/index.ts`
- `/workspace/src/decision-framework/package.json`
- `/workspace/src/decision-framework/smithery.yaml`

**Key Changes in index.ts:**
- Removed stdio-specific code
- Added `configSchema` using zod
- Converted to export `createServer` function pattern
- Added zod schema validation for tool inputs
- Replaced manual JSON schema with `zodToJsonSchema`

**Pattern Applied:**
```typescript
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const configSchema = z.object({});

export default function createServer({
  config,
}: {
  config: z.infer<typeof configSchema>;
}): Server {
  const server = new Server({
    name: "server-name",
    version: "0.1.3",
  }, {
    capabilities: { tools: {} },
  });
  
  // Register handlers...
  
  return server;
}
```

### 5. Package.json Updates

**Updated Scripts:**
```json
{
  "scripts": {
    "dev": "npx @smithery/cli dev",
    "build": "npx @smithery/cli build",
    "start": "node .smithery/index.cjs"
  }
}
```

**New Dependencies Added:**
```json
{
  "dependencies": {
    "zod": "^3.25.76",
    "zod-to-json-schema": "^3.24.6"
  },
  "devDependencies": {
    "tsx": "^4.20.5"
  }
}
```

**Files Updated:**
- `/workspace/src/decision-framework/package.json`
- `/workspace/mcp-pewter-zero/package.json`

## Remaining Work

The following servers still need their index.ts files converted to the createServer pattern:

1. `/workspace/src/collaborative-reasoning/index.ts`
2. `/workspace/src/visual-reasoning/index.ts`
3. `/workspace/src/metacognitive-monitoring/index.ts`
4. `/workspace/src/structured-argumentation/index.ts`
5. `/workspace/src/ethical-reasoning/index.ts`
6. `/workspace/src/focus-group/index.ts`
7. `/workspace/src/scientific-method/index.ts`
8. `/workspace/src/bias-detection/index.ts`
9. `/workspace/src/constraint-solver/index.ts`
10. `/workspace/src/narrative-planner/index.ts`
11. `/workspace/src/multimodal-synthesizer/index.ts`
12. `/workspace/src/transaction-manager/index.ts`
13. `/workspace/src/goal-tracker/index.ts`
14. `/workspace/src/glass-scrolls-mcp/index.ts`

Each needs:
- Import changes (add zod, remove stdio transport)
- Add configSchema export
- Convert tool schemas to zod schemas
- Replace main function with createServer export
- Update package.json scripts and dependencies

## Migration Pattern

### For TypeScript Servers:

1. **Import Changes:**
   ```typescript
   // Remove:
   import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
   
   // Add:
   import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
   import { z } from "zod";
   import { zodToJsonSchema } from "zod-to-json-schema";
   
   export const configSchema = z.object({});
   ```

2. **Convert Tool Schemas to Zod:**
   ```typescript
   const ToolSchema = z.object({
     field1: z.string(),
     field2: z.number().optional(),
     // ... more fields
   });
   ```

3. **Replace Server Init:**
   ```typescript
   export default function createServer({ config }: { config: z.infer<typeof configSchema> }): Server {
     const server = new Server({ name: "...", version: "..." }, { capabilities: { tools: {} } });
     // ... register handlers
     return server;
   }
   ```

4. **Update Tool Registration:**
   ```typescript
   server.setRequestHandler(CallToolRequestSchema, async (request) => {
     const { name, arguments: toolArgs } = request.params;
     
     if (name === "toolName") {
       const parsed = ToolSchema.safeParse(toolArgs);
       if (!parsed.success) {
         throw new McpError(ErrorCode.InvalidParams, `Invalid arguments: ${parsed.error.message}`);
       }
       return await processToolCall(parsed.data);
     }
     
     throw new McpError(ErrorCode.InvalidParams, `Unknown tool: ${name}`);
   });
   ```

### For Python Servers:

Python servers using FastMCP already support HTTP transport. Only smithery.yaml needs to be added:

```yaml
runtime: python
entrypoint: module_name.server:server
```

## Benefits

1. **HTTP Transport**: Servers can now communicate over HTTP, making them more versatile
2. **Easier Deployment**: Smithery CLI handles deployment complexity
3. **Better Type Safety**: Zod schemas provide runtime validation and type inference
4. **Simplified Configuration**: smithery.yaml provides a single source of truth
5. **Cloud Compatible**: HTTP transport works better in containerized/cloud environments

## Testing

To test the migrated servers:

```bash
# Development mode (auto-reload)
cd src/[server-name]
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Documentation References

- [Smithery CLI Documentation](https://smithery.ai/docs/config)
- [MCP HTTP Transport Specification](https://modelcontextprotocol.io/docs/specification/transport)
- [Zod Documentation](https://zod.dev/)