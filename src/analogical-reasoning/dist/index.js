#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import chalk from 'chalk';
// Define session configuration schema (optional - this server doesn't need config)
export const configSchema = z.object({});
// Type guard for DomainElement type
const allowedElementTypes = ["entity", "attribute", "relation", "process"];
function isValidElementType(type) {
    return typeof type === 'string' && allowedElementTypes.includes(type);
}
class AnalogicalReasoningServer {
    analogyHistory = {};
    domainRegistry = {};
    nextElementId = 1;
    validateAnalogicalReasoningData(input) {
        const data = input;
        // Validate required fields
        if (!data.analogyId || typeof data.analogyId !== 'string') {
            throw new Error('Invalid analogyId: must be a string');
        }
        if (!data.purpose || typeof data.purpose !== 'string') {
            throw new Error('Invalid purpose: must be a string');
        }
        if (typeof data.confidence !== 'number' || data.confidence < 0 || data.confidence > 1) {
            throw new Error('Invalid confidence: must be a number between 0 and 1');
        }
        if (typeof data.iteration !== 'number' || data.iteration < 0) {
            throw new Error('Invalid iteration: must be a non-negative number');
        }
        if (typeof data.nextOperationNeeded !== 'boolean') {
            throw new Error('Invalid nextOperationNeeded: must be a boolean');
        }
        // Validate domains
        const sourceDomain = data.sourceDomain;
        const targetDomain = data.targetDomain;
        if (!sourceDomain || typeof sourceDomain !== 'object') {
            throw new Error('Invalid sourceDomain: must be an object');
        }
        if (!targetDomain || typeof targetDomain !== 'object') {
            throw new Error('Invalid targetDomain: must be an object');
        }
        if (!sourceDomain.name || typeof sourceDomain.name !== 'string') {
            throw new Error('Invalid sourceDomain.name: must be a string');
        }
        if (!targetDomain.name || typeof targetDomain.name !== 'string') {
            throw new Error('Invalid targetDomain.name: must be a string');
        }
        if (!Array.isArray(sourceDomain.elements)) {
            throw new Error('Invalid sourceDomain.elements: must be an array');
        }
        if (!Array.isArray(targetDomain.elements)) {
            throw new Error('Invalid targetDomain.elements: must be an array');
        }
        // Validate elements
        const sourceElements = [];
        for (const element of sourceDomain.elements) {
            if (!element.id || typeof element.id !== 'string') {
                element.id = `elem-${this.nextElementId++}`;
            }
            if (!element.name || typeof element.name !== 'string') {
                throw new Error(`Invalid element name for element ${element.id}: must be a string`);
            }
            if (!element.type || typeof element.type !== 'string') {
                throw new Error(`Invalid element type for element ${element.id}: must be a string`);
            }
            if (!isValidElementType(element.type)) {
                throw new Error(`Invalid element type for element ${element.id}: must be one of ${allowedElementTypes.join(', ')}`);
            }
            if (!element.description || typeof element.description !== 'string') {
                throw new Error(`Invalid element description for element ${element.id}: must be a string`);
            }
            sourceElements.push({ id: element.id, name: element.name, type: element.type, description: element.description });
        }
        const targetElements = [];
        for (const element of targetDomain.elements) {
            if (!element.id || typeof element.id !== 'string') {
                element.id = `elem-${this.nextElementId++}`;
            }
            if (!element.name || typeof element.name !== 'string') {
                throw new Error(`Invalid element name for element ${element.id}: must be a string`);
            }
            if (!element.type || typeof element.type !== 'string') {
                throw new Error(`Invalid element type for element ${element.id}: must be a string`);
            }
            if (!isValidElementType(element.type)) {
                throw new Error(`Invalid element type for element ${element.id}: must be one of ${allowedElementTypes.join(', ')}`);
            }
            if (!element.description || typeof element.description !== 'string') {
                throw new Error(`Invalid element description for element ${element.id}: must be a string`);
            }
            targetElements.push({ id: element.id, name: element.name, type: element.type, description: element.description });
        }
        // Validate mappings
        const mappings = [];
        if (Array.isArray(data.mappings)) {
            for (const mapping of data.mappings) {
                if (!mapping.sourceElement || typeof mapping.sourceElement !== 'string') {
                    throw new Error('Invalid mapping sourceElement: must be a string');
                }
                if (!mapping.targetElement || typeof mapping.targetElement !== 'string') {
                    throw new Error('Invalid mapping targetElement: must be a string');
                }
                if (typeof mapping.mappingStrength !== 'number' || mapping.mappingStrength < 0 || mapping.mappingStrength > 1) {
                    throw new Error('Invalid mappingStrength: must be a number between 0 and 1');
                }
                if (!mapping.justification || typeof mapping.justification !== 'string') {
                    throw new Error('Invalid mapping justification: must be a string');
                }
                const limitations = [];
                if (mapping.limitations && Array.isArray(mapping.limitations)) {
                    for (const limitation of mapping.limitations) {
                        if (typeof limitation === 'string') {
                            limitations.push(limitation);
                        }
                    }
                }
                const mappingData = {
                    sourceElement: mapping.sourceElement,
                    targetElement: mapping.targetElement,
                    mappingStrength: mapping.mappingStrength,
                    justification: mapping.justification,
                    // limitations is added conditionally below
                };
                if (limitations.length > 0) {
                    mappingData.limitations = limitations;
                }
                mappings.push(mappingData);
            }
        }
        // Validate arrays
        const strengths = [];
        if (Array.isArray(data.strengths)) {
            for (const strength of data.strengths) {
                if (typeof strength === 'string') {
                    strengths.push(strength);
                }
            }
        }
        const limitations = [];
        if (Array.isArray(data.limitations)) {
            for (const limitation of data.limitations) {
                if (typeof limitation === 'string') {
                    limitations.push(limitation);
                }
            }
        }
        const inferences = [];
        if (Array.isArray(data.inferences)) {
            for (const inference of data.inferences) {
                if (!inference.statement || typeof inference.statement !== 'string') {
                    throw new Error('Invalid inference statement: must be a string');
                }
                if (typeof inference.confidence !== 'number' || inference.confidence < 0 || inference.confidence > 1) {
                    throw new Error('Invalid inference confidence: must be a number between 0 and 1');
                }
                if (!Array.isArray(inference.basedOnMappings)) {
                    throw new Error('Invalid inference basedOnMappings: must be an array of mapping IDs');
                }
                const basedOnMappings = [];
                for (const mappingId of inference.basedOnMappings) {
                    if (typeof mappingId === 'string') {
                        basedOnMappings.push(mappingId);
                    }
                }
                inferences.push({
                    statement: inference.statement,
                    confidence: inference.confidence,
                    basedOnMappings
                });
            }
        }
        const suggestedOperations = [];
        if (Array.isArray(data.suggestedOperations)) {
            for (const operation of data.suggestedOperations) {
                if (typeof operation === 'string' && [
                    'add-mapping', 'revise-mapping', 'draw-inference', 'evaluate-limitation', 'try-new-source'
                ].includes(operation)) {
                    suggestedOperations.push(operation);
                }
            }
        }
        // Create validated data object with conditional suggestedOperations
        const validatedData = {
            sourceDomain: {
                name: sourceDomain.name,
                elements: sourceElements
            },
            targetDomain: {
                name: targetDomain.name,
                elements: targetElements
            },
            mappings,
            analogyId: data.analogyId,
            purpose: data.purpose,
            confidence: data.confidence,
            iteration: data.iteration,
            strengths,
            limitations,
            inferences,
            nextOperationNeeded: data.nextOperationNeeded,
            // suggestedOperations is added conditionally below
        };
        if (suggestedOperations.length > 0) {
            validatedData.suggestedOperations = suggestedOperations;
        }
        return validatedData;
    }
    updateDomainRegistry(domain) {
        this.domainRegistry[domain.name] = {
            name: domain.name,
            elements: [...domain.elements]
        };
    }
    updateAnalogicalReasoning(data) {
        let historyEntry = this.analogyHistory[data.analogyId]; // Get potential entry
        if (!historyEntry) { // Check if it exists
            historyEntry = []; // Create new array if not
            this.analogyHistory[data.analogyId] = historyEntry; // Assign it back to the object
        }
        // Now, historyEntry is guaranteed to be AnalogicalReasoningData[]
        historyEntry.push(data);
        // Update domain registry
        this.updateDomainRegistry(data.sourceDomain);
        this.updateDomainRegistry(data.targetDomain);
    }
    visualizeMapping(data) {
        const { sourceDomain, targetDomain, mappings } = data;
        let output = `\n${chalk.bold(`ANALOGY: ${sourceDomain.name}  ${targetDomain.name}`)} (ID: ${data.analogyId})\n\n`;
        // Purpose and confidence
        output += `${chalk.cyan('Purpose:')} ${data.purpose}\n`;
        output += `${chalk.cyan('Confidence:')} ${(data.confidence * 100).toFixed(0)}%\n`;
        output += `${chalk.cyan('Iteration:')} ${data.iteration}\n\n`;
        // Create mapping visualization
        output += `${chalk.bold('STRUCTURAL MAPPINGS:')}\n\n`;
        const mappingsBySourceType = new Map();
        for (const mapping of mappings) {
            const sourceElement = sourceDomain.elements.find(e => e.id === mapping.sourceElement);
            if (!sourceElement)
                continue;
            if (!mappingsBySourceType.has(sourceElement.type)) {
                mappingsBySourceType.set(sourceElement.type, []);
            }
            mappingsBySourceType.get(sourceElement.type)?.push(mapping);
        }
        // Display mappings grouped by element type
        for (const [type, typeMappings] of mappingsBySourceType.entries()) {
            output += `${chalk.yellow(type.toUpperCase())} MAPPINGS:\n`;
            for (const mapping of typeMappings) {
                const sourceElement = sourceDomain.elements.find(e => e.id === mapping.sourceElement);
                const targetElement = targetDomain.elements.find(e => e.id === mapping.targetElement);
                if (!sourceElement || !targetElement)
                    continue;
                // Color-code based on mapping strength
                let strengthIndicator;
                if (mapping.mappingStrength >= 0.8) {
                    strengthIndicator = chalk.green('STRONG');
                }
                else if (mapping.mappingStrength >= 0.5) {
                    strengthIndicator = chalk.yellow('MODERATE');
                }
                else {
                    strengthIndicator = chalk.red('WEAK');
                }
                output += `  ${chalk.bold(sourceElement.name)} ====[ ${strengthIndicator} ]===> ${chalk.bold(targetElement.name)}\n`;
                output += `    ${chalk.dim('Justification:')} ${mapping.justification}\n`;
                if (mapping.limitations && mapping.limitations.length > 0) {
                    output += `    ${chalk.dim('Limitations:')} ${mapping.limitations.join(', ')}\n`;
                }
                output += '\n';
            }
        }
        // Show unmapped elements
        const mappedSourceIds = new Set(mappings.map(m => m.sourceElement));
        const mappedTargetIds = new Set(mappings.map(m => m.targetElement));
        const unmappedSourceElements = sourceDomain.elements.filter(e => !mappedSourceIds.has(e.id));
        const unmappedTargetElements = targetDomain.elements.filter(e => !mappedTargetIds.has(e.id));
        if (unmappedSourceElements.length > 0) {
            output += `${chalk.red('UNMAPPED SOURCE ELEMENTS:')}\n`;
            for (const element of unmappedSourceElements) {
                output += `  - ${element.name} (${element.type}): ${element.description}\n`;
            }
            output += '\n';
        }
        if (unmappedTargetElements.length > 0) {
            output += `${chalk.red('UNMAPPED TARGET ELEMENTS:')}\n`;
            for (const element of unmappedTargetElements) {
                output += `  - ${element.name} (${element.type}): ${element.description}\n`;
            }
            output += '\n';
        }
        // Show inferences
        if (data.inferences.length > 0) {
            output += `${chalk.bold('INFERENCES:')}\n`;
            for (const inference of data.inferences) {
                const confidenceIndicator = inference.confidence >= 0.7 ? '' : '?';
                output += `  ${confidenceIndicator} ${inference.statement}\n`;
                output += `    ${chalk.dim(`Confidence: ${(inference.confidence * 100).toFixed(0)}%`)}\n`;
                output += '\n';
            }
        }
        // Show strengths and limitations
        if (data.strengths.length > 0) {
            output += `${chalk.green('STRENGTHS:')}\n`;
            for (const strength of data.strengths) {
                output += `  + ${strength}\n`;
            }
            output += '\n';
        }
        if (data.limitations.length > 0) {
            output += `${chalk.red('LIMITATIONS:')}\n`;
            for (const limitation of data.limitations) {
                output += `  - ${limitation}\n`;
            }
            output += '\n';
        }
        // Next steps
        if (data.nextOperationNeeded) {
            output += `${chalk.blue('SUGGESTED NEXT OPERATIONS:')}\n`;
            const operations = data.suggestedOperations || [];
            if (operations.length > 0) {
                for (const operation of operations) {
                    output += `   ${operation}\n`;
                }
            }
            else {
                output += `   Continue refining the analogy\n`;
            }
        }
        return output;
    }
    processAnalogicalReasoning(input) {
        try {
            const validatedInput = this.validateAnalogicalReasoningData(input);
            // Update analogy state
            this.updateAnalogicalReasoning(validatedInput);
            // Generate visualization
            const visualization = this.visualizeMapping(validatedInput);
            console.error(visualization);
            // Return the analysis result
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            analogyId: validatedInput.analogyId,
                            purpose: validatedInput.purpose,
                            iteration: validatedInput.iteration,
                            sourceDomain: validatedInput.sourceDomain.name,
                            targetDomain: validatedInput.targetDomain.name,
                            mappingCount: validatedInput.mappings.length,
                            inferenceCount: validatedInput.inferences.length,
                            nextOperationNeeded: validatedInput.nextOperationNeeded,
                            suggestedOperations: validatedInput.suggestedOperations
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
// Tool input schema using Zod
const analogicalReasoningInputSchema = z.object({
    sourceDomain: z.object({
        name: z.string().describe("Name of the source domain"),
        elements: z.array(z.object({
            id: z.string().optional(),
            name: z.string(),
            type: z.enum(["entity", "attribute", "relation", "process"]),
            description: z.string()
        }))
    }),
    targetDomain: z.object({
        name: z.string().describe("Name of the target domain"),
        elements: z.array(z.object({
            id: z.string().optional(),
            name: z.string(),
            type: z.enum(["entity", "attribute", "relation", "process"]),
            description: z.string()
        }))
    }),
    mappings: z.array(z.object({
        sourceElement: z.string(),
        targetElement: z.string(),
        mappingStrength: z.number().min(0).max(1),
        justification: z.string(),
        limitations: z.array(z.string()).optional()
    })),
    analogyId: z.string(),
    purpose: z.enum(["explanation", "prediction", "problem-solving", "creative-generation"]),
    confidence: z.number().min(0).max(1),
    iteration: z.number().int().min(0),
    strengths: z.array(z.string()),
    limitations: z.array(z.string()),
    inferences: z.array(z.object({
        statement: z.string(),
        confidence: z.number().min(0).max(1),
        basedOnMappings: z.array(z.string())
    })),
    nextOperationNeeded: z.boolean(),
    suggestedOperations: z.array(z.enum(["add-mapping", "revise-mapping", "draw-inference", "evaluate-limitation", "try-new-source"])).optional()
});
// Export createServer function for Smithery CLI
export default function createServer({ config, }) {
    const server = new McpServer({
        name: "analogical-reasoning-server",
        version: "0.1.3",
    });
    const analogicalReasoningServer = new AnalogicalReasoningServer();
    // Register the analogical reasoning tool
    server.registerTool("analogicalReasoning", {
        title: "Analogical Reasoning",
        description: `A detailed tool for analogical thinking between source and target domains.
This tool helps models structure analogies systematically to improve understanding and reasoning.
It facilitates explicit mapping between domains, inference generation, and analogy evaluation.

Use this tool to:
- Map concepts between familiar and unfamiliar domains
- Draw insights through structural alignment
- Generate predictions based on analogical transfer
- Solve problems by applying known solutions to new contexts`,
        inputSchema: {
            data: analogicalReasoningInputSchema
        },
    }, async ({ data }) => {
        // Validate and process the input
        const result = await analogicalReasoningServer.processAnalogicalReasoning(data);
        return result;
    });
    return server.server;
}
// Maintain STDIO compatibility for backward compatibility
async function main() {
    // Create server with empty configuration (no config needed for this server)
    const server = createServer({
        config: {},
    });
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Analogical Reasoning MCP Server running in stdio mode");
}
// Only run main if this file is executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch((error) => {
        console.error("Fatal error running server:", error);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map