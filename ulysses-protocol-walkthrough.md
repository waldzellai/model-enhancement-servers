### Ulysses Protocol walkthrough

State Step 0

  - Make a plan for State Step 1 and State Step 2
  - Set an expectation for each state step's outcomes
        - if State Step 1 goes how we expect, the codebase state we would expect is...[]
        - if State Step 1 does not go how we expect, and we move to Step 2, the codebase state we would expect is...[]

State Step 1

  - Put SS1 plan into action -->
  - Evaluate our outcome
        - if State Step 1 outcome == expectation --> SS1 = SS0
        - if State Step 1 outcome != expectation --> SS2

State Step 2

  - Put SS2 plan into action -->
  - Evaluate our outcome
        - if SS2 outcome == expectation --> SS2 = SS0
        - if SS2 outcome != expectation --> PAUSE -> ORIGINAL SS0

PAUSE

  - CONSIDERATION (reasoning about why our outcomes did not match expectation)
        - theorize about why previous turn of 2 steps was not successful
        - add an entry to state documenting the 2 steps that did not work
        - make a new plan for State Step 1 and State Step 2
            - if State Step 1 goes how we expect, the codebase state we would expect is...[]
            - if State Step 1 does not go how we expect, and we move to Step 2, the codebase state we would expect is...[]

CHECKPOINTS

  - are spots in the stepwise Ulysses workflow that human user/agent infer are good places to come back to if failure happens later in the workflow.
  - example: after a full subtask is completed, after a stubborn bug is overcome, etc.
  - these are stored in JSON state object
  - agent/user can come back to these points at any time if a PAUSE is reached