import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import chalk from 'chalk';

// Define session configuration schema (optional - this server doesn't need config)
export const configSchema = z.object({});

// Types
interface DomainElement {
  id: string;
  name: string;
  type: "entity" | "attribute" | "relation" | "process";
  description: string;
}

interface AnalogicalMapping {
  sourceElement: string; // ID of source domain element
  targetElement: string; // ID of target domain element
  mappingStrength: number; // 0.0-1.0
  justification: string;
  limitations?: string[];
}

interface AnalogicalReasoningData {
  // Core analogy components
  sourceDomain: {
    name: string;
    elements: DomainElement[];
  };
  targetDomain: {
    name: string;
    elements: DomainElement[];
  };
  mappings: AnalogicalMapping[];
  
  // Analogy metadata
  analogyId: string;
  purpose: "explanation" | "prediction" | "problem-solving" | "creative-generation";
  confidence: number; // 0.0-1.0
  iteration: number;
  
  // Evaluation
  strengths: string[];
  limitations: string[];
  inferences: Array<{
    statement: string;
    confidence: number;
    basedOnMappings: string[]; // IDs of mappings supporting this inference
  }>;
  
  // Next steps
  nextOperationNeeded: boolean;
  suggestedOperations?: Array<"add-mapping" | "revise-mapping" | "draw-inference" | "evaluate-limitation" | "try-new-source">;
}

// Type guard for DomainElement type
const allowedElementTypes = ["entity", "attribute", "relation", "process"] as const;
type DomainElementType = typeof allowedElementTypes[number];

function isValidElementType(type: unknown): type is DomainElementType {
  return typeof type === 'string' && allowedElementTypes.includes(type as DomainElementType);
}

class AnalogicalReasoningServer {
  private analogyHistory: Record<string, AnalogicalReasoningData[]> = {};
  private domainRegistry: Record<string, {
    name: string;
    elements: DomainElement[];
  }> = {};
  private nextElementId = 1;

  private validateAnalogicalReasoningData(input: unknown): AnalogicalReasoningData {
    const data = input as Record<string, unknown>;
    
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
    const sourceDomain = data.sourceDomain as Record<string, unknown>;
    const targetDomain = data.targetDomain as Record<string, unknown>;
    
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
    const sourceElements: DomainElement[] = [];
    for (const element of sourceDomain.elements as Array<Record<string, unknown>>) {
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
      
      sourceElements.push({ id: element.id as string, name: element.name as string, type: element.type, description: element.description as string });
    }
    
    const targetElements: DomainElement[] = [];
    for (const element of targetDomain.elements as Array<Record<string, unknown>>) {
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
      
      targetElements.push({ id: element.id as string, name: element.name as string, type: element.type, description: element.description as string });
    }
    
    // Validate mappings
    const mappings: AnalogicalMapping[] = [];
    if (Array.isArray(data.mappings)) {
      for (const mapping of data.mappings as Array<Record<string, unknown>>) {
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
        
        const limitations: string[] = [];
        if (mapping.limitations && Array.isArray(mapping.limitations)) {
          for (const limitation of mapping.limitations) {
            if (typeof limitation === 'string') {
              limitations.push(limitation);
            }
          }
        }
        
        const mappingData: AnalogicalMapping = {
          sourceElement: mapping.sourceElement as string,
          targetElement: mapping.targetElement as string,
          mappingStrength: mapping.mappingStrength as number,
          justification: mapping.justification as string,
          // limitations is added conditionally below
        };
        if (limitations.length > 0) {
            mappingData.limitations = limitations;
        }
        mappings.push(mappingData);
      }
    }
    
    // Validate arrays
    const strengths: string[] = [];
    if (Array.isArray(data.strengths)) {
      for (const strength of data.strengths) {
        if (typeof strength === 'string') {
          strengths.push(strength);
        }
      }
    }
    
    const limitations: string[] = [];
    if (Array.isArray(data.limitations)) {
      for (const limitation of data.limitations) {
        if (typeof limitation === 'string') {
          limitations.push(limitation);
        }
      }
    }
    
    const inferences: AnalogicalReasoningData['inferences'] = [];
    if (Array.isArray(data.inferences)) {
      for (const inference of data.inferences as Array<Record<string, unknown>>) {
        if (!inference.statement || typeof inference.statement !== 'string') {
          throw new Error('Invalid inference statement: must be a string');
        }
        
        if (typeof inference.confidence !== 'number' || inference.confidence < 0 || inference.confidence > 1) {
          throw new Error('Invalid inference confidence: must be a number between 0 and 1');
        }
        
        if (!Array.isArray(inference.basedOnMappings)) {
          throw new Error('Invalid inference basedOnMappings: must be an array of mapping IDs');
        }
        
        const basedOnMappings: string[] = [];
        for (const mappingId of inference.basedOnMappings) {
          if (typeof mappingId === 'string') {
            basedOnMappings.push(mappingId);
          }
        }
        
        inferences.push({
          statement: inference.statement as string,
          confidence: inference.confidence as number,
          basedOnMappings
        });
      }
    }
    
    const suggestedOperations: AnalogicalReasoningData['suggestedOperations'] = [];
    if (Array.isArray(data.suggestedOperations)) {
      for (const operation of data.suggestedOperations) {
        if (typeof operation === 'string' && [
          'add-mapping', 'revise-mapping', 'draw-inference', 'evaluate-limitation', 'try-new-source'
        ].includes(operation)) {
          suggestedOperations.push(operation as any);
        }
      }
    }
    
    // Create validated data object with conditional suggestedOperations
    const validatedData: AnalogicalReasoningData = {
      sourceDomain: {
        name: sourceDomain.name as string,
        elements: sourceElements
      },
      targetDomain: {
        name: targetDomain.name as string,
        elements: targetElements
      },
      mappings,
      analogyId: data.analogyId as string,
      purpose: data.purpose as AnalogicalReasoningData['purpose'],
      confidence: data.confidence as number,
      iteration: data.iteration as number,
      strengths,
      limitations,
      inferences,
      nextOperationNeeded: data.nextOperationNeeded as boolean,
      // suggestedOperations is added conditionally below
    };

    if (suggestedOperations.length > 0) {
      validatedData.suggestedOperations = suggestedOperations;
    }

    return validatedData;
  }

