#!/bin/bash

# A3 Problem-Solving Workflow
set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

PHASES=("Problem" "Root Cause" "Countermeasures" "Implementation" "Follow-up")

echo -e "${YELLOW}📝 A3 Problem-Solving${NC}"

for PHASE in "${PHASES[@]}"; do
  echo -e "\n${GREEN}Step: $PHASE${NC}"
  claude -p "In the A3 problem-solving method, describe guidance for the $PHASE step." --max-turns 1 2>/dev/null || true
  read -p "Proceed to next step? (y/n) " DECISION
  if [[ "$DECISION" != "y" ]]; then
    echo "A3 process ended at $PHASE"
    exit 0
  fi
done

echo -e "\n${YELLOW}A3 problem-solving cycle complete${NC}"
