#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import chalk from 'chalk';
class MetacognitiveMonitoringServer {
    monitoringHistory = {};
    knowledgeInventory = {};
    claimRegistry = {};
    validateMetacognitiveMonitoringData(input) {
        const data = input;
        // Validate required fields
        if (!data.task || typeof data.task !== 'string') {
            throw new Error('Invalid task: must be a string');
        }
        if (!data.stage || typeof data.stage !== 'string') {
            throw new Error('Invalid stage: must be a string');
        }
        if (typeof data.overallConfidence !== 'number' || data.overallConfidence < 0 || data.overallConfidence > 1) {
            throw new Error('Invalid overallConfidence: must be a number between 0 and 1');
        }
        if (!data.recommendedApproach || typeof data.recommendedApproach !== 'string') {
            throw new Error('Invalid recommendedApproach: must be a string');
        }
        if (!data.monitoringId || typeof data.monitoringId !== 'string') {
            throw new Error('Invalid monitoringId: must be a string');
        }
        if (typeof data.iteration !== 'number' || data.iteration < 0) {
            throw new Error('Invalid iteration: must be a non-negative number');
        }
        if (typeof data.nextAssessmentNeeded !== 'boolean') {
            throw new Error('Invalid nextAssessmentNeeded: must be a boolean');
        }
        if (!Array.isArray(data.uncertaintyAreas)) {
            throw new Error('Invalid uncertaintyAreas: must be an array');
        }
        // Validate knowledge assessment
        let knowledgeAssessment = undefined;
        if (data.knowledgeAssessment && typeof data.knowledgeAssessment === 'object') {
            const ka = data.knowledgeAssessment;
            if (!ka.domain || typeof ka.domain !== 'string') {
                throw new Error('Invalid knowledgeAssessment.domain: must be a string');
            }
            if (!ka.knowledgeLevel || typeof ka.knowledgeLevel !== 'string') {
                throw new Error('Invalid knowledgeAssessment.knowledgeLevel: must be a string');
            }
            if (typeof ka.confidenceScore !== 'number' || ka.confidenceScore < 0 || ka.confidenceScore > 1) {
                throw new Error('Invalid knowledgeAssessment.confidenceScore: must be a number between 0 and 1');
            }
            if (!ka.supportingEvidence || typeof ka.supportingEvidence !== 'string') {
                throw new Error('Invalid knowledgeAssessment.supportingEvidence: must be a string');
            }
            if (!Array.isArray(ka.knownLimitations)) {
                throw new Error('Invalid knowledgeAssessment.knownLimitations: must be an array');
            }
            const knownLimitations = [];
            for (const limitation of ka.knownLimitations) {
                if (typeof limitation === 'string') {
                    knownLimitations.push(limitation);
                }
            }
            // Base object with required properties
            const baseAssessment = {
                domain: ka.domain,
                knowledgeLevel: ka.knowledgeLevel,
                confidenceScore: ka.confidenceScore,
                supportingEvidence: ka.supportingEvidence,
                knownLimitations,
            };
            // NOTE: exactOptionalPropertyTypes is enabled in tsconfig.json.
            // This means we cannot explicitly assign 'undefined' to optional properties.
            // Instead, we create a base object with required properties and only add
            // optional properties if they have a valid value.
            // Conditionally add optional property
            if (typeof ka.relevantTrainingCutoff === 'string') {
                baseAssessment.relevantTrainingCutoff = ka.relevantTrainingCutoff;
            }
            knowledgeAssessment = baseAssessment;
        }
        // Validate claims
        const claims = [];
        if (Array.isArray(data.claims)) {
            for (const claim of data.claims) {
                if (!claim.claim || typeof claim.claim !== 'string') {
                    throw new Error('Invalid claim.claim: must be a string');
                }
                if (!claim.status || typeof claim.status !== 'string') {
                    throw new Error('Invalid claim.status: must be a string');
                }
                if (typeof claim.confidenceScore !== 'number' || claim.confidenceScore < 0 || claim.confidenceScore > 1) {
                    throw new Error('Invalid claim.confidenceScore: must be a number between 0 and 1');
                }
                if (!claim.evidenceBasis || typeof claim.evidenceBasis !== 'string') {
                    throw new Error('Invalid claim.evidenceBasis: must be a string');
                }
                const alternativeInterpretations = [];
                if (Array.isArray(claim.alternativeInterpretations)) {
                    for (const interpretation of claim.alternativeInterpretations) {
                        if (typeof interpretation === 'string') {
                            alternativeInterpretations.push(interpretation);
                        }
                    }
                }
                // Base object with required properties
                const baseClaim = {
                    claim: claim.claim,
                    status: claim.status,
                    confidenceScore: claim.confidenceScore,
                    evidenceBasis: claim.evidenceBasis,
                };
                // NOTE: exactOptionalPropertyTypes is enabled in tsconfig.json.
                // This means we cannot explicitly assign 'undefined' to optional properties.
                // Instead, we create a base object with required properties and only add
                // optional properties if they have a valid value.
                // Conditionally add optional properties
                if (alternativeInterpretations.length > 0) {
                    baseClaim.alternativeInterpretations = alternativeInterpretations;
                }
                if (typeof claim.falsifiabilityCriteria === 'string') {
                    baseClaim.falsifiabilityCriteria = claim.falsifiabilityCriteria;
                }
                claims.push(baseClaim);
            }
        }
        // Validate reasoning steps
        const reasoningSteps = [];
        if (Array.isArray(data.reasoningSteps)) {
            for (const step of data.reasoningSteps) {
                if (!step.step || typeof step.step !== 'string') {
                    throw new Error('Invalid reasoningStep.step: must be a string');
                }
                if (!Array.isArray(step.potentialBiases)) {
                    throw new Error('Invalid reasoningStep.potentialBiases: must be an array');
                }
                if (!Array.isArray(step.assumptions)) {
                    throw new Error('Invalid reasoningStep.assumptions: must be an array');
                }
                if (typeof step.logicalValidity !== 'number' || step.logicalValidity < 0 || step.logicalValidity > 1) {
                    throw new Error('Invalid reasoningStep.logicalValidity: must be a number between 0 and 1');
                }
                if (typeof step.inferenceStrength !== 'number' || step.inferenceStrength < 0 || step.inferenceStrength > 1) {
                    throw new Error('Invalid reasoningStep.inferenceStrength: must be a number between 0 and 1');
                }
                const potentialBiases = [];
                for (const bias of step.potentialBiases) {
                    if (typeof bias === 'string') {
                        potentialBiases.push(bias);
                    }
                }
                const assumptions = [];
                for (const assumption of step.assumptions) {
                    if (typeof assumption === 'string') {
                        assumptions.push(assumption);
                    }
                }
                reasoningSteps.push({
                    step: step.step,
                    potentialBiases,
                    assumptions,
                    logicalValidity: step.logicalValidity,
                    inferenceStrength: step.inferenceStrength
                });
            }
        }
        // Process uncertainty areas
        const uncertaintyAreas = [];
        for (const area of data.uncertaintyAreas) {
            if (typeof area === 'string') {
                uncertaintyAreas.push(area);
            }
        }
        // Process suggested assessments
        const suggestedAssessments = [];
        if (Array.isArray(data.suggestedAssessments)) {
            for (const assessment of data.suggestedAssessments) {
                if (typeof assessment === 'string' && ['knowledge', 'claim', 'reasoning', 'overall'].includes(assessment)) {
                    suggestedAssessments.push(assessment);
                }
            }
        }
        // Create validated data object
        const validatedData = {
            task: data.task,
            stage: data.stage,
            overallConfidence: data.overallConfidence,
            uncertaintyAreas,
            recommendedApproach: data.recommendedApproach,
            monitoringId: data.monitoringId,
            iteration: data.iteration,
            nextAssessmentNeeded: data.nextAssessmentNeeded,
        };
        // NOTE: exactOptionalPropertyTypes is enabled in tsconfig.json.
        // This means we cannot explicitly assign 'undefined' to optional properties.
        // Instead, we create a base object with required properties and only add
        // optional properties if they have a valid value.
        // Conditionally add optional properties
        if (knowledgeAssessment) {
            validatedData.knowledgeAssessment = knowledgeAssessment;
        }
        if (claims.length > 0) {
            validatedData.claims = claims;
        }
        if (reasoningSteps.length > 0) {
            validatedData.reasoningSteps = reasoningSteps;
        }
        if (suggestedAssessments.length > 0) {
            validatedData.suggestedAssessments = suggestedAssessments;
        }
        return validatedData;
    }
    updateRegistries(data) {
        // Update knowledge inventory if knowledge assessment is provided
        if (data.knowledgeAssessment) {
            this.knowledgeInventory[data.knowledgeAssessment.domain] = data.knowledgeAssessment;
        }
        // Update claim registry if claims are provided
        if (data.claims) {
            for (const claim of data.claims) {
                this.claimRegistry[claim.claim] = claim;
            }
        }
    }
    updateMonitoringHistory(data) {
        // Initialize monitoring history if needed
        if (!this.monitoringHistory[data.monitoringId]) {
            this.monitoringHistory[data.monitoringId] = [];
        }
        // Add to monitoring history
        this.monitoringHistory[data.monitoringId].push(data);
        // Update registries
        this.updateRegistries(data);
    }
    getKnowledgeLevelColor(level) {
        switch (level) {
            case 'expert': return chalk.green;
            case 'proficient': return chalk.cyan;
            case 'familiar': return chalk.blue;
            case 'basic': return chalk.yellow;
            case 'minimal': return chalk.red;
            case 'none': return chalk.gray;
            default: return chalk.white;
        }
    }
    getClaimStatusColor(status) {
        switch (status) {
            case 'fact': return chalk.green;
            case 'inference': return chalk.blue;
            case 'speculation': return chalk.yellow;
            case 'uncertain': return chalk.red;
            default: return chalk.white;
        }
    }
    getConfidenceBar(confidence) {
        const barLength = 20;
        const filledLength = Math.round(confidence * barLength);
        const emptyLength = barLength - filledLength;
        let bar = '[';
        // Choose color based on confidence level
        let color;
        if (confidence >= 0.8) {
            color = chalk.green;
        }
        else if (confidence >= 0.5) {
            color = chalk.yellow;
        }
        else {
            color = chalk.red;
        }
        bar += color('='.repeat(filledLength));
        bar += ' '.repeat(emptyLength);
        bar += `] ${(confidence * 100).toFixed(0)}%`;
        return bar;
    }
    visualizeMetacognitiveState(data) {
        let output = `\n${chalk.bold(`METACOGNITIVE MONITORING: ${data.task}`)} (ID: ${data.monitoringId})\n\n`;
        // Stage and iteration
        output += `${chalk.cyan('Stage:')} ${data.stage}\n`;
        output += `${chalk.cyan('Iteration:')} ${data.iteration}\n`;
        output += `${chalk.cyan('Overall Confidence:')} ${this.getConfidenceBar(data.overallConfidence)}\n\n`;
        // Knowledge assessment
        if (data.knowledgeAssessment) {
            const ka = data.knowledgeAssessment;
            const levelColor = this.getKnowledgeLevelColor(ka.knowledgeLevel);
            output += `${chalk.bold('KNOWLEDGE ASSESSMENT:')}\n`;
            output += `${chalk.yellow('Domain:')} ${ka.domain}\n`;
            output += `${chalk.yellow('Knowledge Level:')} ${levelColor(ka.knowledgeLevel)}\n`;
            output += `${chalk.yellow('Confidence:')} ${this.getConfidenceBar(ka.confidenceScore)}\n`;
            output += `${chalk.yellow('Evidence:')} ${ka.supportingEvidence}\n`;
            if (ka.relevantTrainingCutoff) {
                output += `${chalk.yellow('Training Cutoff:')} ${ka.relevantTrainingCutoff}\n`;
            }
            output += `${chalk.yellow('Known Limitations:')}\n`;
            for (const limitation of ka.knownLimitations) {
                output += `  - ${limitation}\n`;
            }
            output += '\n';
        }
        // Claims assessment
        if (data.claims && data.claims.length > 0) {
            output += `${chalk.bold('CLAIM ASSESSMENTS:')}\n`;
            for (const claim of data.claims) {
                const statusColor = this.getClaimStatusColor(claim.status);
                output += `${chalk.bold(claim.claim)}\n`;
                output += `  Status: ${statusColor(claim.status)}\n`;
                output += `  Confidence: ${this.getConfidenceBar(claim.confidenceScore)}\n`;
                output += `  Evidence: ${claim.evidenceBasis}\n`;
                if (claim.alternativeInterpretations && claim.alternativeInterpretations.length > 0) {
                    output += `  Alternative Interpretations:\n`;
                    for (const interpretation of claim.alternativeInterpretations) {
                        output += `    - ${interpretation}\n`;
                    }
                }
                if (claim.falsifiabilityCriteria) {
                    output += `  Falsifiability: ${claim.falsifiabilityCriteria}\n`;
                }
                output += '\n';
            }
        }
        // Reasoning assessment
        if (data.reasoningSteps && data.reasoningSteps.length > 0) {
            output += `${chalk.bold('REASONING ASSESSMENT:')}\n`;
            for (let i = 0; i < data.reasoningSteps.length; i++) {
                const step = data.reasoningSteps[i];
                output += `${chalk.cyan(`Step ${i + 1}:`)} ${step.step}\n`;
                output += `  Logical Validity: ${this.getConfidenceBar(step.logicalValidity)}\n`;
                output += `  Inference Strength: ${this.getConfidenceBar(step.inferenceStrength)}\n`;
                if (step.potentialBiases.length > 0) {
                    output += `  Potential Biases:\n`;
                    for (const bias of step.potentialBiases) {
                        output += `    - ${bias}\n`;
                    }
                }
                if (step.assumptions.length > 0) {
                    output += `  Assumptions:\n`;
                    for (const assumption of step.assumptions) {
                        output += `    - ${assumption}\n`;
                    }
                }
                output += '\n';
            }
        }
        // Uncertainty areas
        if (data.uncertaintyAreas.length > 0) {
            output += `${chalk.bold('UNCERTAINTY AREAS:')}\n`;
            for (const area of data.uncertaintyAreas) {
                output += `  - ${area}\n`;
            }
            output += '\n';
        }
        // Recommended approach
        output += `${chalk.bold('RECOMMENDED APPROACH:')}\n`;
        output += `  ${data.recommendedApproach}\n\n`;
        // Next steps
        if (data.nextAssessmentNeeded) {
            output += `${chalk.blue('SUGGESTED NEXT ASSESSMENTS:')}\n`;
            const assessments = data.suggestedAssessments || [];
            if (assessments.length > 0) {
                for (const assessment of assessments) {
                    output += `  � ${assessment} assessment\n`;
                }
            }
            else {
                output += `  � Continue with current assessment\n`;
            }
        }
        return output;
    }
    processMetacognitiveMonitoring(input) {
        try {
            const validatedInput = this.validateMetacognitiveMonitoringData(input);
            // Update monitoring state
            this.updateMonitoringHistory(validatedInput);
            // Generate visualization
            const visualization = this.visualizeMetacognitiveState(validatedInput);
            console.error(visualization);
            // Return the monitoring result
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify({
                            monitoringId: validatedInput.monitoringId,
                            task: validatedInput.task,
                            stage: validatedInput.stage,
                            iteration: validatedInput.iteration,
                            overallConfidence: validatedInput.overallConfidence,
                            hasKnowledgeAssessment: !!validatedInput.knowledgeAssessment,
                            claimCount: validatedInput.claims?.length || 0,
                            reasoningStepCount: validatedInput.reasoningSteps?.length || 0,
                            uncertaintyAreas: validatedInput.uncertaintyAreas.length,
                            nextAssessmentNeeded: validatedInput.nextAssessmentNeeded,
                            suggestedAssessments: validatedInput.suggestedAssessments
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
const METACOGNITIVE_MONITORING_TOOL = {
    name: "metacognitiveMonitoring",
    description: `A detailed tool for systematic self-monitoring of knowledge and reasoning quality.
This tool helps models track knowledge boundaries, claim certainty, and reasoning biases.
It provides a framework for metacognitive assessment across various domains and reasoning tasks.

When to use this tool:
- Uncertain domains requiring calibrated confidence
- Complex reasoning chains with potential biases
- Technical domains with clear knowledge boundaries
- Scenarios requiring distinction between facts, inferences, and speculation
- Claims requiring clear evidential basis

Key features:
- Knowledge boundary tracking
- Claim classification and confidence calibration
- Reasoning quality monitoring
- Bias and assumption detection
- Uncertainty area identification`,
    inputSchema: {
        type: "object",
        properties: {
            task: {
                type: "string",
                description: "The task or question being addressed"
            },
            stage: {
                type: "string",
                enum: ["knowledge-assessment", "planning", "execution", "monitoring", "evaluation", "reflection"],
                description: "Current stage of metacognitive monitoring"
            },
            knowledgeAssessment: {
                type: "object",
                description: "Assessment of knowledge in the relevant domain",
                properties: {
                    domain: {
                        type: "string",
                        description: "The knowledge domain being assessed"
                    },
                    knowledgeLevel: {
                        type: "string",
                        enum: ["expert", "proficient", "familiar", "basic", "minimal", "none"],
                        description: "Self-assessed knowledge level"
                    },
                    confidenceScore: {
                        type: "number",
                        minimum: 0,
                        maximum: 1,
                        description: "Confidence in knowledge assessment (0.0-1.0)"
                    },
                    supportingEvidence: {
                        type: "string",
                        description: "Evidence supporting the knowledge level claim"
                    },
                    knownLimitations: {
                        type: "array",
                        description: "Known limitations of knowledge in this domain",
                        items: {
                            type: "string"
                        }
                    },
                    relevantTrainingCutoff: {
                        type: "string",
                        description: "Relevant training data cutoff date, if applicable"
                    }
                },
                required: ["domain", "knowledgeLevel", "confidenceScore", "supportingEvidence", "knownLimitations"]
            },
            claims: {
                type: "array",
                description: "Assessments of specific claims",
                items: {
                    type: "object",
                    properties: {
                        claim: {
                            type: "string",
                            description: "The claim being assessed"
                        },
                        status: {
                            type: "string",
                            enum: ["fact", "inference", "speculation", "uncertain"],
                            description: "Classification of the claim"
                        },
                        confidenceScore: {
                            type: "number",
                            minimum: 0,
                            maximum: 1,
                            description: "Confidence in the claim (0.0-1.0)"
                        },
                        evidenceBasis: {
                            type: "string",
                            description: "Evidence supporting the claim"
                        },
                        alternativeInterpretations: {
                            type: "array",
                            description: "Alternative interpretations of the evidence",
                            items: {
                                type: "string"
                            }
                        },
                        falsifiabilityCriteria: {
                            type: "string",
                            description: "Criteria that would prove the claim false"
                        }
                    },
                    required: ["claim", "status", "confidenceScore", "evidenceBasis"]
                }
            },
            reasoningSteps: {
                type: "array",
                description: "Assessments of reasoning steps",
                items: {
                    type: "object",
                    properties: {
                        step: {
                            type: "string",
                            description: "The reasoning step being assessed"
                        },
                        potentialBiases: {
                            type: "array",
                            description: "Potential cognitive biases in this step",
                            items: {
                                type: "string"
                            }
                        },
                        assumptions: {
                            type: "array",
                            description: "Assumptions made in this step",
                            items: {
                                type: "string"
                            }
                        },
                        logicalValidity: {
                            type: "number",
                            minimum: 0,
                            maximum: 1,
                            description: "Logical validity score (0.0-1.0)"
                        },
                        inferenceStrength: {
                            type: "number",
                            minimum: 0,
                            maximum: 1,
                            description: "Inference strength score (0.0-1.0)"
                        }
                    },
                    required: ["step", "potentialBiases", "assumptions", "logicalValidity", "inferenceStrength"]
                }
            },
            overallConfidence: {
                type: "number",
                minimum: 0,
                maximum: 1,
                description: "Overall confidence in conclusions (0.0-1.0)"
            },
            uncertaintyAreas: {
                type: "array",
                description: "Areas of significant uncertainty",
                items: {
                    type: "string"
                }
            },
            recommendedApproach: {
                type: "string",
                description: "Recommended approach based on metacognitive assessment"
            },
            monitoringId: {
                type: "string",
                description: "Unique identifier for this monitoring session"
            },
            iteration: {
                type: "number",
                minimum: 0,
                description: "Current iteration of the monitoring process"
            },
            nextAssessmentNeeded: {
                type: "boolean",
                description: "Whether further assessment is needed"
            },
            suggestedAssessments: {
                type: "array",
                description: "Suggested assessments to perform next",
                items: {
                    type: "string",
                    enum: ["knowledge", "claim", "reasoning", "overall"]
                }
            }
        },
        required: ["task", "stage", "overallConfidence", "uncertaintyAreas", "recommendedApproach", "monitoringId", "iteration", "nextAssessmentNeeded"]
    }
};
const server = new Server({
    name: "metacognitive-monitoring-server",
    version: "0.1.2",
}, {
    capabilities: {
        tools: {},
    },
});
const metacognitiveMonitoringServer = new MetacognitiveMonitoringServer();
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [METACOGNITIVE_MONITORING_TOOL],
}));
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "metacognitiveMonitoring") {
        return metacognitiveMonitoringServer.processMetacognitiveMonitoring(request.params.arguments);
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
    console.error("Metacognitive Monitoring MCP Server running on stdio");
}
runServer().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map