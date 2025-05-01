#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import chalk from 'chalk';

// Types
interface Variable {
  name: string;
  type: "independent" | "dependent" | "controlled" | "confounding";
  operationalization?: string;
}

interface HypothesisData {
  // Core hypothesis components
  statement: string;
  variables: Variable[];
  assumptions: string[];
  
  // Hypothesis metadata
  hypothesisId: string;
  confidence: number; // 0.0-1.0
  domain: string;
  iteration: number;
  
  // Relationships
  alternativeTo?: string[]; // IDs of competing hypotheses
  refinementOf?: string; // ID of parent hypothesis
  
  // Current status
  status: "proposed" | "testing" | "supported" | "refuted" | "refined";
}

interface Prediction {
  if: string;
  then: string;
  else?: string;
}

interface ExperimentData {
  // Core experiment components
  design: string;
  methodology: string;
  predictions: Prediction[];
  
  // Experiment metadata
  experimentId: string;
  hypothesisId: string;
  controlMeasures: string[];
  
  // Results (if conducted)
  results?: string;
  outcomeMatched?: boolean;
  unexpectedObservations?: string[];
  
  // Evaluation
  limitations?: string[];
  nextSteps?: string[];
}

interface ScientificInquiryData {
  // Process stage
  stage: "observation" | "question" | "hypothesis" | "experiment" | "analysis" | "conclusion" | "iteration";
  
  // Content for current stage
  observation?: string;
  question?: string;
  hypothesis?: HypothesisData;
  experiment?: ExperimentData;
  analysis?: string;
  conclusion?: string;
  
  // Process metadata
  inquiryId: string;
  iteration: number;
  
  // Next steps
  nextStageNeeded: boolean;
}

class ScientificMethodServer {
  private inquiryHistory: Record<string, ScientificInquiryData[]> = {};
  private hypothesisRegistry: Record<string, HypothesisData> = {};
  private experimentRegistry: Record<string, ExperimentData> = {};
  private nextInquiryId = 1;

  private validateScientificInquiryData(input: unknown): ScientificInquiryData {
    const data = input as Record<string, unknown>;
    
    // Validate required fields
    if (!data.stage || typeof data.stage !== 'string') {
      throw new Error('Invalid stage: must be a string');
    }
    
    if (!data.inquiryId || typeof data.inquiryId !== 'string') {
      throw new Error('Invalid inquiryId: must be a string');
    }
    
    if (typeof data.iteration !== 'number' || data.iteration < 0) {
      throw new Error('Invalid iteration: must be a non-negative number');
    }
    
    if (typeof data.nextStageNeeded !== 'boolean') {
      throw new Error('Invalid nextStageNeeded: must be a boolean');
    }
    
    // Validate stage-specific content
    switch (data.stage) {
      case 'observation':
        if (!data.observation || typeof data.observation !== 'string') {
          throw new Error('Stage is "observation" but no valid observation provided');
        }
        break;
        
      case 'question':
        if (!data.question || typeof data.question !== 'string') {
          throw new Error('Stage is "question" but no valid question provided');
        }
        break;
        
      case 'hypothesis':
        if (!data.hypothesis || typeof data.hypothesis !== 'object') {
          throw new Error('Stage is "hypothesis" but no valid hypothesis provided');
        }
        this.validateHypothesisData(data.hypothesis as Record<string, unknown>);
        break;
        
      case 'experiment':
        if (!data.experiment || typeof data.experiment !== 'object') {
          throw new Error('Stage is "experiment" but no valid experiment provided');
        }
        this.validateExperimentData(data.experiment as Record<string, unknown>);
        break;
        
      case 'analysis':
        if (!data.analysis || typeof data.analysis !== 'string') {
          throw new Error('Stage is "analysis" but no valid analysis provided');
        }
        break;
        
      case 'conclusion':
        if (!data.conclusion || typeof data.conclusion !== 'string') {
          throw new Error('Stage is "conclusion" but no valid conclusion provided');
        }
        break;
        
      case 'iteration':
        // No specific requirements for iteration stage
        break;
        
      default:
        throw new Error(`Invalid stage: ${data.stage}`);
    }
    
    // Create validated data object
    const validatedData: Omit<ScientificInquiryData, 'observation' | 'question' | 'hypothesis' | 'experiment' | 'analysis' | 'conclusion'> & Partial<Pick<ScientificInquiryData, 'observation' | 'question' | 'hypothesis' | 'experiment' | 'analysis' | 'conclusion'>> = {
      stage: data.stage as ScientificInquiryData['stage'],
      inquiryId: data.inquiryId as string,
      iteration: data.iteration as number,
      nextStageNeeded: typeof data.nextStageNeeded === 'boolean' ? data.nextStageNeeded : true, // Default to true if missing/invalid
    };

    // NOTE: exactOptionalPropertyTypes is enabled in tsconfig.json.
    // This means we cannot explicitly assign 'undefined' to optional properties.
    // Instead, we create a base object with required properties and only add
    // optional properties if they have a valid value.
    if (typeof data.observation === 'string') {
      validatedData.observation = data.observation;
    }
    if (typeof data.question === 'string') {
      validatedData.question = data.question;
    }
    // Assuming hypothesis/experiment are validated elsewhere or structure is checked before assignment
    if (data.hypothesis && typeof data.hypothesis === 'object') {
      validatedData.hypothesis = data.hypothesis as HypothesisData; // Consider deeper validation if needed
    }
    if (data.experiment && typeof data.experiment === 'object') {
      validatedData.experiment = data.experiment as ExperimentData; // Consider deeper validation if needed
    }
    if (typeof data.analysis === 'string') {
      validatedData.analysis = data.analysis;
    }
    if (typeof data.conclusion === 'string') {
      validatedData.conclusion = data.conclusion;
    }

    return validatedData as ScientificInquiryData;
  }

