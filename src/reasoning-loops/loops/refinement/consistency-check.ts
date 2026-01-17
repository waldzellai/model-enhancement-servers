export const CONSISTENCY_CHECK_LOOP = `# Consistency Check OODA Loop

Validate cross-references and ensure consistency across documents/code.

## Classification

- **Type**: refinement
- **Speed**: fast (~5-20s per check)
- **Scope**: collection (multiple files/documents)

## OODA Phases

### OBSERVE

Collect consistency signals across artifacts:

1. **INDEX all artifacts**: Extract requirements, terms, references from each

2. **EXTRACT cross-references**: Find all @references, imports, section links

3. **COLLECT terminology**: Build map of term usage across all artifacts

4. **GATHER versioning info**: Extract package/spec/API versions

5. **MAP schemas/contracts**: Collect all schema definitions

### ORIENT

Analyze for inconsistencies:

1. **VALIDATE cross-references**: Check that all references resolve to existing targets

2. **CHECK terminology consistency**:
   - Multiple definitions for same term
   - Inconsistent spelling/casing
   - Undefined terms

3. **VERIFY version consistency**: Same package should have same version everywhere

4. **CHECK schema consistency**: Same schema name should have same structure

5. **VERIFY API contracts**: Spec should match implementation

6. **CALCULATE consistency score**: (total_checks - issues) / total_checks

### DECIDE

Determine resolution strategy:

1. **CATEGORIZE inconsistencies**: Auto-resolvable vs manual-required

2. **PRIORITIZE by severity**: errors > warnings > info

3. **DECIDE on action**:
   - CONSISTENT: No issues found
   - AUTO_FIX: All issues can be fixed automatically
   - PARTIAL_FIX: Some auto, some manual
   - BLOCK: Critical errors require manual intervention

### ACT

Apply resolutions:

1. **Auto-fix** high-confidence issues

2. **Flag** issues requiring manual review

3. **Generate** cross-reference map and terminology report

4. **EMIT signals**:
   - consistency_verified
   - consistency_fixed
   - consistency_partial
   - consistency_blocked

5. **RETURN**: consistent status, inconsistencies, resolutions, reports

## Termination Conditions

- **Success**: All checks pass or only auto-fixable issues
- **Failure**: Blocking inconsistencies requiring manual resolution

## Signals Emitted

| Signal | When | Payload |
|--------|------|---------|
| \`consistency_verified\` | All checks pass | \`{ artifacts, refs, terms }\` |
| \`consistency_fixed\` | All issues auto-fixed | \`{ fixes_applied }\` |
| \`consistency_partial\` | Some manual fixes needed | \`{ fixed, manual_needed }\` |
| \`consistency_blocked\` | Blocking issues found | \`{ error_count, issues }\` |

## Check Patterns

### Cross-Reference Validation
- Pattern: @[spec-name]#[section]
- Validation: File exists, section exists, content relevant

### Terminology Consistency
- Check: Same term, same definition
- Detection: Extract definitions, group by term, compare

### Version Alignment
- Check: Same package, same version
- Detection: Extract versions, group by package, compare
`;
