# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio website for **Esha Sherry** — Sr. Software Engineer, AI at Softchoice.
Deployed at [esherry.ca](https://esherry.ca).

**Stack:** React 19 · TypeScript · Create React App · Tailwind CSS v3 · CSS design tokens · `@react-pdf/renderer`

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (localhost:3000) |
| `npm run build` | Production build via react-scripts |
| `npm test` | Jest + React Testing Library |
| `npm run generate-resume` | Render `public/EshaSherryResume.pdf` from portfolio data via tsx |

## Deployment

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Pushes to `main` trigger automatic build and deploy. The `homepage` field in `package.json` is set to `https://esherry.ca`.

## Architecture

Single source of truth: **`src/data/portfolioData.ts`** drives both the website and the resume PDF.

```
portfolioData.ts ──┬──> React components ──> Website
                   └──> resumeTemplate.tsx ──> @react-pdf/renderer ──> EshaSherryResume.pdf
```

All content lives in `portfolioData.ts`. To update any text on the site or resume, edit that file.

**TypeScript imports use absolute paths** from `src/` (configured via `baseUrl: "src"` in `tsconfig.json`). E.g., `import { Project } from '../types'` not `import { Project } from '../../src/types'`.

### Key directories

- `src/components/` — Section components (`HeroSection`, `AboutSection`, `ProjectsSection`, `ExperienceSection`, `SkillsSection`, `EducationSection`, `ContactSection`) + `Nav`
- `src/components/common/` — Reusable: `BentoCard` (glass card with variants), `ScrollReveal` (fade-in on scroll), `SectionWrapper` (consistent section layout)
- `src/hooks/` — `useScrollReveal` (IntersectionObserver visibility), `useActiveSection` (scroll-based nav highlighting)
- `src/data/portfolioData.ts` — All content data (named exports)
- `src/types/index.ts` — TypeScript interfaces
- `scripts/` — Resume generation pipeline (`generateResume.tsx`, `resumeTemplate.tsx`, `resumeStyles.ts`)

## Data Model

```typescript
Project       { title, company, description, highlights[], tags[], featured? }
Experience    { company, role, period, location, current?, highlights[], resumeHighlights? }
Education     { school, degree, year, location, coursework?, capstone? }
Certification { name, issuer, highlighted? }
SkillCategory { name, skills[] }
SocialLink    { name, url, icon }
```

Key detail: `Experience.resumeHighlights` provides longer, more detailed bullets for the PDF resume. If present, the resume template uses `resumeHighlights` instead of `highlights`. The website always uses `highlights`.

## Resume Generation

1. Run `npm run generate-resume` (executes `tsx scripts/generateResume.tsx`)
2. `resumeTemplate.tsx` imports data directly from `src/data/portfolioData.ts`
3. `@react-pdf/renderer`'s `renderToBuffer()` produces a PDF buffer → writes to `public/EshaSherryResume.pdf`

The resume includes: Header → Experience → Education → Technical Skills → Certifications. Projects are **not** a separate resume section (project work is captured within experience bullets).

## Styling

- **Design tokens** in `src/index.css` `:root` — single source of truth for colors, spacing, radii
- **Tailwind CSS v3** via `tailwind.config.js` — bridges CSS custom properties to utility classes (e.g., `bg-primary` → `var(--color-primary)`)
- **Hybrid approach:** Tailwind utilities for most styling; dedicated CSS files only for complex effects (animations, gradients, glassmorphism). Components with CSS files: `Nav`, `HeroSection`, `SkillsSection`, `BentoCard`, `SectionWrapper`
- **Theme ("Warm Sunset"):** primary `#FFB088`, accent `#FF7B7B`, secondary `#FFD966`, bg `#FFF8F0`
- **Font:** DM Sans (Google Fonts, configured as `font-sans`)
- **Glass effect tokens:** `--glass-bg`, `--glass-border`, `--glass-blur`, `--glass-shadow` → exposed as `bg-glass-bg`, `border-glass-border`, `shadow-glass`
- **Layout:** `max-w-site` = 1200px, `--nav-height: 72px`
- **Animations:** `scroll-reveal` (fade-up on viewport entry), `animate-float`, `animate-float-delayed`, `animate-pulse-soft`, `animate-gradient-shift`, `animate-fade-in-up`
- **Accessibility:** `prefers-reduced-motion` disables all animations; `:focus-visible` outlines
- **BentoCard variants:** `default` (plain glass), `accent` (pink tint), `golden` (yellow tint), `highlight` (orange tint)
- **Custom border radii:** `rounded-sm` (12px), `rounded-md` (20px), `rounded-lg` (28px), `rounded-xl` (36px), `rounded-pill` (999px)

## Component Patterns

### Adding a new section
1. Create `src/components/NewSection.tsx` — use Tailwind classes. Only add a `.css` file for complex animations/effects.
2. Use `SectionWrapper` for consistent layout: `<SectionWrapper id="new" title="New Section">`
3. Wrap content items in `ScrollReveal` for entrance animation
4. Use `BentoCard` for card-based layouts with appropriate variant
5. Import data from `portfolioData.ts`
6. Add the component to `src/App.tsx` in the desired order
7. Add a nav entry in `portfolioData.ts` → `navLinks` array

### Section component template
```tsx
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';
import BentoCard from './common/BentoCard';
import { dataExport } from '../data/portfolioData';

export default function SectionName() {
  return (
    <SectionWrapper id="section-id" title="Section Title">
      <div className="grid gap-6 md:grid-cols-2">
        <ScrollReveal>
          <BentoCard variant="default">
            <h3 className="text-xl font-bold text-text-main mb-2">{/* title */}</h3>
            <p className="text-text-light">{/* content */}</p>
          </BentoCard>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
```

### Updating content
- Edit `src/data/portfolioData.ts` — all text content lives here
- Run `npm run generate-resume` to regenerate the PDF after changes
- The `/update-resume` skill automates this workflow

## Conventions

- **File naming:** PascalCase for components (`ProjectsSection.tsx`), camelCase for data/hooks (`portfolioData.ts`, `useScrollReveal.ts`)
- **Exports:** Default exports for components, named exports for data and hooks
- **No test files currently** — `App.test.tsx` was removed

## Skills

| Skill | Command | Description |
|-------|---------|-------------|
| update-resume | `/update-resume` | Update portfolio data and regenerate the resume PDF |