  private validateHypothesisData(data: Record<string, unknown>): HypothesisData {
    // Validate required fields
    if (!data.statement || typeof data.statement !== 'string') {
      throw new Error('Invalid hypothesis statement: must be a string');
    }
    
    if (!Array.isArray(data.variables)) {
      throw new Error('Invalid hypothesis variables: must be an array');
    }
    
    if (!Array.isArray(data.assumptions)) {
      throw new Error('Invalid hypothesis assumptions: must be an array');
    }
    
    if (!data.hypothesisId || typeof data.hypothesisId !== 'string') {
      throw new Error('Invalid hypothesisId: must be a string');
    }
    
    if (typeof data.confidence !== 'number' || data.confidence < 0 || data.confidence > 1) {
      throw new Error('Invalid hypothesis confidence: must be a number between 0 and 1');
    }
    
    if (!data.domain || typeof data.domain !== 'string') {
      throw new Error('Invalid hypothesis domain: must be a string');
    }
    
    if (typeof data.iteration !== 'number' || data.iteration < 0) {
      throw new Error('Invalid hypothesis iteration: must be a non-negative number');
    }
    
    if (!data.status || typeof data.status !== 'string') {
      throw new Error('Invalid hypothesis status: must be a string');
    }
    
    // Validate variables
    const variables: Variable[] = [];
    for (const variable of data.variables as Array<Record<string, unknown>>) {
      if (!variable.name || typeof variable.name !== 'string') {
        throw new Error('Invalid variable name: must be a string');
      }
      
      if (!variable.type || typeof variable.type !== 'string') {
        throw new Error('Invalid variable type: must be a string');
      }
      
      const baseVariable: Omit<Variable, 'operationalization'> & Partial<Pick<Variable, 'operationalization'>> = {
        name: variable.name as string,
        type: variable.type as Variable['type']
      };

      // NOTE: exactOptionalPropertyTypes is enabled (see explanation in validateScientificInquiryData).
      // Conditionally add optional property
      if (typeof variable.operationalization === 'string') {
        baseVariable.operationalization = variable.operationalization;
      }

      variables.push(baseVariable as Variable);
    }
    
    // Validate assumptions
    const assumptions: string[] = [];
    for (const assumption of data.assumptions as Array<unknown>) {
      if (typeof assumption === 'string') {
        assumptions.push(assumption);
      }
    }
    
    // Validate optional fields
    let alternativeTo: string[] | undefined = undefined;
    if (Array.isArray(data.alternativeTo)) {
      alternativeTo = [];
      for (const alt of data.alternativeTo) {
        if (typeof alt === 'string') {
          alternativeTo.push(alt);
        }
      }
      if (alternativeTo.length === 0) {
        alternativeTo = undefined;
      }
    }
    
    const validatedHypothesisData: Omit<HypothesisData, 'alternativeTo' | 'refinementOf'> & Partial<Pick<HypothesisData, 'alternativeTo' | 'refinementOf'>> = {
      statement: data.statement as string,
      variables,
      assumptions,
      hypothesisId: data.hypothesisId as string,
      confidence: data.confidence as number,
      domain: data.domain as string,
      iteration: data.iteration as number,
      status: data.status as HypothesisData['status'],
    };

    // NOTE: exactOptionalPropertyTypes is enabled (see explanation in validateScientificInquiryData).
    // Conditionally add optional properties
    if (alternativeTo) { // alternativeTo is already validated and set to undefined if invalid/empty
      validatedHypothesisData.alternativeTo = alternativeTo;
    }
    if (typeof data.refinementOf === 'string') {
      validatedHypothesisData.refinementOf = data.refinementOf;
    }

    return validatedHypothesisData as HypothesisData;
  }

