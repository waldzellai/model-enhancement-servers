#!/bin/bash

# Gamified Learning Strategy Workflow
set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

LEVEL=1

echo -e "${YELLOW}🎮 Gamified Learning Workflow${NC}"

while true; do
  echo -e "\n${GREEN}Level $LEVEL${NC}"
  claude -p "Suggest a challenge and reward structure for level $LEVEL in a gamified learning strategy." --max-turns 1 2>/dev/null || true
  read -p "Level complete? (y/n) " DECISION
  if [[ "$DECISION" != "y" ]]; then
    echo "Gamified learning session ended at level $LEVEL"
    break
  fi
  LEVEL=$((LEVEL+1))
  read -p "Continue to next level? (y/n) " CONT
  [[ "$CONT" == "y" ]] || break
done

echo -e "\n${YELLOW}Gamified learning session complete${NC}"
