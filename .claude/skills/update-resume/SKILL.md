---
name: update-resume
description: >
  Update portfolio data and regenerate the resume PDF. Use when adding a new job,
  updating experience bullets, changing skills or certifications, editing education,
  or modifying contact info. Invoke with /update-resume.
---

# Update Resume

Update `src/data/portfolioData.ts` and regenerate `public/EshaSherryResume.pdf` in one workflow.

## Before Starting

**Read these files:**

1. `src/data/portfolioData.ts` — current data (source of truth)
2. `src/types/index.ts` — data interfaces

## Step 1: Ask What to Update

Use AskUserQuestion to determine the scope:

**Question:** "What would you like to update on your resume?"

| Option | Follow-Up Questions |
|--------|---------------------|
| Add a new job | Company, role, location, start date, end date (or "Present"), website highlights (concise, 2-3 bullets), resume highlights (detailed, 4-6 bullets) |
| Update an existing job | Which company? What changed? (new bullets, title change, date correction) |
| Update skills | Which category? Skills to add/remove? New category needed? |
| Update certifications | Cert name, issuer, highlighted on website? |
| Update education | Which school? What changed? |
| Update contact info | Which field? (name, email, phone, LinkedIn, GitHub) |

## Step 2: Gather Details

Ask focused follow-up questions based on the selected option. Gather ALL needed information before making any edits. Key rules:

- **New jobs:** Ask for both `highlights` (concise, for website) AND `resumeHighlights` (detailed, for PDF). Explain the difference: website bullets are 1-line summaries; resume bullets are full sentences with context.
- **Existing jobs:** Show the current data for that entry so the user can say exactly what to change.
- **Skills:** Show current categories so the user can pick where new skills go.
- **Contact info:** Confirm the exact value before editing.

Do NOT proceed to editing until the user confirms all details are correct.

## Step 3: Edit portfolioData.ts

1. Read `src/data/portfolioData.ts` (fresh read — data may have changed)
2. Make the requested edits
3. If adding a new job at the top of the list, set `current: true` on it and remove `current` from the previous first entry

## Step 4: Generate and Verify

Run these commands in sequence:

```bash
npm run generate-resume
```

1. Confirm the script completes without errors
2. Report the output file path and size
3. Tell the user to run `open public/EshaSherryResume.pdf` to visually verify

## Step 5: Confirm

Ask: "The resume PDF has been regenerated. Would you like to open it to verify, or make any other changes?"

## Checklist

- [ ] All details gathered before editing (no assumptions)
- [ ] `src/data/portfolioData.ts` updated correctly
- [ ] `npm run generate-resume` completed without errors
- [ ] User informed of output and next steps

## Reference Files

- Data file: `src/data/portfolioData.ts`
- Type definitions: `src/types/index.ts`
- PDF template: `scripts/resumeTemplate.tsx`
- PDF styles: `scripts/resumeStyles.ts`
- Generator script: `scripts/generateResume.tsx`