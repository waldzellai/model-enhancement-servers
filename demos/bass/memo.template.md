# Decision Memo — Glass Scrolls

Generated: <%= it.nowIso %>

## Baseline Parameters
<% if (Object.keys(it.runSummary.baselines).length === 0) { %>
_No explicit baselines found in runs. Update your run JSONs to include a `baseline` or `parameters` object._
<% } else { %>
```json
<%~ JSON.stringify(it.runSummary.baselines, null, 2) %>
```
<% } %>

## Summary
- **Total runs**: <%= it.runSummary.totalRuns %>
- **Successes**: <%= it.runSummary.successCount %>
- **Failures**: <%= it.runSummary.failureCount %>
- **Sample keys**: <%= it.runSummary.sampleKeys.join(', ') %>

## Inputs Considered
<% if (it.runSummary.runFiles.length === 0) { %>
_No JSON run files detected in the input directory._
<% } else { %>
<% for (const f of it.runSummary.runFiles) { %>- <%= f %>
<% } %>
<% } %>

<% if (it.chartGenerated) { %>
## Run Outcomes
![Run Chart](./runs-chart.png)
<% } %>