  private validateExperimentData(data: Record<string, unknown>): ExperimentData {
    // Validate required fields
    if (!data.design || typeof data.design !== 'string') {
      throw new Error('Invalid experiment design: must be a string');
    }
    
    if (!data.methodology || typeof data.methodology !== 'string') {
      throw new Error('Invalid experiment methodology: must be a string');
    }
    
    if (!Array.isArray(data.predictions)) {
      throw new Error('Invalid experiment predictions: must be an array');
    }
    
    if (!data.experimentId || typeof data.experimentId !== 'string') {
      throw new Error('Invalid experimentId: must be a string');
    }
    
    if (!data.hypothesisId || typeof data.hypothesisId !== 'string') {
      throw new Error('Invalid experiment hypothesisId: must be a string');
    }
    
    if (!Array.isArray(data.controlMeasures)) {
      throw new Error('Invalid experiment controlMeasures: must be an array');
    }
    
    // Validate predictions
    const predictions: Prediction[] = [];
    for (const prediction of data.predictions as Array<Record<string, unknown>>) {
      if (!prediction.if || typeof prediction.if !== 'string') {
        throw new Error('Invalid prediction if: must be a string');
      }
      
      if (!prediction.then || typeof prediction.then !== 'string') {
        throw new Error('Invalid prediction then: must be a string');
      }
      
      const basePrediction: Omit<Prediction, 'else'> & Partial<Pick<Prediction, 'else'>> = {
        if: prediction.if as string,
        then: prediction.then as string,
      };

      // NOTE: exactOptionalPropertyTypes is enabled (see explanation in validateScientificInquiryData).
      // Conditionally add optional property
      if (typeof prediction.else === 'string') {
        basePrediction.else = prediction.else;
      }

      predictions.push(basePrediction as Prediction);
    }
    
    // Validate control measures
    const controlMeasures: string[] = [];
    for (const measure of data.controlMeasures as Array<unknown>) {
      if (typeof measure === 'string') {
        controlMeasures.push(measure);
      }
    }
    
    // Validate optional fields
    let limitations: string[] | undefined = undefined;
    if (Array.isArray(data.limitations)) {
      limitations = [];
      for (const limitation of data.limitations) {
        if (typeof limitation === 'string') {
          limitations.push(limitation);
        }
      }
      if (limitations.length === 0) {
        limitations = undefined;
      }
    }
    
    let nextSteps: string[] | undefined = undefined;
    if (Array.isArray(data.nextSteps)) {
      nextSteps = [];
      for (const step of data.nextSteps) {
        if (typeof step === 'string') {
          nextSteps.push(step);
        }
      }
      if (nextSteps.length === 0) {
        nextSteps = undefined;
      }
    }
    
    let unexpectedObservations: string[] | undefined = undefined;
    if (Array.isArray(data.unexpectedObservations)) {
      unexpectedObservations = [];
      for (const observation of data.unexpectedObservations) {
        if (typeof observation === 'string') {
          unexpectedObservations.push(observation);
        }
      }
      if (unexpectedObservations.length === 0) {
        unexpectedObservations = undefined;
      }
    }
    
    // Create validated experiment data
    const validatedExperimentData: Omit<ExperimentData, 'results' | 'outcomeMatched' | 'unexpectedObservations' | 'limitations' | 'nextSteps'> & Partial<Pick<ExperimentData, 'results' | 'outcomeMatched' | 'unexpectedObservations' | 'limitations' | 'nextSteps'>> = {
      design: data.design as string,
      methodology: data.methodology as string,
      predictions,
      experimentId: data.experimentId as string,
      hypothesisId: data.hypothesisId as string,
      controlMeasures,
    };

    // NOTE: exactOptionalPropertyTypes is enabled (see explanation in validateScientificInquiryData).
    // Conditionally add optional properties
    if (typeof data.results === 'string') {
      validatedExperimentData.results = data.results;
    }
    if (typeof data.outcomeMatched === 'boolean') {
      validatedExperimentData.outcomeMatched = data.outcomeMatched;
    }
    if (unexpectedObservations) { // Already validated and set to undefined if invalid/empty
      validatedExperimentData.unexpectedObservations = unexpectedObservations;
    }
    if (limitations) { // Already validated and set to undefined if invalid/empty
      validatedExperimentData.limitations = limitations;
    }
    if (nextSteps) { // Already validated and set to undefined if invalid/empty
      validatedExperimentData.nextSteps = nextSteps;
    }

    return validatedExperimentData as ExperimentData;
  }

