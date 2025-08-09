#!/bin/bash

# OODA Loop Workflow
set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

PHASES=("Observe" "Orient" "Decide" "Act")

echo -e "${YELLOW}🎯 OODA Loop${NC}"

while true; do
  for PHASE in "${PHASES[@]}"; do
    echo -e "\n${GREEN}Stage: $PHASE${NC}"
    claude -p "Provide actionable advice for the $PHASE stage of the OODA loop." --max-turns 1 2>/dev/null || true
  done
  read -p "Run another OODA cycle? (y/n) " DECISION
  [[ "$DECISION" == "y" ]] || break
done

echo -e "\n${YELLOW}OODA loop session finished${NC}"
