#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import chalk from 'chalk';
class FocusGroupServer {
    constructor() {
        this.personaRegistry = {};
        this.feedbackHistory = {};
        this.focusAreaTracker = {};
        this.sessionHistory = {};
    }
    validateFocusGroupData(input) {
        const data = input;
        // Validate required fields
        if (!data.targetServer || typeof data.targetServer !== 'string') {
            throw new Error('Invalid targetServer: must be a string');
        }
        if (!Array.isArray(data.personas)) {
            throw new Error('Invalid personas: must be an array');
        }
        if (!Array.isArray(data.feedback)) {
            throw new Error('Invalid feedback: must be an array');
        }
        if (!data.stage || typeof data.stage !== 'string') {
            throw new Error('Invalid stage: must be a string');
        }
        if (!data.activePersonaId || typeof data.activePersonaId !== 'string') {
            throw new Error('Invalid activePersonaId: must be a string');
        }
        if (!data.sessionId || typeof data.sessionId !== 'string') {
            throw new Error('Invalid sessionId: must be a string');
        }
        if (typeof data.iteration !== 'number' || data.iteration < 0) {
            throw new Error('Invalid iteration: must be a non-negative number');
        }
        if (typeof data.nextFeedbackNeeded !== 'boolean') {
            throw new Error('Invalid nextFeedbackNeeded: must be a boolean');
        }
        // TODO: Add detailed validation for personas, feedback, and focusAreaAnalyses
        // similar to the collaborative-reasoning server
        // For now, return the data with minimal validation
        return data;
    }
    updateRegistries(data) {
        const sessionId = data.sessionId;
        // Update persona registry
        if (!this.personaRegistry[sessionId]) {
            this.personaRegistry[sessionId] = {};
        }
        for (const persona of data.personas) {
            this.personaRegistry[sessionId][persona.id] = persona;
        }
        // Update feedback history
        if (!this.feedbackHistory[sessionId]) {
            this.feedbackHistory[sessionId] = [];
        }
        for (const feedback of data.feedback) {
            // Only add new feedback
            const exists = this.feedbackHistory[sessionId].some(f => f.personaId === feedback.personaId && f.content === feedback.content);
            if (!exists) {
                this.feedbackHistory[sessionId].push(feedback);
            }
        }
        // Update focus area tracker
        if (data.focusAreaAnalyses && data.focusAreaAnalyses.length > 0) {
            if (!this.focusAreaTracker[sessionId]) {
                this.focusAreaTracker[sessionId] = [];
            }
            for (const analysis of data.focusAreaAnalyses) {
                // Check if this focus area already exists
                const existingIndex = this.focusAreaTracker[sessionId].findIndex(a => a.area === analysis.area);
                if (existingIndex >= 0) {
                    // Update existing analysis
                    this.focusAreaTracker[sessionId][existingIndex] = analysis;
                }
                else {
                    // Add new analysis
                    this.focusAreaTracker[sessionId].push(analysis);
                }
            }
        }
    }
    updateSessionHistory(data) {
        let historyEntry = this.sessionHistory[data.sessionId];
        if (!historyEntry) {
            historyEntry = [];
            this.sessionHistory[data.sessionId] = historyEntry;
        }
        historyEntry.push(data);
        this.updateRegistries(data);
    }
    selectNextPersona(data) {
        // If nextPersonaId is already set, use it
        if (data.nextPersonaId) {
            return data.nextPersonaId;
        }
        // Otherwise, select the next persona in rotation
        if (!data.personas || data.personas.length === 0) {
            throw new Error("Cannot determine next persona: No personas defined in session.");
        }
        const personaIds = data.personas.map(p => p.id);
        const currentIndex = personaIds.indexOf(data.activePersonaId);
        // If active persona not found (shouldn't happen ideally), default to first
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % personaIds.length;
        return personaIds[nextIndex];
    }
    getPersonaColor(index) {
        const colors = [
            chalk.blue,
            chalk.green,
            chalk.yellow,
            chalk.magenta,
            chalk.cyan,
            chalk.red
        ];
        return colors[index % colors.length];
    }
    getFeedbackTypeColor(type) {
        switch (type) {
            case 'praise': return chalk.green;
            case 'confusion': return chalk.yellow;
            case 'suggestion': return chalk.blue;
            case 'usability': return chalk.magenta;
            case 'feature': return chalk.cyan;
            case 'bug': return chalk.red;
            case 'summary': return chalk.white;
            default: return chalk.white;
        }
    }
    getSeverityBar(severity) {
        const barLength = 20;
        const filledLength = Math.round(severity * barLength);
        const emptyLength = barLength - filledLength;
        let bar = '[';
        // Choose color based on severity level
        let color;
        if (severity >= 0.8) {
            color = chalk.red;
        }
        else if (severity >= 0.5) {
            color = chalk.yellow;
        }
        else {
            color = chalk.green;
        }
        bar += color('='.repeat(filledLength));
        bar += ' '.repeat(emptyLength);
        bar += `] ${(severity * 100).toFixed(0)}%`;
        return bar;
    }
    visualizeFocusGroup(data) {
        let output = `\n${chalk.bold(`FOCUS GROUP: ${data.targetServer}`)} (ID: ${data.sessionId})\n\n`;
        // Stage and iteration
        output += `${chalk.cyan('Stage:')} ${data.stage}\n`;
        output += `${chalk.cyan('Iteration:')} ${data.iteration}\n\n`;
        // Personas
        output += `${chalk.bold('PERSONAS:')}\n`;
        for (let i = 0; i < data.personas.length; i++) {
            const persona = data.personas[i];
            const color = this.getPersonaColor(i);
            output += `${color(`${persona.name} (${persona.id})`)}\n`;
            output += `  User Type: ${persona.userType}\n`;
            output += `  Scenario: ${persona.usageScenario}\n`;
            output += `  Priorities: ${persona.priorities.join(', ')}\n`;
            // Highlight active persona
            if (persona.id === data.activePersonaId) {
                output += `  ${chalk.bgGreen(chalk.black(' ACTIVE '))}\n`;
            }
            output += '\n';
        }
        // Feedback
        if (data.feedback.length > 0) {
            output += `${chalk.bold('FEEDBACK:')}\n\n`;
            for (const feedback of data.feedback) {
                // Find persona
                const persona = data.personas.find(p => p.id === feedback.personaId);
                if (!persona)
                    continue;
                // Get persona color
                const personaIndex = data.personas.findIndex(p => p.id === feedback.personaId);
                const personaColor = this.getPersonaColor(personaIndex);
                // Get feedback type color
                const typeColor = this.getFeedbackTypeColor(feedback.type);
                output += `${personaColor(`[${persona.name}]`)} ${typeColor(`[${feedback.type}]`)}${feedback.targetComponent ? ` on ${feedback.targetComponent}` : ''}\n`;
                output += `${feedback.content}\n`;
                output += `Severity: ${this.getSeverityBar(feedback.severity)}\n`;
                if (feedback.referenceIds && feedback.referenceIds.length > 0) {
                    output += `References: ${feedback.referenceIds.join(', ')}\n`;
                }
                output += '\n';
            }
        }
        // Focus Area Analyses
        if (data.focusAreaAnalyses && data.focusAreaAnalyses.length > 0) {
            output += `${chalk.bold('FOCUS AREA ANALYSES:')}\n\n`;
            for (const analysis of data.focusAreaAnalyses) {
                output += `${chalk.cyan('Area:')} ${analysis.area}\n\n`;
                for (const finding of analysis.findings) {
                    // Find persona
                    const persona = data.personas.find(p => p.id === finding.personaId);
                    if (!persona)
                        continue;
                    // Get persona color
                    const personaIndex = data.personas.findIndex(p => p.id === finding.personaId);
                    const personaColor = this.getPersonaColor(personaIndex);
                    output += `${personaColor(`[${persona.name}]`)} Finding: ${finding.finding}\n`;
                    output += `  Impact: ${finding.impact}\n`;
                    if (finding.suggestion) {
                        output += `  Suggestion: ${finding.suggestion}\n`;
                    }
                    output += '\n';
                }
                if (analysis.resolution) {
                    output += `${chalk.green('Resolution:')} ${analysis.resolution.type}\n`;
                    output += `${analysis.resolution.description}\n\n`;
                }
                else {
                    output += `${chalk.yellow('Status:')} Unresolved\n\n`;
                }
            }
        }
        // Analysis output
        if (data.keyStrengths && data.keyStrengths.length > 0) {
            output += `${chalk.bold('KEY STRENGTHS:')}\n`;
            for (const strength of data.keyStrengths) {
                output += `  - ${strength}\n`;
            }
            output += '\n';
        }
        if (data.keyWeaknesses && data.keyWeaknesses.length > 0) {
            output += `${chalk.bold('KEY WEAKNESSES:')}\n`;
            for (const weakness of data.keyWeaknesses) {
                output += `  - ${weakness}\n`;
            }
            output += '\n';
        }
        if (data.topRecommendations && data.topRecommendations.length > 0) {
            output += `${chalk.bold('TOP RECOMMENDATIONS:')}\n`;
            for (const recommendation of data.topRecommendations) {
                output += `  - ${recommendation}\n`;
            }
            output += '\n';
        }
        if (data.unanimousPoints && data.unanimousPoints.length > 0) {
            output += `${chalk.bold('UNANIMOUS POINTS:')}\n`;
            for (const point of data.unanimousPoints) {
                output += `  - ${point}\n`;
            }
            output += '\n';
        }
        // Next steps
        if (data.nextFeedbackNeeded) {
            const nextPersonaId = this.selectNextPersona(data);
            const nextPersona = data.personas.find(p => p.id === nextPersonaId);
            if (nextPersona) {
                output += `${chalk.blue('NEXT FEEDBACK:')}\n`;
                output += `  Next persona: ${nextPersona.name}\n`;
                if (data.suggestedFeedbackTypes && data.suggestedFeedbackTypes.length > 0) {
                    output += `  Suggested feedback types: ${data.suggestedFeedbackTypes.join(', ')}\n`;
                }
                if (data.suggestedFocusArea) {
                    output += `  Suggested focus area: ${data.suggestedFocusArea}\n`;
                }
            }
        }
        return output;
    }
    processFocusGroup(input) {
        try {
            const validatedInput = this.validateFocusGroupData(input);
            // Update the next persona if not specified
            if (!validatedInput.nextPersonaId && validatedInput.nextFeedbackNeeded) {
                validatedInput.nextPersonaId = this.selectNextPersona(validatedInput);
            }
            // Update session state
            this.updateSessionHistory(validatedInput);
            // Generate visualization
            const visualization = this.visualizeFocusGroup(validatedInput);
            console.error(visualization);
            // Return the focus group result
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            sessionId: validatedInput.sessionId,
                            targetServer: validatedInput.targetServer,
                            stage: validatedInput.stage,
                            iteration: validatedInput.iteration,
                            personaCount: validatedInput.personas.length,
                            feedbackCount: validatedInput.feedback.length,
                            focusAreaCount: validatedInput.focusAreaAnalyses?.length || 0,
                            activePersonaId: validatedInput.activePersonaId,
                            nextPersonaId: validatedInput.nextPersonaId,
                            nextFeedbackNeeded: validatedInput.nextFeedbackNeeded,
                            suggestedFeedbackTypes: validatedInput.suggestedFeedbackTypes,
                            suggestedFocusArea: validatedInput.suggestedFocusArea
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
const FOCUS_GROUP_TOOL = {
    name: "focusGroup",
    description: `A specialized tool for conducting LLM-based focus groups to evaluate MCP servers.
This tool helps models analyze MCP servers from multiple user perspectives.
It provides a framework for structured evaluation, feedback collection, and recommendation generation.

When to use this tool:
- When evaluating a new or updated MCP server
- To identify usability issues from different LLM user perspectives
- To gather diverse feedback on API design and functionality
- To prioritize improvements based on user needs
- When seeking to understand how different types of users might interact with your MCP server

Key features:
- Multi-persona simulation of different LLM users
- Structured feedback collection process
- Focus area analysis for targeted improvements
- Synthesis of findings across user types
- Actionable recommendation generation`,
    inputSchema: {
        type: "object",
        properties: {
            targetServer: {
                type: "string",
                description: "The name of the MCP server being evaluated"
            },
            personas: {
                type: "array",
                description: "The user personas participating in the focus group",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for the persona"
                        },
                        name: {
                            type: "string",
                            description: "Name of the persona"
                        },
                        userType: {
                            type: "string",
                            description: "Type of LLM user (e.g., novice, expert, enterprise, developer)"
                        },
                        usageScenario: {
                            type: "string",
                            description: "Typical use case scenario for this user type"
                        },
                        expectations: {
                            type: "array",
                            description: "What this user expects from an MCP server",
                            items: {
                                type: "string"
                            }
                        },
                        priorities: {
                            type: "array",
                            description: "What aspects of the server are most important to this user",
                            items: {
                                type: "string"
                            }
                        },
                        constraints: {
                            type: "array",
                            description: "Limitations or constraints this user operates under",
                            items: {
                                type: "string"
                            }
                        },
                        communication: {
                            type: "object",
                            description: "Communication style of the persona",
                            properties: {
                                style: {
                                    type: "string",
                                    description: "Communication style (e.g., direct, analytical, narrative)"
                                },
                                tone: {
                                    type: "string",
                                    description: "Tone of communication (e.g., formal, casual, enthusiastic)"
                                }
                            },
                            required: ["style", "tone"]
                        }
                    },
                    required: ["id", "name", "userType", "usageScenario", "expectations", "priorities", "constraints", "communication"]
                }
            },
            feedback: {
                type: "array",
                description: "Feedback from the personas",
                items: {
                    type: "object",
                    properties: {
                        personaId: {
                            type: "string",
                            description: "ID of the providing persona"
                        },
                        content: {
                            type: "string",
                            description: "Content of the feedback"
                        },
                        type: {
                            type: "string",
                            enum: ["praise", "confusion", "suggestion", "usability", "feature", "bug", "summary"],
                            description: "Type of feedback"
                        },
                        targetComponent: {
                            type: "string",
                            description: "The component or aspect of the server this feedback relates to"
                        },
                        severity: {
                            type: "number",
                            minimum: 0,
                            maximum: 1,
                            description: "Severity or importance of this feedback (0.0-1.0)"
                        },
                        referenceIds: {
                            type: "array",
                            description: "IDs of previous feedback this builds upon",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: ["personaId", "content", "type", "severity"]
                }
            },
            focusAreaAnalyses: {
                type: "array",
                description: "Analysis of specific focus areas",
                items: {
                    type: "object",
                    properties: {
                        area: {
                            type: "string",
                            description: "Focus area being analyzed"
                        },
                        findings: {
                            type: "array",
                            description: "Findings about this focus area",
                            items: {
                                type: "object",
                                properties: {
                                    personaId: {
                                        type: "string",
                                        description: "ID of the persona making this finding"
                                    },
                                    finding: {
                                        type: "string",
                                        description: "Description of the finding"
                                    },
                                    impact: {
                                        type: "string",
                                        description: "Impact of this finding on users"
                                    },
                                    suggestion: {
                                        type: "string",
                                        description: "Suggested improvement"
                                    }
                                },
                                required: ["personaId", "finding", "impact"]
                            }
                        },
                        resolution: {
                            type: "object",
                            description: "Resolution of the findings, if any",
                            properties: {
                                type: {
                                    type: "string",
                                    enum: ["implemented", "considered", "rejected", "deferred"],
                                    description: "Type of resolution"
                                },
                                description: {
                                    type: "string",
                                    description: "Description of the resolution"
                                }
                            },
                            required: ["type", "description"]
                        }
                    },
                    required: ["area", "findings"]
                }
            },
            stage: {
                type: "string",
                enum: ["introduction", "initial-impressions", "deep-dive", "synthesis", "recommendations", "prioritization"],
                description: "Current stage of the focus group process"
            },
            activePersonaId: {
                type: "string",
                description: "ID of the currently active persona"
            },
            nextPersonaId: {
                type: "string",
                description: "ID of the persona that should provide feedback next"
            },
            keyStrengths: {
                type: "array",
                description: "Key strengths identified in the server",
                items: {
                    type: "string"
                }
            },
            keyWeaknesses: {
                type: "array",
                description: "Key weaknesses or pain points identified",
                items: {
                    type: "string"
                }
            },
            topRecommendations: {
                type: "array",
                description: "Top recommendations for improvement",
                items: {
                    type: "string"
                }
            },
            unanimousPoints: {
                type: "array",
                description: "Points on which all personas agree",
                items: {
                    type: "string"
                }
            },
            sessionId: {
                type: "string",
                description: "Unique identifier for this focus group session"
            },
            iteration: {
                type: "number",
                minimum: 0,
                description: "Current iteration of the focus group"
            },
            nextFeedbackNeeded: {
                type: "boolean",
                description: "Whether another round of feedback is needed"
            },
            suggestedFeedbackTypes: {
                type: "array",
                description: "Suggested types for the next feedback",
                items: {
                    type: "string",
                    enum: ["praise", "confusion", "suggestion", "usability", "feature", "bug", "summary"]
                }
            },
            suggestedFocusArea: {
                type: "string",
                description: "Suggested focus area for the next round of feedback"
            }
        },
        required: ["targetServer", "personas", "feedback", "stage", "activePersonaId", "sessionId", "iteration", "nextFeedbackNeeded"]
    }
};
const server = new Server({
    name: "focus-group-server",
    version: "0.1.0",
}, {
    capabilities: {
        tools: {},
    },
});
const focusGroupServer = new FocusGroupServer();
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [FOCUS_GROUP_TOOL],
}));
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "focusGroup") {
        return focusGroupServer.processFocusGroup(request.params.arguments);
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
    console.error("Focus Group MCP Server running on stdio");
}
runServer().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map