  private updateRegistries(data: ScientificInquiryData): void {
    // Update hypothesis registry if a hypothesis is provided
    if (data.hypothesis) {
      this.hypothesisRegistry[data.hypothesis.hypothesisId] = data.hypothesis;
    }
    
    // Update experiment registry if an experiment is provided
    if (data.experiment) {
      this.experimentRegistry[data.experiment.experimentId] = data.experiment;
    }
  }

  private updateInquiryHistory(data: ScientificInquiryData): void {
    // Initialize inquiry history if needed
    if (!this.inquiryHistory[data.inquiryId]) {
      this.inquiryHistory[data.inquiryId] = [];
    }
    
    // Add to inquiry history
    this.inquiryHistory[data.inquiryId].push(data);
    
    // Update registries
    this.updateRegistries(data);
  }

  private getConfidenceBar(confidence: number): string {
    const barLength = 20;
    const filledLength = Math.round(confidence * barLength);
    const emptyLength = barLength - filledLength;
    
    let bar = '[';
    
    // Choose color based on confidence level
    let color: (text: string) => string;
    if (confidence >= 0.8) {
      color = chalk.green;
    } else if (confidence >= 0.5) {
      color = chalk.yellow;
    } else {
      color = chalk.red;
    }
    
    bar += color('='.repeat(filledLength));
    bar += ' '.repeat(emptyLength);
    bar += `] ${(confidence * 100).toFixed(0)}%`;
    
    return bar;
  }

  private getStatusColor(status: string): (text: string) => string {
    switch (status) {
      case 'proposed': return chalk.blue;
      case 'testing': return chalk.yellow;
      case 'supported': return chalk.green;
      case 'refuted': return chalk.red;
      case 'refined': return chalk.cyan;
      default: return chalk.white;
    }
  }

  private getVariableColor(type: string): (text: string) => string {
    switch (type) {
      case 'independent': return chalk.blue;
      case 'dependent': return chalk.green;
      case 'controlled': return chalk.yellow;
      case 'confounding': return chalk.red;
      default: return chalk.white;
    }
  }

