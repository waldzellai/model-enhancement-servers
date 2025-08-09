#!/bin/bash

# Stage-Gate (Phase-Gate) Process Workflow
set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

PHASES=("Discovery" "Scoping" "Business Case" "Development" "Testing" "Launch")

echo -e "${YELLOW}🚪 Stage-Gate Process${NC}"

for PHASE in "${PHASES[@]}"; do
  echo -e "\n${GREEN}Phase: $PHASE${NC}"
  claude -p "In the Stage-Gate process, outline key activities and exit criteria for the $PHASE phase." --max-turns 1 2>/dev/null || true
  read -p "Proceed past $PHASE gate? (y/n) " DECISION
  if [[ "$DECISION" != "y" ]]; then
    echo "Stopped at $PHASE gate"
    exit 0
  fi
done

echo -e "\n${YELLOW}Stage-Gate workflow complete${NC}"
