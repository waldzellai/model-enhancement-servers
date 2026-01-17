#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListResourcesRequestSchema } from "@modelcontextprotocol/sdk/types.js";
// Import loop definitions
import { FACT_CHECKING_LOOP } from "./loops/verification/fact-checking.js";
import { CONSISTENCY_CHECK_LOOP } from "./loops/refinement/consistency-check.js";
import { BIAS_SCANNING_LOOP } from "./loops/verification/bias-scanning.js";
import { FALLACY_CATALOG } from "./knowledge/fallacy-catalog.js";
// Create MCP server instance
const server = new McpServer({
    name: "reasoning-loops-server",
    version: "0.1.0"
});
// Register individual resources
server.registerResource("fact-checking-loop", "reasoning-loop://docs/verification/fact-checking", {
    title: "Fact Checking OODA Loop",
    description: "OODA loop for systematic claim verification against sources",
    mimeType: "text/markdown"
}, async () => ({
    contents: [{
            uri: "reasoning-loop://docs/verification/fact-checking",
            mimeType: "text/markdown",
            text: FACT_CHECKING_LOOP,
        }]
}));
server.registerResource("consistency-check-loop", "reasoning-loop://docs/refinement/consistency-check", {
    title: "Consistency Check OODA Loop",
    description: "OODA loop for validating cross-references and consistency",
    mimeType: "text/markdown"
}, async () => ({
    contents: [{
            uri: "reasoning-loop://docs/refinement/consistency-check",
            mimeType: "text/markdown",
            text: CONSISTENCY_CHECK_LOOP,
        }]
}));
server.registerResource("bias-scanning-loop", "reasoning-loop://docs/verification/bias-scanning", {
    title: "Bias Scanning OODA Loop",
    description: "OODA loop for detecting logical fallacies and loaded language",
    mimeType: "text/markdown"
}, async () => ({
    contents: [{
            uri: "reasoning-loop://docs/verification/bias-scanning",
            mimeType: "text/markdown",
            text: BIAS_SCANNING_LOOP,
        }]
}));
server.registerResource("fallacy-catalog", "reasoning-loop://knowledge/fallacy-catalog", {
    title: "Logical Fallacy Catalog",
    description: "Comprehensive catalog of logical fallacies with definitions and examples",
    mimeType: "application/json"
}, async () => ({
    contents: [{
            uri: "reasoning-loop://knowledge/fallacy-catalog",
            mimeType: "application/json",
            text: JSON.stringify(FALLACY_CATALOG, null, 2),
        }]
}));
// Override resource listing to provide consolidated list
server.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: [
        {
            uri: "reasoning-loop://docs/verification/fact-checking",
            name: "fact-checking-loop",
            title: "Fact Checking OODA Loop",
            description: "OODA loop for systematic claim verification against sources",
            mimeType: "text/markdown"
        },
        {
            uri: "reasoning-loop://docs/refinement/consistency-check",
            name: "consistency-check-loop",
            title: "Consistency Check OODA Loop",
            description: "OODA loop for validating cross-references and consistency",
            mimeType: "text/markdown"
        },
        {
            uri: "reasoning-loop://docs/verification/bias-scanning",
            name: "bias-scanning-loop",
            title: "Bias Scanning OODA Loop",
            description: "OODA loop for detecting logical fallacies and loaded language",
            mimeType: "text/markdown"
        },
        {
            uri: "reasoning-loop://knowledge/fallacy-catalog",
            name: "fallacy-catalog",
            title: "Logical Fallacy Catalog",
            description: "Comprehensive catalog of logical fallacies with definitions and examples",
            mimeType: "application/json"
        },
    ]
}));
// Register prompts for starting loops
server.registerPrompt("fact-checking", {
    title: "Fact Checking Loop",
    description: "Start a fact-checking OODA loop for systematic claim verification. Args: claim (required), source_types (optional)",
    argsSchema: {}
}, async (args) => {
    const claim = args?.claim || "[claim not provided]";
    const sourceTypes = args?.source_types || "codebase, documentation";
    return {
        messages: [{
                role: "user",
                content: {
                    type: "text",
                    text: `# Fact Checking OODA Loop

## Your Task

Verify the following claim using systematic fact-checking:

**Claim**: ${claim}

**Source Types**: ${sourceTypes}

## Loop Guide

${FACT_CHECKING_LOOP}

## Instructions

Follow the OODA structure above to systematically verify this claim:

1. **OBSERVE**: Search sources and gather evidence
2. **ORIENT**: Categorize and weight the evidence
3. **DECIDE**: Determine verdict and correction strategy
4. **ACT**: Generate final report with verdict, confidence, and evidence

You are the intelligence - use the loop guide as a structured thinking framework. The guide provides the pattern, you do the actual reasoning, searching, and analysis.`,
                },
            }],
    };
});
server.registerPrompt("consistency-check", {
    title: "Consistency Check Loop",
    description: "Start a consistency check loop for cross-reference validation. Args: artifacts (required), check_types (optional)",
    argsSchema: {}
}, async (args) => {
    const artifacts = args?.artifacts || "[no artifacts specified]";
    const checkTypes = args?.check_types || "cross_references, terminology";
    return {
        messages: [{
                role: "user",
                content: {
                    type: "text",
                    text: `# Consistency Check OODA Loop

## Your Task

Check consistency across these artifacts:

**Artifacts**: ${artifacts}

**Check Types**: ${checkTypes}

## Loop Guide

${CONSISTENCY_CHECK_LOOP}

## Instructions

Follow the OODA structure above to validate consistency:

1. **OBSERVE**: Index artifacts and extract references/terms
2. **ORIENT**: Analyze for inconsistencies
3. **DECIDE**: Categorize issues and determine resolution strategy
4. **ACT**: Generate consistency report and recommendations

You are the intelligence - use the loop guide as a structured thinking framework.`,
                },
            }],
    };
});
server.registerPrompt("bias-scanning", {
    title: "Bias Scanning Loop",
    description: "Start a bias scanning loop for detecting fallacies and loaded language. Args: text (required), scan_types (optional)",
    argsSchema: {}
}, async (args) => {
    const text = args?.text || "[no text provided]";
    const scanTypes = args?.scan_types || "vocabulary, logical_fallacies";
    return {
        messages: [{
                role: "user",
                content: {
                    type: "text",
                    text: `# Bias Scanning OODA Loop

## Your Task

Analyze this text for bias:

**Text**: ${text}

**Scan Types**: ${scanTypes}

## Loop Guide

${BIAS_SCANNING_LOOP}

## Fallacy Catalog

${JSON.stringify(FALLACY_CATALOG, null, 2)}

## Instructions

Follow the OODA structure above to detect bias:

1. **OBSERVE**: Extract claims and scan for bias patterns using the fallacy catalog
2. **ORIENT**: Categorize findings by type and severity
3. **DECIDE**: Filter and prioritize issues to report
4. **ACT**: Generate bias report with specific examples and recommendations

You are the intelligence - use the loop guide and fallacy catalog as reference. The guide provides the pattern, you do the actual analysis.`,
                },
            }],
    };
});
// Main function
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Reasoning Loops MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map