  private visualizeScientificInquiry(data: ScientificInquiryData): string {
    let output = `\n${chalk.bold(`SCIENTIFIC INQUIRY`)} (ID: ${data.inquiryId})\n\n`;
    
    // Stage and iteration
    output += `${chalk.cyan('Stage:')} ${data.stage}\n`;
    output += `${chalk.cyan('Iteration:')} ${data.iteration}\n\n`;
    
    // Visualization depends on the stage
    switch (data.stage) {
      case 'observation':
        if (data.observation) {
          output += `${chalk.bold('OBSERVATION:')}\n`;
          output += `${data.observation}\n\n`;
        }
        break;
        
      case 'question':
        if (data.observation) {
          output += `${chalk.bold('OBSERVATION:')}\n`;
          output += `${data.observation}\n\n`;
        }
        
        if (data.question) {
          output += `${chalk.bold('RESEARCH QUESTION:')}\n`;
          output += `${data.question}\n\n`;
        }
        break;
        
      case 'hypothesis':
        if (data.question) {
          output += `${chalk.bold('RESEARCH QUESTION:')}\n`;
          output += `${data.question}\n\n`;
        }
        
        if (data.hypothesis) {
          const h = data.hypothesis;
          const statusColor = this.getStatusColor(h.status);
          
          output += `${chalk.bold('HYPOTHESIS:')}\n`;
          output += `${chalk.yellow('Statement:')} ${h.statement}\n`;
          output += `${chalk.yellow('Domain:')} ${h.domain}\n`;
          output += `${chalk.yellow('Status:')} ${statusColor(h.status)}\n`;
          output += `${chalk.yellow('Confidence:')} ${this.getConfidenceBar(h.confidence)}\n`;
          
          if (h.refinementOf) {
            output += `${chalk.yellow('Refinement of:')} ${h.refinementOf}\n`;
          }
          
          if (h.alternativeTo && h.alternativeTo.length > 0) {
            output += `${chalk.yellow('Alternative to:')} ${h.alternativeTo.join(', ')}\n`;
          }
          
          output += `\n${chalk.yellow('Variables:')}\n`;
          for (const variable of h.variables) {
            const typeColor = this.getVariableColor(variable.type);
            output += `  - ${variable.name} (${typeColor(variable.type)})\n`;
            if (variable.operationalization) {
              output += `    Operationalization: ${variable.operationalization}\n`;
            }
          }
          
          output += `\n${chalk.yellow('Assumptions:')}\n`;
          for (const assumption of h.assumptions) {
            output += `  - ${assumption}\n`;
          }
          output += '\n';
        }
        break;
        
      case 'experiment':
        if (data.hypothesis) {
          const h = data.hypothesis;
          output += `${chalk.bold('HYPOTHESIS:')}\n`;
          output += `${h.statement}\n\n`;
        }
        
        if (data.experiment) {
          const e = data.experiment;
          
          output += `${chalk.bold('EXPERIMENT:')}\n`;
          output += `${chalk.yellow('Design:')} ${e.design}\n\n`;
          
          output += `${chalk.yellow('Methodology:')}\n`;
          output += `${e.methodology}\n\n`;
          
          output += `${chalk.yellow('Control Measures:')}\n`;
          for (const measure of e.controlMeasures) {
            output += `  - ${measure}\n`;
          }
          output += '\n';
          
          output += `${chalk.yellow('Predictions:')}\n`;
          for (const prediction of e.predictions) {
            output += `  - IF ${prediction.if}\n`;
            output += `    THEN ${prediction.then}\n`;
            if (prediction.else) {
              output += `    ELSE ${prediction.else}\n`;
            }
            output += '\n';
          }
          
          if (e.limitations && e.limitations.length > 0) {
            output += `${chalk.yellow('Limitations:')}\n`;
            for (const limitation of e.limitations) {
              output += `  - ${limitation}\n`;
            }
            output += '\n';
          }
        }
        break;
        
      case 'analysis':
        if (data.experiment) {
          const e = data.experiment;
          
          output += `${chalk.bold('EXPERIMENT RESULTS:')}\n`;
          if (e.results) {
            output += `${e.results}\n\n`;
          }
          
          if (e.outcomeMatched !== undefined) {
            const outcomeText = e.outcomeMatched 
              ? chalk.green('Results matched predictions')
              : chalk.red('Results did not match predictions');
            output += `${outcomeText}\n\n`;
          }
          
          if (e.unexpectedObservations && e.unexpectedObservations.length > 0) {
            output += `${chalk.yellow('Unexpected Observations:')}\n`;
            for (const observation of e.unexpectedObservations) {
              output += `  - ${observation}\n`;
            }
            output += '\n';
          }
        }
        
        if (data.analysis) {
          output += `${chalk.bold('ANALYSIS:')}\n`;
          output += `${data.analysis}\n\n`;
        }
        break;
        
      case 'conclusion':
        if (data.analysis) {
          output += `${chalk.bold('ANALYSIS:')}\n`;
          output += `${data.analysis}\n\n`;
        }
        
        if (data.conclusion) {
          output += `${chalk.bold('CONCLUSION:')}\n`;
          output += `${data.conclusion}\n\n`;
        }
        break;
        
      case 'iteration':
        if (data.conclusion) {
          output += `${chalk.bold('PREVIOUS CONCLUSION:')}\n`;
          output += `${data.conclusion}\n\n`;
        }
        
        output += `${chalk.bold('ITERATION NOTES:')}\n`;
        output += `Moving to iteration ${data.iteration + 1}\n\n`;
        break;
    }
    
    // Next steps
    if (data.nextStageNeeded) {
      let nextStage: string;
      
      switch (data.stage) {
        case 'observation': nextStage = 'question'; break;
        case 'question': nextStage = 'hypothesis'; break;
        case 'hypothesis': nextStage = 'experiment'; break;
        case 'experiment': nextStage = 'analysis'; break;
        case 'analysis': nextStage = 'conclusion'; break;
        case 'conclusion': nextStage = 'iteration'; break;
        case 'iteration': nextStage = 'hypothesis'; break;
        default: nextStage = 'observation';
      }
      
      output += `${chalk.blue('NEXT STAGE:')}\n`;
      output += `  - Move to ${nextStage} stage\n`;
    }
    
    return output;
  }

