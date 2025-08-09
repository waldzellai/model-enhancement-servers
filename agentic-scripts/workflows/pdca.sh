#!/bin/bash

# PDCA (Plan-Do-Check-Act) Workflow
set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

PHASES=("Plan" "Do" "Check" "Act")

echo -e "${YELLOW}🔁 PDCA Cycle${NC}"

for PHASE in "${PHASES[@]}"; do
  echo -e "\n${GREEN}Phase: $PHASE${NC}"
  claude -p "For the PDCA cycle, give concise guidance for the $PHASE phase." --max-turns 1 2>/dev/null || true
  read -p "Continue to next phase? (y/n) " DECISION
  if [[ "$DECISION" != "y" ]]; then
    echo "PDCA cycle halted at $PHASE phase"
    exit 0
  fi
done

echo -e "\n${YELLOW}PDCA cycle complete${NC}"
