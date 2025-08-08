#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import chalk from 'chalk';
// Type guard for DomainElement type
const allowedElementTypes = ["entity", "attribute", "relation", "process"];
function isValidElementType(type) {
    return typeof type === 'string' && allowedElementTypes.includes(type);
}
class AnalogicalReasoningServer {
    server;
    analogyHistory = {};
    domainRegistry = {};
    nextElementId = 1;
    constructor(server) {
        this.server = server;
    }
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
                const mappingData = {
                    sourceElement: mapping.sourceElement,
                    targetElement: mapping.targetElement,
                    mappingStrength: mapping.mappingStrength,
                    justification: mapping.justification,
                };
                if (Array.isArray(mapping.limitations) && mapping.limitations.length > 0) {
                    mappingData.limitations = mapping.limitations;
                }
                mappings.push(mappingData);
            }
        }
        const validated = {
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
            strengths: Array.isArray(data.strengths) ? data.strengths : [],
            limitations: Array.isArray(data.limitations) ? data.limitations : [],
            inferences: Array.isArray(data.inferences) ? data.inferences.map(inf => ({
                statement: String(inf.statement ?? ''),
                confidence: Number(inf.confidence ?? 0),
                basedOnMappings: Array.isArray(inf.basedOnMappings) ? inf.basedOnMappings : []
            })) : [],
            nextOperationNeeded: data.nextOperationNeeded,
        };
        if (Array.isArray(data.suggestedOperations)) {
            validated.suggestedOperations = data.suggestedOperations;
        }
        return validated;
    }
    updateDomainRegistry(domain) {
        if (!this.domainRegistry[domain.name]) {
            this.domainRegistry[domain.name] = { name: domain.name, elements: [] };
        }
        const existing = this.domainRegistry[domain.name];
        const existingIds = new Set(existing.elements.map(e => e.id));
        for (const element of domain.elements) {
            if (!existingIds.has(element.id)) {
                existing.elements.push(element);
            }
        }
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
                const confidenceIndicator = inference.confidence >= 0.7 ? '' : '?';
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
                    output += `   ${operation}\n`;
                }
            }
            else {
                output += `   Continue refining the analogy\n`;
            }
        }
        return output;
    }
    createLocalSamplingSummary(data) {
        const totalMappings = data.mappings.length;
        const strongMappings = data.mappings.filter(m => m.mappingStrength >= 0.8).length;
        const moderateMappings = data.mappings.filter(m => m.mappingStrength >= 0.5 && m.mappingStrength < 0.8).length;
        const weakMappings = totalMappings - strongMappings - moderateMappings;
        const topInferences = [...data.inferences]
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, 3)
            .map(inf => `- ${inf.statement} (${Math.round(inf.confidence * 100)}%)`)
            .join('\n');
        const strengths = (data.strengths || []).slice(0, 2).map(s => `+ ${s}`).join('\n');
        const limitations = (data.limitations || []).slice(0, 2).map(l => `- ${l}`).join('\n');
        return [
            `Analogy ${data.sourceDomain.name} → ${data.targetDomain.name} (id: ${data.analogyId}).`,
            `Mappings: ${totalMappings} (strong: ${strongMappings}, moderate: ${moderateMappings}, weak: ${weakMappings}).`,
            topInferences ? `Top inferences:\n${topInferences}` : undefined,
            strengths ? `Strengths:\n${strengths}` : undefined,
            limitations ? `Limitations:\n${limitations}` : undefined,
        ].filter(Boolean).join('\n');
    }
    async processAnalogicalReasoning(input) {
        try {
            const validatedInput = this.validateAnalogicalReasoningData(input);
            // Update analogy state
            this.updateAnalogicalReasoning(validatedInput);
            // Generate visualization
            const visualization = this.visualizeMapping(validatedInput);
            console.error(visualization);
            let samplingSummary;
            try {
                // Fallback local summary instead of calling a non-existent server method.
                samplingSummary = this.createLocalSamplingSummary(validatedInput);
            }
            catch (e) {
                console.error("Sampling failed", e);
            }
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
                            suggestedOperations: validatedInput.suggestedOperations,
                            samplingSummary
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
// Create an MCP server
const server = new Server({
    name: "analogical-reasoning",
    version: "0.1.3",
}, {
    capabilities: {
        tools: {},
    },
});
// Tool list handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = [
        {
            name: "analogicalReasoning",
            description: "Analyze and visualize analogical mappings between domains.",
            inputSchema: {
                type: "object",
                properties: {
                    sourceDomain: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            elements: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        type: { type: "string", enum: ["entity", "attribute", "relation", "process"] },
                                        description: { type: "string" }
                                    },
                                    required: ["name", "type", "description"]
                                }
                            }
                        },
                        required: ["name", "elements"]
                    },
                    targetDomain: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            elements: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        name: { type: "string" },
                                        type: { type: "string", enum: ["entity", "attribute", "relation", "process"] },
                                        description: { type: "string" }
                                    },
                                    required: ["name", "type", "description"]
                                }
                            }
                        },
                        required: ["name", "elements"]
                    },
                    mappings: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                sourceElement: { type: "string" },
                                targetElement: { type: "string" },
                                mappingStrength: { type: "number", minimum: 0, maximum: 1 },
                                justification: { type: "string" },
                                limitations: { type: "array", items: { type: "string" } }
                            },
                            required: ["sourceElement", "targetElement", "mappingStrength", "justification"]
                        }
                    },
                    analogyId: { type: "string" },
                    purpose: { type: "string", enum: ["explanation", "prediction", "problem-solving", "creative-generation"] },
                    confidence: { type: "number", minimum: 0, maximum: 1 },
                    iteration: { type: "number", minimum: 0 },
                    strengths: { type: "array", items: { type: "string" } },
                    limitations: { type: "array", items: { type: "string" } },
                    inferences: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                statement: { type: "string" },
                                confidence: { type: "number", minimum: 0, maximum: 1 },
                                basedOnMappings: { type: "array", items: { type: "string" } }
                            },
                            required: ["statement", "confidence", "basedOnMappings"]
                        }
                    },
                    nextOperationNeeded: { type: "boolean" },
                    suggestedOperations: { type: "array", items: { type: "string", enum: ["add-mapping", "revise-mapping", "draw-inference", "evaluate-limitation", "try-new-source"] } }
                },
                required: ["sourceDomain", "targetDomain", "mappings", "analogyId", "purpose", "confidence", "iteration", "nextOperationNeeded"]
            }
        }
    ];
    return {
        tools,
    };
});
const analogicalReasoningServer = new AnalogicalReasoningServer(server);
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "analogicalReasoning") {
        return await analogicalReasoningServer.processAnalogicalReasoning(request.params.arguments);
    }
    return {
        content: [{ type: "text", text: "Unknown tool" }]
    };
});
const transport = new StdioServerTransport();
await server.connect(transport);
//# sourceMappingURL=index.js.map