  public processScientificInquiry(input: unknown): { content: Array<{ type: string; text: string }>; isError?: boolean } {
    try {
      const validatedInput = this.validateScientificInquiryData(input);
      
      // Update inquiry state
      this.updateInquiryHistory(validatedInput);
      
      // Generate visualization
      const visualization = this.visualizeScientificInquiry(validatedInput);
      console.error(visualization);
      
      // Return the inquiry result
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            inquiryId: validatedInput.inquiryId,
            stage: validatedInput.stage,
            iteration: validatedInput.iteration,
            hasObservation: !!validatedInput.observation,
            hasQuestion: !!validatedInput.question,
            hasHypothesis: !!validatedInput.hypothesis,
            hasExperiment: !!validatedInput.experiment,
            hasAnalysis: !!validatedInput.analysis,
            hasConclusion: !!validatedInput.conclusion,
            nextStageNeeded: validatedInput.nextStageNeeded
          }, null, 2)
        }]
      };
    } catch (error) {
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

const SCIENTIFIC_METHOD_TOOL: Tool = {
  name: "scientificMethod",
  description: `A detailed tool for applying formal scientific reasoning to questions and problems.
This tool guides models through the scientific method with structured hypothesis testing.
It enforces explicit variable identification, prediction making, and evidence evaluation.

When to use this tool:
- Investigating cause-effect relationships
- Evaluating competing explanations for phenomena
- Developing and testing hypotheses
- Avoiding confirmation bias in reasoning
- Conducting systematic inquiry

Key features:
- Structured scientific process
- Explicit variable identification
- Controlled experimental design
- Systematic evidence evaluation
- Iterative hypothesis refinement`,

  inputSchema: {
    type: "object",
    properties: {
      stage: {
        type: "string",
        enum: ["observation", "question", "hypothesis", "experiment", "analysis", "conclusion", "iteration"],
        description: "Current stage in the scientific process"
      },
      observation: {
        type: "string",
        description: "Observation of a phenomenon to investigate"
      },
      question: {
        type: "string",
        description: "Research question based on the observation"
      },
      hypothesis: {
        type: "object",
        description: "Formal hypothesis with variables and assumptions",
        properties: {
          statement: {
            type: "string",
            description: "Clear, testable hypothesis statement"
          },
          variables: {
            type: "array",
            description: "Variables involved in the hypothesis",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Name of the variable"
                },
                type: {
                  type: "string",
                  enum: ["independent", "dependent", "controlled", "confounding"],
                  description: "Type of variable"
                },
                operationalization: {
                  type: "string",
                  description: "How the variable is measured or manipulated"
                }
              },
              required: ["name", "type"]
            }
          },
          assumptions: {
            type: "array",
            description: "Assumptions underlying the hypothesis",
            items: {
              type: "string"
            }
          },
          hypothesisId: {
            type: "string",
            description: "Unique identifier for this hypothesis"
          },
          confidence: {
            type: "number",
            minimum: 0,
            maximum: 1,
            description: "Confidence in the hypothesis (0.0-1.0)"
          },
          domain: {
            type: "string",
            description: "Knowledge domain of the hypothesis"
          },
          iteration: {
            type: "number",
            minimum: 0,
            description: "Iteration number of the hypothesis"
          },
          alternativeTo: {
            type: "array",
            description: "IDs of competing hypotheses",
            items: {
              type: "string"
            }
          },
          refinementOf: {
            type: "string",
            description: "ID of the parent hypothesis if this is a refinement"
          },
          status: {
            type: "string",
            enum: ["proposed", "testing", "supported", "refuted", "refined"],
            description: "Current status of the hypothesis"
          }
        },
        required: ["statement", "variables", "assumptions", "hypothesisId", "confidence", "domain", "iteration", "status"]
      },
      experiment: {
        type: "object",
        description: "Experimental design to test the hypothesis",
        properties: {
          design: {
            type: "string",
            description: "General description of the experimental design"
          },
          methodology: {
            type: "string",
            description: "Detailed methodology for the experiment"
          },
          predictions: {
            type: "array",
            description: "Predictions based on the hypothesis",
            items: {
              type: "object",
              properties: {
                if: {
                  type: "string",
                  description: "Condition or manipulation"
                },
                then: {
                  type: "string",
                  description: "Expected outcome if hypothesis is correct"
                },
                else: {
                  type: "string",
                  description: "Alternative outcome if hypothesis is incorrect"
                }
              },
              required: ["if", "then"]
            }
          },
          experimentId: {
            type: "string",
            description: "Unique identifier for this experiment"
          },
          hypothesisId: {
            type: "string",
            description: "ID of the hypothesis being tested"
          },
          controlMeasures: {
            type: "array",
            description: "Measures to control confounding variables",
            items: {
              type: "string"
            }
          },
          results: {
            type: "string",
            description: "Results of the experiment"
          },
          outcomeMatched: {
            type: "boolean",
            description: "Whether the results matched the predictions"
          },
          unexpectedObservations: {
            type: "array",
            description: "Unexpected observations during the experiment",
            items: {
              type: "string"
            }
          },
          limitations: {
            type: "array",
            description: "Limitations of the experimental design",
            items: {
              type: "string"
            }
          },
          nextSteps: {
            type: "array",
            description: "Suggested next steps based on results",
            items: {
              type: "string"
            }
          }
        },
        required: ["design", "methodology", "predictions", "experimentId", "hypothesisId", "controlMeasures"]
      },
      analysis: {
        type: "string",
        description: "Analysis of the experimental results"
      },
      conclusion: {
        type: "string",
        description: "Conclusion based on the analysis"
      },
      inquiryId: {
        type: "string",
        description: "Unique identifier for this scientific inquiry"
      },
      iteration: {
        type: "number",
        minimum: 0,
        description: "Current iteration of the scientific process"
      },
      nextStageNeeded: {
        type: "boolean",
        description: "Whether another stage is needed in the process"
      }
    },
    required: ["stage", "inquiryId", "iteration", "nextStageNeeded"]
  }
};

const server = new Server(
  {
    name: "scientific-method-server",
    version: "0.1.2",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const scientificMethodServer = new ScientificMethodServer();

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [SCIENTIFIC_METHOD_TOOL],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "scientificMethod") {
    return scientificMethodServer.processScientificInquiry(request.params.arguments);
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
  console.error("Scientific Method MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});