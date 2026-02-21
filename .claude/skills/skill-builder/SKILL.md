---
name: skill-builder
description: >
  Create, improve, audit, and upgrade Claude Code skills. Use when asked to
  "create a skill", "make a new slash command", "improve this skill",
  "audit skills", or "update skill-builder". Also use when noticing repeated
  workflows that should be codified. Sub-commands: create, improve, audit, upgrade.
---

# Skill Builder

Create and maintain Claude Code skills following Anthropic's best practices.

## Sub-Commands

| Command                  | Purpose                                     |
| ------------------------ | ------------------------------------------- |
| `/skill-builder create`  | Create a new skill from scratch             |
| `/skill-builder improve` | Enhance an existing skill                   |
| `/skill-builder audit`   | Check all skills for issues                 |
| `/skill-builder upgrade` | Fetch latest Claude docs, update this skill |

## Before Any Sub-Command

**Required reading** (load these before proceeding):

1. **Read** [references/anthropic-guidelines.md](references/anthropic-guidelines.md) - Official best practices
2. **Scan** `.claude/skills/` - Know what exists, avoid duplicates

---

## `/skill-builder create`

### When to Use

- User says "create a skill for X" or "make a slash command"
- A workflow is repeated 3+ times and should be codified
- Domain knowledge needs capturing for reuse

### Step 1: Validate

**Check if it should be a skill:**

| Signal                    | Action                                   |
| ------------------------- | ---------------------------------------- |
| Already exists            | Suggest `/skill-builder improve` instead |
| Too narrow (one-off task) | Add as sub-command to existing skill     |
| Overlaps existing skill   | Extend that skill instead                |

**Score timelessness (print this table):**

| Criterion            | Score    | Reasoning                                           |
| -------------------- | -------- | --------------------------------------------------- |
| Version independence | X/10     | No pinned versions? Abstracts volatile deps?        |
| Principle-based      | X/10     | Teaches concepts, not just procedures?              |
| Extension points     | X/10     | Room for sub-commands, future growth?               |
| **Overall**          | **X/10** | **Transient (1-3) / Moderate (4-6) / Solid (7-10)** |

Reject if <4. Revise if 4-6. Proceed if 7+.

### Step 2: Design

**Choose pattern:**

| Pattern      | When                            |
| ------------ | ------------------------------- |
| Single-phase | Simple linear task              |
| Multi-phase  | Ordered workflow with gates     |
| Sub-commands | Related actions sharing context |
| Checklist    | Quality/compliance audit        |

**Size targets:**

- Description: ≤200 chars, includes "Use when..." triggers
- SKILL.md body: ≤500 lines / ~1,500 words
- If larger → extract to `references/`

### Reference File Structure

If skill needs references/, propose a split before creating:

```
Proposed Reference Structure
============================
references/
├── patterns.md     # Used by: create, review (core patterns)
├── examples.md     # Used by: create only (code examples)

Rationale:
- patterns.md: Shared across most sub-commands
- examples.md: Only needed when creating new code

Approve? [Yes / Modify: ___]
```

**Sizing rules:**

- <100 lines → fine as-is
- 100-300 lines → add table of contents
- 300+ lines → split further or add grep hints to SKILL.md

### Step 3: Write

```bash
mkdir -p .claude/skills/{name}
# Add references/ only if needed
```

**Use template from** [references/templates.md](references/templates.md)

**Required elements:**

1. Frontmatter with `name` + `description` (include trigger phrases)
2. Sub-commands table (if applicable)
3. "Before Any Sub-Command" section with explicit file reads
4. Clear steps per sub-command
5. Verifiable checklist

### Step 4: Validate & Update

- [ ] Description includes 3+ trigger phrases ("Use when...")
- [ ] All file paths exist and are correct
- [ ] No placeholders remain
- [ ] Under size limits
- [ ] Reference files sized correctly (<100 lines, or has TOC, or split)
- [ ] All references link directly from SKILL.md (no nested refs)
- [ ] CLAUDE.md skill table updated (with sub-commands)

