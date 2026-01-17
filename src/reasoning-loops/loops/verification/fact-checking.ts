export const FACT_CHECKING_LOOP = `# Fact Checking OODA Loop

Verify claims against sources of truth with confidence scoring.

## Classification

- **Type**: verification
- **Speed**: medium (~15-60s per claim)
- **Scope**: item (single claim)

## OODA Phases

### OBSERVE

Gather evidence for the claim:

1. **PARSE claim**: Extract verifiable components
   - Entities (functions, classes, endpoints, values)
   - Assertions ("X does Y", "X returns Z")
   - Quantifiers ("always", "never", "up to N")

2. **SEARCH by source type**:
   - **Codebase**: Use semantic search and grep to find definitions
   - **Documentation**: Query official docs and specifications
   - **Web**: Search for authoritative external sources
   - **API**: Make live calls to verify behavior

3. **ASSESS evidence quality**: Score each piece of evidence on:
   - Source authority (official docs > blogs)
   - Recency (newer > older)
   - Relevance (direct match > tangential)
   - Specificity (exact quote > general mention)

### ORIENT

Synthesize evidence into verdict:

1. **CATEGORIZE evidence**: supporting vs contradicting vs contextual

2. **WEIGHT evidence**: Higher weight for authoritative, recent, relevant sources

3. **DETERMINE verdict**:
   - VERIFIED: Supporting evidence outweighs contradicting by 1.5x+
   - CONTRADICTED: Contradicting evidence outweighs supporting by 1.5x+
   - OUTDATED: Was true but changed (old supporting + new contradicting)
   - PARTIAL: Evidence roughly balanced
   - UNVERIFIABLE: No evidence found

4. **IDENTIFY key evidence**: Select top 3 pieces from each category

### DECIDE

Commit to verdict and correction strategy:

1. **FINALIZE verdict**: Adjust based on confidence threshold

2. **DECIDE on correction**:
   - CONTRADICTED → replace with correct information
   - OUTDATED → update with current information
   - PARTIAL → add nuance and qualifications

3. **ASSESS correction confidence**: Minimum of overall confidence and evidence quality

### ACT

Generate outputs:

1. **FORMAT evidence**: Truncate content, format sources

2. **GENERATE correction**: Create replacement text from evidence

3. **EMIT signals**:
   - claim_verified
   - claim_contradicted
   - claim_outdated
   - claim_unverifiable

4. **RETURN**: verdict, confidence, evidence, correction, sources

## Termination Conditions

- **Success**: Verdict determined with confidence >= threshold
- **Failure**: N/A (always produces a verdict)
- **Timeout**: Max search time reached → return with available evidence

## Signals Emitted

| Signal | When | Payload |
|--------|------|---------|
| \`claim_verified\` | Claim is accurate | \`{ claim_id, confidence, evidence }\` |
| \`claim_contradicted\` | Claim conflicts with evidence | \`{ claim_id, contradiction }\` |
| \`claim_outdated\` | Claim was true but changed | \`{ claim_id, was_true_until }\` |
| \`claim_unverifiable\` | Cannot determine | \`{ claim_id, sources_checked }\` |

## Evidence Quality Factors

| Factor | Weight | Description |
|--------|--------|-------------|
| Source Authority | 0.3 | Official docs > blogs > forums |
| Recency | 0.25 | Newer > older |
| Relevance | 0.25 | Direct match > tangential |
| Specificity | 0.2 | Exact quote > general mention |
`;