  private updateDomainRegistry(domain: { name: string; elements: DomainElement[] }): void {
    this.domainRegistry[domain.name] = {
      name: domain.name,
      elements: [...domain.elements]
    };
  }

  private updateAnalogicalReasoning(data: AnalogicalReasoningData): void {
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

  private visualizeMapping(data: AnalogicalReasoningData): string {
    const { sourceDomain, targetDomain, mappings } = data;
    
    let output = `\n${chalk.bold(`ANALOGY: ${sourceDomain.name}  ${targetDomain.name}`)} (ID: ${data.analogyId})\n\n`;
    
    // Purpose and confidence
    output += `${chalk.cyan('Purpose:')} ${data.purpose}\n`;
    output += `${chalk.cyan('Confidence:')} ${(data.confidence * 100).toFixed(0)}%\n`;
    output += `${chalk.cyan('Iteration:')} ${data.iteration}\n\n`;
    
    // Create mapping visualization
    output += `${chalk.bold('STRUCTURAL MAPPINGS:')}\n\n`;
    
    const mappingsBySourceType = new Map<string, AnalogicalMapping[]>();
    
    for (const mapping of mappings) {
      const sourceElement = sourceDomain.elements.find(e => e.id === mapping.sourceElement);
      if (!sourceElement) continue;
      
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
        
        if (!sourceElement || !targetElement) continue;
        
        // Color-code based on mapping strength
        let strengthIndicator: string;
        if (mapping.mappingStrength >= 0.8) {
          strengthIndicator = chalk.green('STRONG');
        } else if (mapping.mappingStrength >= 0.5) {
          strengthIndicator = chalk.yellow('MODERATE');
        } else {
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
      } else {
        output += `   Continue refining the analogy\n`;
      }
    }
    
    return output;
  }

  public processAnalogicalReasoning(input: unknown): { content: Array<{ type: "text"; text: string }>; isError?: boolean } {
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
          type: "text" as const,
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
    } catch (error) {
      return {
        content: [{
          type: "text" as const,
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
const AnalogicalReasoningSchema = z.object({
  sourceDomain: z.object({
    name: z.string(),
    elements: z.array(z.object({
      id: z.string().optional(),
      name: z.string(),
      type: z.enum(["entity", "attribute", "relation", "process"]),
      description: z.string()
    }))
  }),
  targetDomain: z.object({
    name: z.string(),
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
  suggestedOperations: z.array(
    z.enum(["add-mapping", "revise-mapping", "draw-inference", "evaluate-limitation", "try-new-source"])
  ).optional()
});

// Export createServer function for Smithery CLI
export default function createServer({
  config,
}: {
  config: z.infer<typeof configSchema>;
}): Server {
  // Create a low-level Server instance
  const server = new Server(
    {
      name: "analogical-reasoning-server",
      version: "0.1.3",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  const analogicalReasoningServer = new AnalogicalReasoningServer();

  // Register handlers
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "analogicalReasoning",
        title: "Analogical Reasoning",
        description: `A detailed tool for analogical thinking between source and target domains.
This tool helps models structure analogies systematically to improve understanding and reasoning.
It facilitates explicit mapping between domains, inference generation, and analogy evaluation.

Use this tool to:
- Map concepts between familiar and unfamiliar domains
- Draw insights through structural alignment
- Generate predictions based on analogical transfer
- Solve problems by applying known solutions to new contexts`,
        inputSchema: zodToJsonSchema(AnalogicalReasoningSchema) as any,
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: toolArgs } = request.params;

    if (name === "analogicalReasoning") {
      const parsed = AnalogicalReasoningSchema.safeParse(toolArgs);
      if (!parsed.success) {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Invalid arguments: ${parsed.error.message}`
        );
      }

      const result = await analogicalReasoningServer.processAnalogicalReasoning(parsed.data);
      return result;
    }

    throw new McpError(ErrorCode.InvalidParams, `Unknown tool: ${name}`);
  });

  return server;
}