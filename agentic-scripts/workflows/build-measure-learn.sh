#!/bin/bash

# Build-Measure-Learn Workflow (Lean Startup)
set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

PHASES=("Build" "Measure" "Learn")

echo -e "${YELLOW}🚀 Build-Measure-Learn${NC}"

while true; do
  for PHASE in "${PHASES[@]}"; do
    echo -e "\n${GREEN}Stage: $PHASE${NC}"
    claude -p "In the Build-Measure-Learn loop, give concise guidance for the $PHASE stage." --max-turns 1 2>/dev/null || true
  done
  read -p "Iterate again? (y/n) " DECISION
  [[ "$DECISION" == "y" ]] || break
done

echo -e "\n${YELLOW}Build-Measure-Learn loop complete${NC}"
