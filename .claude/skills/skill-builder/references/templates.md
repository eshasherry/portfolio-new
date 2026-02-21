# Skill Templates

Copy and adapt these templates when creating skills.

## Contents

- [Basic Skill (No Sub-Commands)](#basic-skill-no-sub-commands)
- [Sub-Command Skill](#sub-command-skill)
- [Checklist/Audit Skill](#checklistaudit-skill)
- [Key Principles](#key-principles)

## Basic Skill (No Sub-Commands)

```markdown
---
name: skill-name
description: >
  One sentence of what it does. Use when [trigger 1], [trigger 2],
  or [trigger 3]. Invoke for tasks involving [context].
---

# Skill Name

One sentence purpose.

## Before Starting

**Read these files:**

1. `.claude/reflections/index.md` - Check for relevant patterns
2. [Any domain-specific files]

## Steps

1. First step with clear action
2. Second step
3. Third step

## Checklist

- [ ] Verifiable outcome 1
- [ ] Verifiable outcome 2
- [ ] Related files updated if needed

## Reference Files

- Key reference: `path/to/file`
```

## Sub-Command Skill

```markdown
---
name: domain-skill
description: >
  Domain operations. Use /domain cmd1 for X, /domain cmd2 for Y.
  Invoke when [trigger phrase]. Sub-commands: cmd1, cmd2, cmd3.
---

# Domain Skill

Brief purpose statement.

## Sub-Commands

| Command        | Purpose      |
| -------------- | ------------ |
| `/domain cmd1` | What it does |
| `/domain cmd2` | What it does |

## Before Any Sub-Command

**Read these files:**

1. `.claude/reflections/index.md` - Relevant patterns
2. [Domain-specific references]

---

## `/domain cmd1`

### When to Use

- Trigger condition 1
- Trigger condition 2

### Steps

1. Action 1
2. Action 2

### Checklist

- [ ] Verification 1
- [ ] Verification 2

---

## `/domain cmd2`

[Same structure...]

---

## Reference Files

- Reference 1: [references/file.md](references/file.md)
- Reference 2: `path/to/file`
```

## Checklist/Audit Skill

```markdown
---
name: check-something
description: >
  Verify X meets quality standards. Use after completing Y, before
  committing, or when asked to review Z.
---

# Check Something

Verify quality and consistency.

## Before Starting

**Read:** `.claude/reflections/index.md` → Anti-Patterns section

## Checklist

Run through each check. Fix issues before proceeding.

### Category 1

- [ ] Check with clear pass/fail criteria
- [ ] Another specific check

### Category 2

- [ ] Check that references specific file or pattern
- [ ] Check with example of correct vs incorrect

## If Issues Found

1. List all issues first (don't fix one-by-one)
2. Group by category
3. Fix in order of severity
4. Re-run checklist

## Reference Files

- Patterns to follow: `path/to/patterns`
- Anti-patterns: `.claude/reflections/index.md`
```

## Key Principles

1. **Description = Discovery** - Include "Use when..." triggers
2. **Explicit reads** - "**Read** file.md" not "See file.md"
3. **Verifiable checklists** - Outcomes you can confirm
4. **One level deep** - References link from SKILL.md directly
5. **Under 500 lines** - Extract verbose content to references/
