#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import chalk from 'chalk';
class ArgumentationServer {
    argumentHistory = [];
    relationshipGraph = {};
    nextArgumentId = 1;
    validateArgumentData(input) {
        const data = input;
        if (!data.claim || typeof data.claim !== 'string') {
            throw new Error('Invalid claim: must be a string');
        }
        if (!Array.isArray(data.premises)) {
            throw new Error('Invalid premises: must be an array of strings');
        }
        if (!data.conclusion || typeof data.conclusion !== 'string') {
            throw new Error('Invalid conclusion: must be a string');
        }
        if (!data.argumentType || typeof data.argumentType !== 'string') {
            throw new Error('Invalid argumentType: must be a string');
        }
        if (typeof data.confidence !== 'number' || data.confidence < 0 || data.confidence > 1) {
            throw new Error('Invalid confidence: must be a number between 0 and 1');
        }
        if (typeof data.nextArgumentNeeded !== 'boolean') {
            throw new Error('Invalid nextArgumentNeeded: must be a boolean');
        }
        // Base object with required properties
        const validatedData = {
            claim: data.claim,
            premises: data.premises,
            conclusion: data.conclusion,
            argumentId: data.argumentId || `arg-${this.nextArgumentId++}`,
            argumentType: data.argumentType,
            confidence: data.confidence,
            nextArgumentNeeded: typeof data.nextArgumentNeeded === 'boolean' ? data.nextArgumentNeeded : true
        };
        // NOTE: exactOptionalPropertyTypes is enabled in tsconfig.json.
        // This means we cannot explicitly assign 'undefined' to optional properties.
        // Instead, we create a base object with required properties and only add
        // optional properties if they have a valid value.
        // Conditionally add optional properties
        if (data.respondsTo && typeof data.respondsTo === 'string') {
            validatedData.respondsTo = data.respondsTo;
        }
        if (Array.isArray(data.supports) && data.supports.length > 0) {
            validatedData.supports = data.supports;
        }
        if (Array.isArray(data.contradicts) && data.contradicts.length > 0) {
            validatedData.contradicts = data.contradicts;
        }
        if (Array.isArray(data.strengths) && data.strengths.length > 0) {
            validatedData.strengths = data.strengths;
        }
        if (Array.isArray(data.weaknesses) && data.weaknesses.length > 0) {
            validatedData.weaknesses = data.weaknesses;
        }
        // Add check for suggestedNextTypes based on original build error
        if (Array.isArray(data.suggestedNextTypes) && data.suggestedNextTypes.length > 0) {
            validatedData.suggestedNextTypes = data.suggestedNextTypes;
        }
        return validatedData; // Cast back to full type
    }
    formatArgument(argument) {
        const { argumentId, argumentType, claim, premises, conclusion, confidence, strengths, weaknesses } = argument;
        let typeColor;
        let typeText;
        switch (argumentType) {
            case 'thesis':
                typeColor = chalk.blue;
                typeText = '📝 THESIS';
                break;
            case 'antithesis':
                typeColor = chalk.red;
                typeText = '⚔️ ANTITHESIS';
                break;
            case 'synthesis':
                typeColor = chalk.green;
                typeText = '🔄 SYNTHESIS';
                break;
            case 'objection':
                typeColor = chalk.yellow;
                typeText = '⚠️ OBJECTION';
                break;
            case 'rebuttal':
                typeColor = chalk.magenta;
                typeText = '🛡️ REBUTTAL';
                break;
            default:
                typeColor = chalk.white;
                typeText = 'ARGUMENT';
        }
        const confidenceDisplay = chalk.gray(`Confidence: ${(confidence * 100).toFixed(0)}%`);
        const header = `${typeColor(typeText)} ${argumentId} ${confidenceDisplay}`;
        let output = `\n┌${'─'.repeat(80)}┐\n`;
        output += `│ ${header.padEnd(78)} │\n`;
        output += `├${'─'.repeat(80)}┤\n`;
        output += `│ ${chalk.bold('Claim:')} ${claim.slice(0, 71).padEnd(71)} │\n`;
        output += `│ ${chalk.bold('Premises:')}${' '.repeat(70)} │\n`;
        for (const premise of premises) {
            output += `│ • ${premise.slice(0, 76).padEnd(76)} │\n`;
        }
        output += `│ ${chalk.bold('Conclusion:')} ${conclusion.slice(0, 67).padEnd(67)} │\n`;
        if (strengths && strengths.length > 0) {
            output += `│ ${chalk.bold('Strengths:')}${' '.repeat(69)} │\n`;
            for (const strength of strengths) {
                output += `│ + ${strength.slice(0, 76).padEnd(76)} │\n`;
            }
        }
        if (weaknesses && weaknesses.length > 0) {
            output += `│ ${chalk.bold('Weaknesses:')}${' '.repeat(68)} │\n`;
            for (const weakness of weaknesses) {
                output += `│ - ${weakness.slice(0, 76).padEnd(76)} │\n`;
            }
        }
        output += `└${'─'.repeat(80)}┘`;
        return output;
    }
    updateRelationshipGraph(argument) {
        const { argumentId, respondsTo, supports, contradicts } = argument;
        if (!argumentId)
            return;
        // Initialize this argument's relationships
        if (!this.relationshipGraph[argumentId]) {
            this.relationshipGraph[argumentId] = {
                supports: [],
                contradicts: [],
                respondedBy: []
            };
        }
        // Handle respondsTo relationship
        if (respondsTo && this.relationshipGraph[respondsTo]) {
            this.relationshipGraph[respondsTo].respondedBy.push(argumentId);
        }
        // Handle supports relationships
        if (supports) {
            for (const supportedId of supports) {
                if (this.relationshipGraph[supportedId]) {
                    this.relationshipGraph[argumentId].supports.push(supportedId);
                }
            }
        }
        // Handle contradicts relationships
        if (contradicts) {
            for (const contradictedId of contradicts) {
                if (this.relationshipGraph[contradictedId]) {
                    this.relationshipGraph[argumentId].contradicts.push(contradictedId);
                }
            }
        }
    }
    getArgumentGraphSummary() {
        if (this.argumentHistory.length === 0) {
            return "No arguments in history.";
        }
        const nodes = Object.keys(this.relationshipGraph);
        let output = `\n${chalk.bold('Argument Relationship Graph')}\n\n`;
        for (const nodeId of nodes) {
            const relationships = this.relationshipGraph[nodeId];
            const nodeArg = this.argumentHistory.find(arg => arg.argumentId === nodeId);
            const nodeType = nodeArg?.argumentType || 'unknown';
            let typeDisplay;
            switch (nodeType) {
                case 'thesis':
                    typeDisplay = chalk.blue('Thesis');
                    break;
                case 'antithesis':
                    typeDisplay = chalk.red('Antithesis');
                    break;
                case 'synthesis':
                    typeDisplay = chalk.green('Synthesis');
                    break;
                case 'objection':
                    typeDisplay = chalk.yellow('Objection');
                    break;
                case 'rebuttal':
                    typeDisplay = chalk.magenta('Rebuttal');
                    break;
                default: typeDisplay = 'Unknown';
            }
            output += `${nodeId} (${typeDisplay}):\n`;
            if (relationships.supports.length > 0) {
                output += `  Supports: ${relationships.supports.join(', ')}\n`;
            }
            if (relationships.contradicts.length > 0) {
                output += `  Contradicts: ${relationships.contradicts.join(', ')}\n`;
            }
            if (relationships.respondedBy.length > 0) {
                output += `  Responded by: ${relationships.respondedBy.join(', ')}\n`;
            }
            output += '\n';
        }
        return output;
    }
    processArgument(input) {
        try {
            const validatedInput = this.validateArgumentData(input);
            // Ensure argumentId is assigned
            if (!validatedInput.argumentId) {
                validatedInput.argumentId = `arg-${this.nextArgumentId++}`;
            }
            // Add to argument history
            this.argumentHistory.push(validatedInput);
            // Update relationship graph
            this.updateRelationshipGraph(validatedInput);
            // Format the argument for display
            const formattedArgument = this.formatArgument(validatedInput);
            console.error(formattedArgument);
            // Create graph summary
            const graphSummary = this.getArgumentGraphSummary();
            console.error(graphSummary);
            // Determine suggested next steps if not provided
            let suggestedNextTypes = validatedInput.suggestedNextTypes || [];
            if (suggestedNextTypes.length === 0 && validatedInput.nextArgumentNeeded) {
                switch (validatedInput.argumentType) {
                    case 'thesis':
                        suggestedNextTypes = ['antithesis', 'objection'];
                        break;
                    case 'antithesis':
                        suggestedNextTypes = ['synthesis', 'objection'];
                        break;
                    case 'objection':
                        suggestedNextTypes = ['rebuttal'];
                        break;
                    case 'rebuttal':
                        suggestedNextTypes = ['synthesis'];
                        break;
                    default:
                        suggestedNextTypes = ['thesis', 'objection'];
                }
            }
            // Return the analysis result
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            argumentId: validatedInput.argumentId,
                            argumentType: validatedInput.argumentType,
                            nextArgumentNeeded: validatedInput.nextArgumentNeeded,
                            suggestedNextTypes: suggestedNextTypes,
                            argumentHistoryLength: this.argumentHistory.length,
                            relationshipCount: Object.keys(this.relationshipGraph).length
                        }, null, 2)
                    }]
            };
        }
        catch (error) {
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            error: error instanceof Error ? error.message : String(error),
                            status: 'failed'
                        }, null, 2)
                    }],
                isError: true
            };
        }
    }
}
const STRUCTURED_ARGUMENTATION_TOOL = {
    name: "structuredArgumentation",
    description: `A detailed tool for systematic dialectical reasoning and argument analysis.
This tool helps analyze complex questions through formal argumentation structures.
It facilitates the creation, critique, and synthesis of competing arguments.

When to use this tool:
- Evaluating competing perspectives and claims
- Analyzing complex ethical dilemmas
- Assessing policy proposals with multiple stakeholders
- Exploring scientific hypotheses and counter-arguments

Key features:
- Break down arguments into claims, premises, and conclusions
- Track relationships between arguments
- Represent objections and rebuttals
- Facilitate dialectical progression through thesis-antithesis-synthesis
- Evaluate argument strengths and weaknesses
- Visualize argument structures

Parameters explained:
- claim: The central proposition being argued
- premises: Supporting evidence or assumptions
- conclusion: The logical consequence of accepting the claim
- argumentType: Whether this is a thesis, antithesis, synthesis, objection, or rebuttal
- confidence: Your confidence level in this argument (0.0-1.0)
- respondsTo: ID of an argument this directly responds to
- supports/contradicts: IDs of arguments this supports or contradicts
- strengths/weaknesses: Notable strong or weak points of the argument
- nextArgumentNeeded: Whether another argument is needed in the dialectic`,
    inputSchema: {
        type: "object",
        properties: {
            claim: {
                type: "string",
                description: "The central proposition being argued"
            },
            premises: {
                type: "array",
                description: "Supporting evidence or assumptions",
                items: {
                    type: "string"
                }
            },
            conclusion: {
                type: "string",
                description: "The logical consequence of accepting the claim"
            },
            argumentId: {
                type: "string",
                description: "Optional unique identifier for this argument"
            },
            argumentType: {
                type: "string",
                enum: ["thesis", "antithesis", "synthesis", "objection", "rebuttal"],
                description: "The type of argument being presented"
            },
            confidence: {
                type: "number",
                description: "Confidence level in this argument (0.0-1.0)",
                minimum: 0,
                maximum: 1
            },
            respondsTo: {
                type: "string",
                description: "ID of the argument this directly responds to"
            },
            supports: {
                type: "array",
                description: "IDs of arguments this supports",
                items: {
                    type: "string"
                }
            },
            contradicts: {
                type: "array",
                description: "IDs of arguments this contradicts",
                items: {
                    type: "string"
                }
            },
            strengths: {
                type: "array",
                description: "Notable strong points of the argument",
                items: {
                    type: "string"
                }
            },
            weaknesses: {
                type: "array",
                description: "Notable weak points of the argument",
                items: {
                    type: "string"
                }
            },
            nextArgumentNeeded: {
                type: "boolean",
                description: "Whether another argument is needed in the dialectic"
            },
            suggestedNextTypes: {
                type: "array",
                description: "Suggested types for the next argument",
                items: {
                    type: "string",
                    enum: ["thesis", "antithesis", "synthesis", "objection", "rebuttal"]
                }
            }
        },
        required: ["claim", "premises", "conclusion", "argumentType", "confidence", "nextArgumentNeeded"]
    }
};
const server = new Server({
    name: "structured-argumentation-server",
    version: "0.1.2",
}, {
    capabilities: {
        tools: {},
    },
});
const argumentationServer = new ArgumentationServer();
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [STRUCTURED_ARGUMENTATION_TOOL],
}));
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "structuredArgumentation") {
        return argumentationServer.processArgument(request.params.arguments);
    }
    return {
        content: [{
                type: "text",
                text: `Unknown tool: ${request.params.name}`
            }],
        isError: true
    };
});
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Structured Argumentation MCP Server running on stdio");
}
runServer().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map