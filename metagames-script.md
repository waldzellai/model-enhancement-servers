## Metagames

### Intro

Are you tired of Cursor turning your codebase into a can of hot dog water? Does the phrase "you're absolutely right" give you Vietnam flashbacks even though you were born after 9/11? After working with Claude Code, does p(doom) feel like an expression of hope?

Well, put down that emotional support copy of "That Alien Message," I've got a good one for you today. Today we're going to learn about using metagames to turn open-ended problems into closed-loop processes, so Claude can tell you it sees the issue now a little less often. I'm glassBead, and this is Design Patterns in MCP. Let's get it.


### What are metagames?

What are metagames? In short, metagames are processes that help AI agents execute complex, open-ended tasks like debugging and feature implementations. They help agents reduce the complexity of these problem spaces.

I wrote the first metagame about three months ago after trying and failing many, many times to prevent Claude Code from rabbit-holing during the debugging process. Whenever Claude Code would make a change to the code that resulted in TypeScript errors, it would almost always get lost trying to fix the type errors it created instead of stepping back and trying something else. Until finally, I came up with a workflow I called Ulysses Protocol that solved the issue. Let's walk through it together to illustrate what I'm talking about.


### Ulysses Protocol walkthrough

Consider a scenario where we're about to begin a debugging process for some error. Let's call the first position, the one before we've done any work, State Step 0.


State Step 0

  - Make a plan for State Step 1 and State Step 2
  - Set an expectation for each State Step's outcomes
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
        - Set an expectation for each State Step's outcomes
            - if State Step 1 goes how we expect, the codebase state we would expect is...[]
            - if State Step 1 does not go how we expect, and we move to Step 2, the codebase state we would expect is...[]


CHECKPOINTS

  - are spots in the stepwise Ulysses workflow that human user/agent infer are good places to come back to if failure happens later in the workflow.
  - example: after a full subtask is completed, after a stubborn bug is overcome, etc.
  - these are stored in JSON state object
  - agent/user can come back to these points at any time if a PAUSE is reached

If Claude Code or Roo Code hold to this pattern, they will almost always eventually arrive at a non-failure outcome. This is because there is a finite number of possible causes for a given error in a codebase. The number of things that could be going wrong is limited. Unless the agent experiences an unrelated error at runtime, the agent *will* avoid the usual failure modes and end up at an outcome that is not failure. It will either succeed, or it will figure out that the information it needs isn't in the codebase.


### Anatomy of a Metagame

Now that we've walked through a metagame, let's briefly look at the template that describes how to put a new one together. I won't spend too much time here since you can access this yourself on GitHub through the link in the description, but every metagame proceeds this way:

  - Phase 0: Initialize
  - Phase 1: Discovery/Analysis
  - Phase 2: Strategy/Planning
  - Phase 3: Execution Loop
  - Phase 4: Validation + Reporting

There are one or more "gates" between each of the phases. You can think of these gates as the "definitions of done" for each metagame phase.

### Metagames in Action

Alright, we're done reviewing metagames: let's see them in action. We'll need a task to apply them to, and this project will do as well as any. In this project, I have a few MCP servers: this is the first set of sequentialthinking forks i made this past winter, and they later formed the basis for my Clear Thought server.

[link in description: plug bit]

(Proton)
I have an email here from Smithery that says these servers need to migrate to SHTTP by September 7th. Streamable HTTP was not a supported protocol when I made these servers in Feburary, but here in September it's become the standard, so I need to update the servers to use sHTTP transport. This is a great use for a metagame called refactoring-game. We'll be able to see everything we've talked about today in action. I also already have a spec here in the specs/ folder describing what we're going to implement.

I think that many MCP servers would benefit from serving metagames, but metagames don't require the agent using them to support MCP at all. Because they are usually best expressed as simple descriptive markdown versus deterministic code, we can provide metagames to Claude Code as slash commands, or as workflows in Cursor, Warp, etc. 

-----------------------------
#### Arguments

- `codebase_path` (required): Path to the codebase to refactor
- `ship_deadline` (optional): ISO 8601 deadline (default: 4 hours from now)
- `budget` (optional): Energy units for refactoring (default: 100)
- `max_iterations` (optional): Maximum refactoring rounds (default: 5)
- `confidence_threshold` (optional): Quality threshold 0-1 (default: 0.8)
- `comments` (optional): developer comments on the task
```
-------------------


I'm going to use Claude Code. At .claude/commands/games/refactoring-game.md, we have our metagame. We're going to pass arguments for codebase_path, confidence_threshold which we will set to 0.97, and some developer comments that contain our spec so the agent knows what to do. Then we're going to sit back, relax, and watch the agent play the game.

we'll run...

```bash
claude --mcp-config cc_mcp_config.json
```

then, because I'm on Claude Code, I'm going to use a slash to pull up all of my slash commands. If I type in "games:ref", I'll get my refactoring game. Ignore the other two, sorry. So I'll have some quotes and include a reference to the server we're refactoring first, then setting confidence threshold to 0.97, and finally I will tell Claude:

```bash
/games:refactoring-game " @src/analogical-reasoning/ " confidence_threshold=0.97 "the spec for what you'll be implementing is located at @specs/mcp-http-migration.md. I want to make a clarification about, and addition to, your toolkit. Starting with clarity, you are equipped with three retrieval MCP servers right now: Exa, Firecrawl, and context7. Their purposes are as follows. Use context7 when you need technical documentation (the Smithery docs, for instance). Use Firecrawl when you know a specific URL that you want to visit. Use Exa in all other cases where you would be performing retrieval. As for the addition, you have E2B configured via MCP, so you can use sandbox environments to test Python and JS/TS code before writing it into our project code."
```


### Metagames MCP server

This has been a brief overview of metagames, why they're useful, and when to use them. Before we wrap up, I've released a Metagames MCP server on Smithery that serves these games to any MCP client application. At the time of filming this video, I haven't included any notebooks yet, which are key for making the games that steal directly from operations research work for us. That'll be where we pick up in the next Design Patterns in MCP video. 

Thanks for watching: the Metagames MCP server code is linked in the description. If you liked the video, or you think you can get some use from metagames later down the line, hit the like and subscribe buttons, and follow me on X at @glassBeadDeux.

Thanks everyone! See you next time.