#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import chalk from 'chalk';
function isTransformationType(value) {
    return typeof value === 'string' && ['rotate', 'move', 'resize', 'recolor', 'regroup'].includes(value);
}
class VisualReasoningServer {
    visualStateHistory = {};
    currentVisualState = {};
    nextElementId = 1;
    validateOperationData(input) {
        const data = input;
        if (!data.operation || typeof data.operation !== 'string') {
            throw new Error('Invalid operation: must be a string');
        }
        if (!data.diagramId || typeof data.diagramId !== 'string') {
            throw new Error('Invalid diagramId: must be a string');
        }
        if (!data.diagramType || typeof data.diagramType !== 'string') {
            throw new Error('Invalid diagramType: must be a string');
        }
        if (typeof data.iteration !== 'number' || data.iteration < 0) {
            throw new Error('Invalid iteration: must be a non-negative number');
        }
        if (typeof data.nextOperationNeeded !== 'boolean') {
            throw new Error('Invalid nextOperationNeeded: must be a boolean');
        }
        // Validate transformationType
        if (!data.transformationType) {
            throw new Error('Missing required property: transformationType');
        }
        // Validate elements if provided
        const validatedElements = [];
        if (data.elements && Array.isArray(data.elements)) {
            for (const element of data.elements) {
                if (!element.id) {
                    element.id = `elem-${this.nextElementId++}`;
                }
                if (!element.type || typeof element.type !== 'string') {
                    throw new Error(`Invalid element type for element ${element.id}: must be a string`);
                }
                if (!element.properties || typeof element.properties !== 'object') {
                    element.properties = {};
                }
                validatedElements.push(element);
            }
        }
        // Base object with non-optional properties
        const validatedData = {
            operation: data.operation,
            diagramId: data.diagramId,
            diagramType: data.diagramType,
            iteration: data.iteration,
            nextOperationNeeded: typeof data.nextOperationNeeded === 'boolean' ? data.nextOperationNeeded : true
        };
        // NOTE: exactOptionalPropertyTypes is enabled in tsconfig.json.
        // This means we cannot explicitly assign 'undefined' to optional properties.
        // Instead, we create a base object with required properties and only add
        // optional properties if they have a valid value.
        // Conditionally add optional properties
        if (isTransformationType(data.transformationType)) {
            validatedData.transformationType = data.transformationType;
        }
        if (data.observation) {
            validatedData.observation = data.observation;
        }
        if (data.insight) {
            validatedData.insight = data.insight;
        }
        if (validatedElements.length > 0) {
            validatedData.elements = validatedElements;
        }
        return validatedData; // Cast back to full type for return
    }
    updateVisualState(operation) {
        const { diagramId, elements, operation: operationType } = operation;
        // Initialize diagram state if it doesn't exist
        if (!this.visualStateHistory[diagramId]) {
            this.visualStateHistory[diagramId] = [];
        }
        if (!this.currentVisualState[diagramId]) {
            this.currentVisualState[diagramId] = {};
        }
        // Add operation to history
        this.visualStateHistory[diagramId].push(operation);
        // Update current state based on operation type
        if (elements) {
            switch (operationType) {
                case 'create':
                    for (const element of elements) {
                        this.currentVisualState[diagramId][element.id] = element;
                    }
                    break;
                case 'update':
                    for (const element of elements) {
                        if (this.currentVisualState[diagramId][element.id]) {
                            this.currentVisualState[diagramId][element.id] = {
                                ...this.currentVisualState[diagramId][element.id],
                                ...element
                            };
                        }
                    }
                    break;
                case 'delete':
                    for (const element of elements) {
                        delete this.currentVisualState[diagramId][element.id];
                    }
                    break;
                case 'transform':
                    // Handled by specific transformation logic
                    break;
                case 'observe':
                    // No state change for observations
                    break;
            }
        }
        // Handle transformations
        if (operationType === 'transform' && operation.transformationType && elements) {
            for (const element of elements) {
                const targetElement = this.currentVisualState[diagramId][element.id];
                if (!targetElement)
                    continue;
                switch (operation.transformationType) {
                    case 'move':
                        if (element.properties.x !== undefined)
                            targetElement.properties.x = element.properties.x;
                        if (element.properties.y !== undefined)
                            targetElement.properties.y = element.properties.y;
                        break;
                    case 'resize':
                        if (element.properties.width !== undefined)
                            targetElement.properties.width = element.properties.width;
                        if (element.properties.height !== undefined)
                            targetElement.properties.height = element.properties.height;
                        break;
                    case 'recolor':
                        if (element.properties.color !== undefined)
                            targetElement.properties.color = element.properties.color;
                        break;
                    case 'rotate':
                        if (element.properties.rotation !== undefined)
                            targetElement.properties.rotation = element.properties.rotation;
                        break;
                    case 'regroup':
                        if (element.contains !== undefined && targetElement.type === 'container') {
                            targetElement.contains = element.contains;
                        }
                        break;
                }
            }
        }
    }
    renderAsciiDiagram(diagramId, diagramType) {
        const elements = Object.values(this.currentVisualState[diagramId] || {});
        if (elements.length === 0) {
            return "Empty diagram";
        }
        let output = `\n${chalk.bold(diagramType.toUpperCase())} DIAGRAM ${chalk.cyan(diagramId)}\n\n`;
        // Simple ASCII art rendering based on diagram type
        switch (diagramType) {
            case 'graph': {
                // First render nodes
                const nodes = elements.filter(e => e.type === 'node');
                output += `${chalk.blue('NODES:')}\n`;
                for (const node of nodes) {
                    const label = node.label || node.id;
                    output += `  [${node.id}] ${label}\n`;
                }
                output += '\n';
                // Then render edges
                const edges = elements.filter(e => e.type === 'edge');
                if (edges.length > 0) {
                    output += `${chalk.green('EDGES:')}\n`;
                    for (const edge of edges) {
                        const label = edge.label ? ` (${edge.label})` : '';
                        output += `  ${edge.source} ----${label}----> ${edge.target}\n`;
                    }
                    output += '\n';
                }
                break;
            }
            case 'flowchart': {
                const nodes = elements.filter(e => e.type === 'node');
                const edges = elements.filter(e => e.type === 'edge');
                // Simple flowchart rendering
                output += `${chalk.blue('FLOWCHART:')}\n\n`;
                // Create node map for quick lookup when rendering edges
                const nodeMap = new Map();
                for (const node of nodes) {
                    nodeMap.set(node.id, node);
                }
                // Build a directed graph representation
                const graph = new Map();
                for (const edge of edges) {
                    if (!edge.source || !edge.target)
                        continue;
                    if (!graph.has(edge.source)) {
                        graph.set(edge.source, []);
                    }
                    // Conditionally add label to the pushed object
                    const edgeTargetObject = { target: edge.target };
                    if (edge.label && typeof edge.label === 'string') {
                        edgeTargetObject.label = edge.label;
                    }
                    graph.get(edge.source)?.push(edgeTargetObject);
                }
                // Render flowchart using graph
                const visited = new Set();
                const renderNode = (nodeId, indent = 0) => {
                    if (visited.has(nodeId))
                        return;
                    visited.add(nodeId);
                    const node = nodeMap.get(nodeId);
                    if (!node)
                        return;
                    const label = node.label || node.id;
                    const indentation = ' '.repeat(indent * 2);
                    output += `${indentation}[${node.id}] ${label}\n`;
                    if (graph.has(nodeId)) {
                        const connections = graph.get(nodeId) || [];
                        for (const conn of connections) {
                            const edgeLabel = conn.label ? ` (${conn.label})` : '';
                            output += `${indentation}  |\n`;
                            output += `${indentation}  ▼${edgeLabel}\n`;
                            renderNode(conn.target, indent + 1);
                        }
                    }
                };
                // Start rendering from nodes with no incoming edges
                const hasIncomingEdge = new Set();
                for (const edge of edges) {
                    if (edge.target)
                        hasIncomingEdge.add(edge.target);
                }
                const startNodes = nodes.filter(node => !hasIncomingEdge.has(node.id));
                for (const node of startNodes) {
                    renderNode(node.id);
                    output += '\n';
                }
                break;
            }
            case 'conceptMap': {
                // Render a concept map with central concepts and related ideas
                const nodes = elements.filter(e => e.type === 'node');
                const edges = elements.filter(e => e.type === 'edge');
                output += `${chalk.blue('CONCEPT MAP:')}\n\n`;
                // Group by relationship
                const relationships = new Map();
                for (const edge of edges) {
                    if (!edge.source || !edge.target)
                        continue;
                    const relationType = edge.label || 'related to';
                    if (!relationships.has(relationType)) {
                        relationships.set(relationType, []);
                    }
                    relationships.get(relationType)?.push({
                        source: edge.source,
                        target: edge.target,
                        label: edge.properties.description
                    });
                }
                // Render concept map by relationship type
                for (const [relationType, relations] of relationships.entries()) {
                    output += `${chalk.yellow(relationType.toUpperCase())}:\n`;
                    for (const relation of relations) {
                        const sourceNode = nodes.find(n => n.id === relation.source);
                        const targetNode = nodes.find(n => n.id === relation.target);
                        if (!sourceNode || !targetNode)
                            continue;
                        const sourceLabel = sourceNode.label || sourceNode.id;
                        const targetLabel = targetNode.label || targetNode.id;
                        const description = relation.label ? ` (${relation.label})` : '';
                        output += `  ${sourceLabel} ---> ${targetLabel}${description}\n`;
                    }
                    output += '\n';
                }
                break;
            }
            default:
                // Generic element listing for other diagram types
                const nodesByType = new Map();
                for (const element of elements) {
                    if (!nodesByType.has(element.type)) {
                        nodesByType.set(element.type, []);
                    }
                    nodesByType.get(element.type)?.push(element);
                }
                for (const [type, elementsOfType] of nodesByType.entries()) {
                    output += `${chalk.yellow(type.toUpperCase())}:\n`;
                    for (const element of elementsOfType) {
                        const label = element.label || element.id;
                        const properties = Object.entries(element.properties)
                            .map(([key, value]) => `${key}=${value}`)
                            .join(', ');
                        output += `  [${element.id}] ${label} (${properties})\n`;
                    }
                    output += '\n';
                }
        }
        return output;
    }
    processVisualOperation(input) {
        try {
            const validatedInput = this.validateOperationData(input);
            // Update visual state based on operation
            this.updateVisualState(validatedInput);
            // Render the current visual state
            const asciiDiagram = this.renderAsciiDiagram(validatedInput.diagramId, validatedInput.diagramType);
            console.error(asciiDiagram);
            // Log observations or insights if provided
            if (validatedInput.observation) {
                console.error(chalk.cyan('\nOBSERVATION:'));
                console.error(`  ${validatedInput.observation}`);
            }
            if (validatedInput.insight) {
                console.error(chalk.magenta('\nINSIGHT:'));
                console.error(`  ${validatedInput.insight}`);
            }
            if (validatedInput.hypothesis) {
                console.error(chalk.yellow('\nHYPOTHESIS:'));
                console.error(`  ${validatedInput.hypothesis}`);
            }
            // Return the operation result
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            diagramId: validatedInput.diagramId,
                            diagramType: validatedInput.diagramType,
                            iteration: validatedInput.iteration,
                            operation: validatedInput.operation,
                            elementCount: Object.keys(this.currentVisualState[validatedInput.diagramId] || {}).length,
                            historyLength: (this.visualStateHistory[validatedInput.diagramId] || []).length,
                            nextOperationNeeded: validatedInput.nextOperationNeeded
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
const VISUAL_REASONING_TOOL = {
    name: "visualReasoning",
    description: `A detailed tool for diagrammatic thinking and spatial representation.
This tool helps models create and manipulate visual representations of problems.
It can be used to develop system diagrams, flowcharts, concept maps, and other visual models.

When to use this tool:
- System architecture design
- Algorithm visualization
- Concept mapping and knowledge organization
- Pattern recognition in complex data
- Spatial problem solving

Key features:
- Create and manipulate abstract visual elements
- Support for multiple visual representation types
- Track iterations of visual thinking
- Translate between verbal descriptions and visual representations
- Generate visual insights from patterns

Parameters explained:
- operation: The type of action to perform (create, update, delete, transform, observe)
- elements: The visual elements to operate on
- diagramId: Identifier for the diagram being created or modified
- diagramType: The type of diagram (graph, flowchart, state diagram, etc.)
- iteration: The current iteration of the visual reasoning process
- observation/insight/hypothesis: Verbal reasoning about the visual representation
- nextOperationNeeded: Whether another operation is needed in the visual reasoning process`,
    inputSchema: {
        type: "object",
        properties: {
            operation: {
                type: "string",
                enum: ["create", "update", "delete", "transform", "observe"],
                description: "The type of operation to perform"
            },
            elements: {
                type: "array",
                description: "The visual elements to operate on",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for the element"
                        },
                        type: {
                            type: "string",
                            enum: ["node", "edge", "container", "annotation"],
                            description: "The type of visual element"
                        },
                        label: {
                            type: "string",
                            description: "Text label for the element"
                        },
                        properties: {
                            type: "object",
                            description: "Visual properties like position, size, color"
                        },
                        source: {
                            type: "string",
                            description: "For edges: ID of the source element"
                        },
                        target: {
                            type: "string",
                            description: "For edges: ID of the target element"
                        },
                        contains: {
                            type: "array",
                            description: "For containers: IDs of contained elements",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: ["type"]
                }
            },
            transformationType: {
                type: "string",
                enum: ["rotate", "move", "resize", "recolor", "regroup"],
                description: "For transform operations: the type of transformation"
            },
            diagramId: {
                type: "string",
                description: "Identifier for the diagram"
            },
            diagramType: {
                type: "string",
                enum: ["graph", "flowchart", "stateDiagram", "conceptMap", "treeDiagram", "custom"],
                description: "The type of diagram being created or modified"
            },
            iteration: {
                type: "number",
                description: "Current iteration of the visual reasoning process",
                minimum: 0
            },
            observation: {
                type: "string",
                description: "Observations about the current visual state"
            },
            insight: {
                type: "string",
                description: "Insights derived from the visual representation"
            },
            hypothesis: {
                type: "string",
                description: "Hypotheses based on the visual pattern"
            },
            nextOperationNeeded: {
                type: "boolean",
                description: "Whether another operation is needed"
            }
        },
        required: ["operation", "diagramId", "diagramType", "iteration", "nextOperationNeeded"]
    }
};
const server = new Server({
    name: "visual-reasoning-server",
    version: "0.1.2",
}, {
    capabilities: {
        tools: {},
    },
});
const visualReasoningServer = new VisualReasoningServer();
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [VISUAL_REASONING_TOOL],
}));
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "visualReasoning") {
        return visualReasoningServer.processVisualOperation(request.params.arguments);
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
    console.error("Visual Reasoning MCP Server running on stdio");
}
runServer().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map