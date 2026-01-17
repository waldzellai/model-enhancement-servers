export const FALLACY_CATALOG = {
    "ad_hominem": {
        name: "Ad Hominem",
        category: "relevance",
        description: "Attacking the person making the argument rather than the argument itself",
        examples: [
            "You can't trust John's opinion on climate science - he's a terrible cook",
            "She's too young to understand these complex issues",
        ],
        detection_patterns: [
            "Personal attacks unrelated to argument",
            "Dismissal based on character traits",
            "Focus on speaker rather than claims",
        ],
    },
    "straw_man": {
        name: "Straw Man",
        category: "relevance",
        description: "Misrepresenting someone's argument to make it easier to attack",
        examples: [
            "You want to reform healthcare? So you think doctors shouldn't be paid?",
            "Environmental regulations? You want to destroy all jobs and live in caves?",
        ],
        detection_patterns: [
            "Exaggerated version of opponent's position",
            "Attacking position opponent didn't take",
            "'So you're saying...' followed by distortion",
        ],
    },
    "false_dichotomy": {
        name: "False Dichotomy",
        category: "presumption",
        description: "Presenting only two options when more alternatives exist",
        examples: [
            "You're either with us or against us",
            "Either we cut all social programs or the country goes bankrupt",
        ],
        detection_patterns: [
            "Either/or framing with no middle ground",
            "Ignoring spectrum of possibilities",
            "Forced binary choice",
        ],
    },
    "slippery_slope": {
        name: "Slippery Slope",
        category: "presumption",
        description: "Assuming one action will inevitably lead to extreme consequences without justification",
        examples: [
            "If we allow gay marriage, next people will marry animals",
            "If we ban one gun, soon all guns will be illegal",
        ],
        detection_patterns: [
            "Chain of increasingly extreme consequences",
            "No evidence for inevitable progression",
            "'This will lead to...' without justification",
        ],
    },
    "appeal_to_authority": {
        name: "Appeal to Authority",
        category: "relevance",
        description: "Citing authority without proper credentials or in wrong domain",
        examples: [
            "This celebrity says vaccines are dangerous, so they must be",
            "Einstein believed in God, so atheism is wrong",
        ],
        detection_patterns: [
            "Authority cited outside their expertise",
            "Celebrity opinion treated as expert evidence",
            "Appeal to fame rather than knowledge",
        ],
    },
    "circular_reasoning": {
        name: "Circular Reasoning",
        category: "presumption",
        description: "Using the conclusion as a premise in the argument",
        examples: [
            "The Bible is true because it says so in the Bible",
            "This policy is good because it's the right thing to do, and it's right because it's good",
        ],
        detection_patterns: [
            "Conclusion restated as premise",
            "No independent justification",
            "Tautological statements",
        ],
    },
    "cherry_picking": {
        name: "Cherry-Picking",
        category: "relevance",
        description: "Selecting only supporting evidence while ignoring contradicting evidence",
        examples: [
            "Citing three studies that support your view while ignoring fifty that don't",
            "Showing only successful examples while hiding failures",
        ],
        detection_patterns: [
            "Selective data presentation",
            "Ignoring contradictory evidence",
            "Biased sample selection",
        ],
    },
    "appeal_to_emotion": {
        name: "Appeal to Emotion",
        category: "relevance",
        description: "Manipulating emotions to win an argument instead of using logic",
        examples: [
            "Think of the children! How can you oppose this?",
            "If you really loved your country, you'd support this policy",
        ],
        detection_patterns: [
            "Emotional language replacing evidence",
            "Appeals to fear, pity, or patriotism",
            "Manipulative imagery without logic",
        ],
    },
    "hasty_generalization": {
        name: "Hasty Generalization",
        category: "presumption",
        description: "Drawing broad conclusions from insufficient or unrepresentative evidence",
        examples: [
            "I met two rude people from that city, so everyone there must be rude",
            "This supplement worked for my friend, so it cures everything",
        ],
        detection_patterns: [
            "Small sample size",
            "Anecdotal evidence treated as universal",
            "Broad claims from limited data",
        ],
    },
    "red_herring": {
        name: "Red Herring",
        category: "relevance",
        description: "Introducing irrelevant information to distract from the actual argument",
        examples: [
            "Why worry about the environment when we have unemployment?",
            "You criticize my driving? Well, you're not perfect either!",
        ],
        detection_patterns: [
            "Topic change to avoid main point",
            "Irrelevant counterargument",
            "Distraction from core issue",
        ],
    },
    "false_equivalence": {
        name: "False Equivalence",
        category: "presumption",
        description: "Treating two unequal things as equivalent",
        examples: [
            "Taking a life-saving drug without a prescription is the same as taking heroin",
            "A kindergarten teacher and a tenured professor both teach, so they deserve equal pay",
        ],
        detection_patterns: [
            "Comparing vastly different things",
            "Ignoring critical distinctions",
            "'Both sides are the same' despite evidence",
        ],
    },
    "bandwagon": {
        name: "Bandwagon",
        category: "relevance",
        description: "Arguing something is true because many people believe it",
        examples: [
            "Everyone believes this, so it must be true",
            "50 million people can't be wrong",
        ],
        detection_patterns: [
            "Popularity as evidence",
            "Appeal to majority opinion",
            "'Everyone knows...'",
        ],
    },
    "texas_sharpshooter": {
        name: "Texas Sharpshooter",
        category: "presumption",
        description: "Cherry-picking data clusters to suit an argument while ignoring data that doesn't fit",
        examples: [
            "Finding patterns in random data and claiming they're significant",
            "Ignoring all failed predictions while highlighting the one that worked",
        ],
        detection_patterns: [
            "Pattern recognition after the fact",
            "Ignoring randomness",
            "Post-hoc pattern finding",
        ],
    },
    "no_true_scotsman": {
        name: "No True Scotsman",
        category: "presumption",
        description: "Arbitrarily redefining criteria to exclude counterexamples",
        examples: [
            "'No true Christian would do that' (when shown Christians who do)",
            "'Real programmers don't use IDEs' (excluding many professional programmers)",
        ],
        detection_patterns: [
            "Moving goalposts when counterexample appears",
            "'No true X...' statements",
            "Arbitrary redefinition to exclude evidence",
        ],
    },
    "loaded_question": {
        name: "Loaded Question",
        category: "relevance",
        description: "Asking a question that contains an assumption that must be accepted to answer it",
        examples: [
            "Have you stopped beating your wife?",
            "Why do you hate freedom?",
        ],
        detection_patterns: [
            "Question with built-in assumption",
            "No way to answer without accepting premise",
            "Trap question",
        ],
    },
};
//# sourceMappingURL=fallacy-catalog.js.map