# Anthropic Skill Guidelines

Official best practices from Anthropic. **Read this before creating or improving skills.**

> Source: [Skill authoring best practices](https://docs.anthropic.com/en/docs/claude-code/skills)

## Contents

- [The Three Rules](#the-three-rules)
- [Structure](#structure)
- [Splitting Large References](#splitting-large-references)
- [Anti-Patterns](#anti-patterns)
- [Official Sources](#official-sources)

## The Three Rules

### 1. Context is Precious

The context window is shared. Every token competes with conversation history.

- **Assume Claude is smart** - only add context it doesn't have
- **Challenge every line** - "Does this justify its token cost?"
- **Keep SKILL.md under 500 lines** - extract the rest to references/

### 2. Progressive Disclosure

| Level       | Content                | When Loaded    | Target Size |
| ----------- | ---------------------- | -------------- | ----------- |
| Metadata    | `name` + `description` | Always         | ~100 tokens |
| SKILL.md    | Core instructions      | When triggered | <5k tokens  |
| references/ | Details, examples      | As needed      | Unlimited   |

### 3. Descriptions Drive Discovery

Claude uses the description to decide when to invoke. **This is the trigger mechanism.**

```yaml
# ❌ Bad - vague, no triggers
description: Handles UI stuff

# ✓ Good - specific, includes triggers
description: >
  Create and maintain UI components. Use when building new components,
  extracting shared code, or reviewing component quality.
  Sub-commands: create, extract, review.
```

**Include:**

- What the skill does (1 sentence)
- When to use it ("Use when...")
- Sub-commands if applicable

## Structure

```
skill-name/
├── SKILL.md              # Required: frontmatter + instructions
├── references/           # Optional: loaded as needed
│   ├── patterns.md
│   └── examples.md
└── scripts/              # Optional: executable code
```

### SKILL.md Sections

1. **Frontmatter** - `name`, `description` (required)
2. **Sub-commands table** - if multiple actions
3. **"Before Any Sub-Command"** - required reads, context gathering
4. **Per-sub-command sections** - When to Use, Steps, Checklist
5. **Reference Files** - links to references/

### References Best Practices

- Keep all files **one level deep** from SKILL.md
- Files >100 lines should have **table of contents**
- Use **explicit read instructions**: "Read references/X.md before proceeding"
- Don't duplicate - content lives in SKILL.md OR references, not both

## Splitting Large References

Split by **shared context**, not by sub-command:

| Split Strategy | When to Use                              |
| -------------- | ---------------------------------------- |
| By topic       | Multiple sub-commands need same topic    |
| By frequency   | Commonly-needed vs rarely-needed content |
| By domain      | Distinct domains that don't overlap      |

**Ask:** "Which sub-commands need this content?"

- All of them → keep in SKILL.md or single reference
- 2-3 of them → group into shared reference file
- Just one → consider inlining or narrow reference file

## Anti-Patterns

| Anti-Pattern                  | Fix                                           |
| ----------------------------- | --------------------------------------------- |
| "See file.md for details"     | "**Read** file.md before proceeding"          |
| Description without triggers  | Add "Use when..." phrases                     |
| Everything in SKILL.md        | Extract to references/                        |
| Vague checklist items         | Make verifiable: "[ ] Exported from index.ts" |
| Deeply nested references      | Keep one level deep                           |
| Monolithic reference file     | Split by domain, add TOC if >100 lines        |
| Nested references (ref → ref) | Keep all refs one level from SKILL.md         |

## Official Sources

- [Skill authoring best practices](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code)
