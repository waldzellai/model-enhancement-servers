# Smithery Compliance - Action Plan

## Summary of Findings

After reviewing Smithery documentation and our current implementation, I've identified that our approach is **partially correct** but needs verification and potential adjustments.

## Current Status Assessment

### ✅ Definitely Correct
1. **Server Export Pattern**: `export default function createServer()` - ✅ Correct
2. **Zod Config Schema**: Using Zod for type-safe configuration - ✅ Good practice
3. **Package.json Scripts**: Using `@smithery/cli` commands - ✅ Correct
4. **Python FastMCP**: Using FastMCP with entrypoint - ✅ Correct

### ⚠️ Needs Verification
1. **`runtime: typescript` format**: May be too simplified
2. **HTTP Transport**: Not explicitly declared as `type: http`
3. **Config Schema in YAML**: Not present (may be required for Smithery UI)

### ❌ Likely Missing
1. **Explicit startCommand block** with HTTP type declaration
2. **Config schema in YAML** for platform discoverability

## Recommended Immediate Actions

### Action 1: Test Current Implementation (HIGH PRIORITY)

Test if the simplified format works:

```bash
# Test decision-framework (fully migrated)
cd /workspace/src/decision-framework
npm install
npm run dev
# Observe: Does it create HTTP endpoint or stdio?

# Test with Smithery CLI directly
npx @smithery/cli dev
```

**Expected Outcomes:**
- ✅ Server starts with HTTP transport
- ✅ Server accessible via HTTP POST
- ❌ Server only uses stdio (means we need explicit config)

### Action 2: Create Explicit HTTP Configuration (RECOMMENDED)

Based on Smithery docs, update `smithery.yaml` files to explicit format:

#### For TypeScript Servers

Replace `runtime: typescript` with:

```yaml
startCommand:
  type: http
  configSchema:
    type: object
    properties: {}
  commandFunction: |-
    (config) => ({
      "command": "npx",
      "args": ["@smithery/cli", "start"],
      "env": {}
    })
```

#### For Python Servers

```yaml
startCommand:
  type: http
  configSchema:
    type: object
    properties: {}
  entrypoint: "module_name.server:server"
```

### Action 3: Add Config Schemas to YAML (RECOMMENDED)

For servers with configuration needs, add schemas to `smithery.yaml`:

**Example for a server with config:**
```yaml
startCommand:
  type: http
  configSchema:
    type: object
    properties:
      apiKey:
        type: string
        title: "API Key"
        description: "Your API key for authentication"
      timeout:
        type: number
        title: "Timeout"
        description: "Request timeout in seconds"
        default: 30
    required: ["apiKey"]
  commandFunction: |-
    (config) => ({
      "command": "npx",
      "args": ["@smithery/cli", "start"],
      "env": {
        "API_KEY": config.apiKey,
        "TIMEOUT": config.timeout
      }
    })
```

## Alternative: Verify Simplified Format is Valid

If testing shows that `runtime: typescript` DOES work correctly, we should:

1. **Document this** in our migration summary
2. **Add a note** that this is the modern/simplified Smithery format
3. **Keep our current implementation** as-is

The simplified format would need to:
- Automatically detect the `createServer` export
- Automatically enable HTTP transport
- Automatically run via Smithery CLI
- Work with Smithery hosting platform

## Comparison: Two Possible Formats

### Format A: Explicit (Documented in Smithery Docs)
```yaml
startCommand:
  type: http  # ← Explicit HTTP
  configSchema:
    type: object
    properties: {}
  commandFunction: |-
    (config) => ({
      "command": "node",
      "args": ["dist/index.js"],
      "env": {}
    })
```

**Pros:**
- Explicitly documented in Smithery docs
- Clear what transport is used
- Config schema visible to platform
- Works with any Node.js setup

**Cons:**
- More verbose
- Needs to know build output location

### Format B: Simplified (What We Used)
```yaml
runtime: typescript
```

**Pros:**
- Very clean and simple
- Smithery CLI handles details
- Modern approach (if supported)

**Cons:**
- Not explicitly documented
- Unclear if HTTP is enabled
- May not expose config to platform

## Decision Tree

```
START
  |
  v
Test Current Implementation
  |
  +-- Works with HTTP? --> Keep simplified format + Document
  |
  +-- Only uses stdio? --> Use explicit format
  |
  +-- Errors? --> Debug and use explicit format
```

## Specific Files to Update (if needed)

If we need to use explicit format, update these files:

### TypeScript Servers
1. `/workspace/src/decision-framework/smithery.yaml`
2. `/workspace/src/analogical-reasoning/smithery.yaml`
3. `/workspace/src/collaborative-reasoning/smithery.yaml`
4. `/workspace/src/visual-reasoning/smithery.yaml`
5. `/workspace/src/metacognitive-monitoring/smithery.yaml`
6. `/workspace/src/structured-argumentation/smithery.yaml`
7. `/workspace/src/ethical-reasoning/smithery.yaml`
8. `/workspace/src/focus-group/smithery.yaml`
9. `/workspace/src/scientific-method/smithery.yaml`

### Python Servers
1. `/workspace/src/systems-lab/smithery.yaml`
2. `/workspace/src/seqthink-kit/smithery.yaml`

### Other
1. `/workspace/mcp-pewter-zero/smithery.yaml`

## Testing Checklist

- [ ] Install dependencies in decision-framework
- [ ] Run `npm run dev` - observe output
- [ ] Check if HTTP endpoint is created (look for port number)
- [ ] Test HTTP POST to endpoint with MCP message
- [ ] Try deploying to Smithery platform (if account available)
- [ ] Verify configuration shows up in Smithery UI
- [ ] Test with MCP client (Claude Desktop)
- [ ] Repeat for Python server (systems-lab)

## Recommendation

**Immediate:** Test current implementation (Action 1)

**If simplified format doesn't work:** Implement explicit HTTP configuration (Actions 2 & 3)

**Documentation:** Update `HTTP_TRANSPORT_MIGRATION_SUMMARY.md` with test results

## References

- [Smithery Deployments](https://smithery.ai/docs/deployments) - Shows HTTP transport requirement
- [Smithery CLI](https://smithery.ai/docs/smithery-cli) - CLI usage and installation
- [Session Config](https://smithery.ai/docs/use/session-config) - Config schema examples
- [MCP Specification](https://modelcontextprotocol.io) - Protocol details

## Next Steps for PR

1. **Test** the current implementation
2. **Update** based on test results
3. **Document** findings in migration summary
4. **Consider** adding example deployment guide
5. **Add** troubleshooting section to docs