---

## `/skill-builder improve`

### When to Use

- Skill has gaps, missing patterns, or unclear instructions
- File references are broken or outdated
- Skill exceeds size limits
- Skill predates current standards and needs modernization

### Step 1: Determine Mode

Ask: "What kind of improvement?"

| Signal                                          | Mode                                |
| ----------------------------------------------- | ----------------------------------- |
| "Fix X" or specific issue mentioned             | **Targeted fix** → skip to Step 3   |
| "Update to latest" / "modernize" / skill is old | **Full modernization** → run Step 2 |
| Unclear                                         | Ask user which mode                 |

### Step 2: Full Modernization Checklist

Run through the full `create` checklist against the existing skill:

**Structure:**

- [ ] Description has 3+ trigger phrases ("Use when...")
- [ ] "Before Any Sub-Command" section exists with explicit reads
- [ ] Each sub-command has: When to Use, Steps, Checklist
- [ ] No placeholders remain
- [ ] CLAUDE.md skill table is current

**Sizing:**

- [ ] SKILL.md ≤500 lines — if over, propose reference split (use same format as create)
- [ ] Reference files <100 lines or have TOC
- [ ] All references one level deep (no nested refs)

**Content quality:**

- [ ] Examples are generic and portable (no project-specific imports)
- [ ] Code samples are correct and current
- [ ] Anti-patterns shown use `// ❌` and correct patterns use `// ✓`

**Propose comprehensive update for approval before applying.**

### Step 3: Targeted Fix

Ask: "What behavior have you observed?"

- Does it trigger when expected?
- Which sections get used/ignored?
- Any unexpected paths?

1. **Read the skill**: `.claude/skills/{name}/SKILL.md`
2. **Read reflections**: Check `.claude/reflections/index.md` for relevant principles
3. **Identify specific gaps** (don't rewrite everything)
4. **Make targeted edits** - change only what's needed
5. **Re-score timelessness** if scope changed significantly
6. **Check reference file sizes** - If any >100 lines without TOC, fix
7. **Update CLAUDE.md** if description or sub-commands changed

---

## `/skill-builder audit`

### When to Use

- Periodic health check (monthly)
- After major codebase changes
- Before committing skill updates

### Steps

1. **List skills**: `ls .claude/skills/`

2. **Check each skill:**

   | Check        | Pass Criteria                      |
   | ------------ | ---------------------------------- |
   | Frontmatter  | Has `name` + `description`         |
   | Triggers     | Description includes "Use when..." |
   | Size         | ≤500 lines or uses references/     |
   | File refs    | All paths exist                    |
   | Placeholders | None remain                        |

3. **Check CLAUDE.md alignment:**
   - All skills listed in table?
   - Sub-commands documented?

4. **Output report:**

   ```
   Skill Audit Report
   ==================
   ✓ finalize: All checks pass
   ✗ reflect: Missing from CLAUDE.md

   Actions needed:
   1. Add reflect to CLAUDE.md skill table
   ```

---

## `/skill-builder upgrade`

### When to Use

- Monthly maintenance
- When Claude releases new skill features
- When Anthropic publishes new best practices

### Steps

1. **Fetch latest docs:**
   - WebSearch: "Claude Code skills best practices"
   - WebFetch: https://docs.anthropic.com/en/docs/claude-code/skills

2. **Compare with** [references/anthropic-guidelines.md](references/anthropic-guidelines.md)

3. **Propose updates** (require approval):

   ```
   Proposed Updates
   ================
   1. references/anthropic-guidelines.md
      - Add: [new pattern]
      - Update: [changed guideline]

   Sources: [URLs]

   Approve? [Yes/No]
   ```

4. **Apply approved changes**

---

## Reference Files

- **Anthropic guidelines**: [references/anthropic-guidelines.md](references/anthropic-guidelines.md)
- **Templates**: [references/templates.md](references/templates.md)
- **Existing skills**: `.claude/skills/*/SKILL.md`
