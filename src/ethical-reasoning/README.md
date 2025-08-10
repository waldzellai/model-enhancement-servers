# Ethical Reasoning MCP Server

The Ethical Reasoning server helps language models analyze the moral dimensions of a proposed action. It guides models through several classical ethical frameworks so they can produce more transparent and defensible recommendations.

## Motivation

LLMs often conflate different moral perspectives or overlook key considerations when evaluating difficult choices. By providing structured prompts for methods like utilitarian, deontological, virtue, care, and social contract analysis, this server promotes more systematic ethical reflection.

## Technical Specification

### Tool Interface

```typescript
interface EthicalRequestData {
  scenario: string;                     // description of the situation
  action: string;                       // action or policy to evaluate
  frameworks: (
    "utilitarianism" |
    "deontology" |
    "virtue" |
    "care" |
    "social-contract"
  )[];                                  // frameworks to apply
  confidence: number;                   // confidence in provided information
  nextStepNeeded: boolean;              // whether further ethical analysis is required
  suggestedNext?: string[];             // optional recommendation for follow up
}
```

The server outputs a short JSON summary and prints framework-specific guidance to stderr for the model to review.
