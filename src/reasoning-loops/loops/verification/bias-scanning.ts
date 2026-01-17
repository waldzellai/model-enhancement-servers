export const BIAS_SCANNING_LOOP = `# Bias Scanning OODA Loop

Detect logical fallacies, loaded language, and argumentation issues.

## Classification

- **Type**: verification
- **Speed**: medium (~30-90s per text)
- **Scope**: document (full text analysis)

## OODA Phases

### OBSERVE

Parse text and identify potential bias patterns:

1. **EXTRACT claims**: Identify all factual claims and assertions

2. **SCAN vocabulary**:
   - Absolutist language ("always", "never", "everyone", "no one")
   - Loaded terms (emotionally charged words)
   - Weasel words ("some say", "many believe")
   - Appeal to emotion markers

3. **IDENTIFY logical fallacies**:
   - Ad hominem attacks
   - Straw man arguments
   - False dichotomies
   - Slippery slope reasoning
   - Appeal to authority without credentials
   - Circular reasoning
   - Cherry-picking evidence

4. **CHECK structural issues**:
   - Unsupported claims
   - Missing counterarguments
   - False balance / both-sidesism
   - Selective quotation

5. **ASSESS argumentation quality**:
   - Premise-conclusion gaps
   - Unstated assumptions
   - Logical coherence

### ORIENT

Categorize and prioritize findings:

1. **GROUP by type**: vocabulary / logical / structural / argumentation

2. **ASSESS severity**:
   - ERROR: Clear fallacy or severe bias
   - WARNING: Potentially problematic language
   - INFO: Minor issue or stylistic concern

3. **CALCULATE confidence**: How certain are we this is actually bias?

4. **IDENTIFY patterns**: Multiple related issues suggesting systematic bias

5. **CONTEXTUALIZE**: Is this bias appropriate given genre/purpose?

### DECIDE

Determine what to report and recommend:

1. **FILTER by severity threshold**: Only report above minimum severity

2. **PRIORITIZE issues**:
   - Logical fallacies (highest priority)
   - Loaded language affecting claims
   - Structural problems
   - Minor stylistic issues

3. **FORMULATE recommendations**:
   - Specific rewrites for clear biases
   - Suggestions for strengthening arguments
   - Additional evidence needed

### ACT

Generate bias report:

1. **FORMAT findings**: Line numbers, context, bias type, severity

2. **PROVIDE examples**: Show specific problematic passages

3. **SUGGEST fixes**: Concrete language improvements

4. **EMIT signals**:
   - vocabulary_bias_detected
   - fallacy_detected
   - structural_issue_found
   - analysis_complete

5. **RETURN**: bias_count, findings, recommendations, overall_assessment

## Termination Conditions

- **Success**: Full text analyzed, all biases cataloged
- **Failure**: N/A (analysis always completes)
- **Timeout**: Max analysis time → return partial results

## Signals Emitted

| Signal | When | Payload |
|--------|------|---------|
| \`vocabulary_bias_detected\` | Loaded language found | \`{ term, line, context }\` |
| \`fallacy_detected\` | Logical fallacy identified | \`{ fallacy_type, location, description }\` |
| \`structural_issue_found\` | Argumentation problem | \`{ issue_type, severity }\` |
| \`analysis_complete\` | Scanning finished | \`{ total_issues, by_severity }\` |

## Logical Fallacy Categories

### Ad Hominem
Attacking the person instead of the argument

### Straw Man
Misrepresenting an argument to make it easier to attack

### False Dichotomy
Presenting only two options when more exist

### Slippery Slope
Assuming one action will inevitably lead to extreme consequences

### Appeal to Authority
Citing authority without proper credentials

### Circular Reasoning
Using the conclusion as a premise

### Cherry-Picking
Selecting only supporting evidence while ignoring contradicting evidence

### Appeal to Emotion
Manipulating emotions instead of using logic

### Hasty Generalization
Drawing broad conclusions from limited evidence

### Red Herring
Introducing irrelevant information to distract from the argument
`;
