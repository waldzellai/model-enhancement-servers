#!/bin/bash

# DMAIC (Define-Measure-Analyze-Improve-Control) Workflow
set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

PHASES=("Define" "Measure" "Analyze" "Improve" "Control")

echo -e "${YELLOW}📊 DMAIC Process${NC}"

for PHASE in "${PHASES[@]}"; do
  echo -e "\n${GREEN}Phase: $PHASE${NC}"
  claude -p "Within DMAIC, describe goals and deliverables for the $PHASE phase." --max-turns 1 2>/dev/null || true
  read -p "Move to next phase? (y/n) " DECISION
  if [[ "$DECISION" != "y" ]]; then
    echo "DMAIC cycle stopped at $PHASE phase"
    exit 0
  fi
done

echo -e "\n${YELLOW}DMAIC cycle complete${NC}"
