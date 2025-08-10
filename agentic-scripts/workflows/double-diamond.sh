#!/bin/bash

# Double Diamond / Design Thinking Workflow
set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

PHASES=("Discover" "Define" "Develop" "Deliver")

echo -e "${YELLOW}💎 Double Diamond / Design Thinking${NC}"

for PHASE in "${PHASES[@]}"; do
  echo -e "\n${GREEN}Phase: $PHASE${NC}"
  claude -p "Explain activities and objectives for the $PHASE phase in the Double Diamond design thinking model." --max-turns 1 2>/dev/null || true
  read -p "Proceed to next phase? (y/n) " DECISION
  if [[ "$DECISION" != "y" ]]; then
    echo "Process ended at $PHASE phase"
    exit 0
  fi
done

echo -e "\n${YELLOW}Double Diamond cycle complete${NC}"
