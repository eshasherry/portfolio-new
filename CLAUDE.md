# Cute Portfolio

Personal portfolio website for **Esha Sherry** — Sr. Software Engineer, AI at Softchoice.

**Stack:** React 19 · TypeScript · Create React App · CSS custom properties · `@react-pdf/renderer`

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (localhost:3000) |
| `npm run build` | Production build via react-scripts |
| `npm test` | Jest + React Testing Library |
| `npm run generate-resume` | Render `public/EshaSherryResume.pdf` from portfolio data via tsx |

## Architecture

Single source of truth: **`src/data/portfolioData.ts`** drives both the website and the resume PDF.

```
portfolioData.ts ──┬──> React components ──> Website
                   └──> resumeTemplate.tsx ──> @react-pdf/renderer ──> EshaSherryResume.pdf
```

All content lives in `portfolioData.ts`. To update any text on the site or resume, edit that file.

## Key Files

### Data & Types
| File | Purpose |
|------|---------|
| `src/data/portfolioData.ts` | All portfolio content: personalInfo, stats, projects, experiences, education, certifications, skillCategories, socialLinks, navLinks |
| `src/types/index.ts` | TypeScript interfaces: Project, Experience, Education, Certification, SkillCategory, SocialLink |

### Components
| File | Purpose |
|------|---------|
| `src/App.tsx` | Root — renders Nav + all sections in order |
| `src/components/Nav.tsx` | Sticky nav with hamburger menu, uses `useActiveSection` for scroll-based highlighting |
| `src/components/HeroSection.tsx` | Landing hero with name, title, tagline, stats, CTA buttons |
| `src/components/AboutSection.tsx` | About / bio section |
| `src/components/ProjectsSection.tsx` | Bento grid layout for featured projects |
| `src/components/ExperienceSection.tsx` | Work history timeline |
| `src/components/SkillsSection.tsx` | Skill categories in bento cards |
| `src/components/EducationSection.tsx` | Education + certifications |
| `src/components/ContactSection.tsx` | Contact links (email, LinkedIn, GitHub) |

### Common Components
| File | Purpose |
|------|---------|
| `src/components/common/BentoCard.tsx` | Glass card with variants: `default`, `accent`, `golden`, `highlight` |
| `src/components/common/ScrollReveal.tsx` | Wrapper that fades children in on scroll via IntersectionObserver |
| `src/components/common/SectionWrapper.tsx` | Standard section layout with `id`, optional `title`, max-width container |

### Hooks
| File | Purpose |
|------|---------|
| `src/hooks/useScrollReveal.ts` | Returns `{ ref, isVisible }` — IntersectionObserver-based visibility detection |
| `src/hooks/useActiveSection.ts` | Tracks which section is in viewport for nav highlighting |

### Resume Generation (scripts/)
| File | Purpose |
|------|---------|
| `scripts/generateResume.tsx` | Entry point — renders ResumeDocument to buffer, writes `public/EshaSherryResume.pdf` |
| `scripts/resumeTemplate.tsx` | PDF layout using `@react-pdf/renderer` — imports data directly from portfolioData |
| `scripts/resumeStyles.ts` | `StyleSheet.create()` for the PDF (Helvetica, LETTER size) |

### Styles
| File | Purpose |
|------|---------|
| `src/index.css` | Design tokens (CSS custom properties), global reset, scroll-reveal animation, keyframes |
| `src/App.css` | Footer styles |
| `src/components/*.css` | Component-level stylesheets (one per section component) |
| `src/components/common/BentoCard.css` | BentoCard glassmorphism + variant styles |
| `src/components/common/SectionWrapper.css` | Section padding, max-width, title underline |

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

## Resume Generation Pipeline

1. Run `npm run generate-resume` (executes `tsx scripts/generateResume.tsx`)
2. `generateResume.tsx` imports `ResumeDocument` from `resumeTemplate.tsx`
3. `resumeTemplate.tsx` imports data directly from `src/data/portfolioData.ts`
4. `@react-pdf/renderer`'s `renderToBuffer()` produces a PDF buffer
5. Buffer is written to `public/EshaSherryResume.pdf`

The resume includes: Header (name/contact) → Experience → Education → Technical Skills → Certifications. It does **not** include Projects as a separate section (project work is captured within experience bullets).

## Styling

- **Design system:** CSS custom properties defined in `src/index.css` `:root` block
- **Theme:** "Warm Sunset" — primary `#FFB088`, accent `#FF7B7B`, secondary `#FFD966`, bg `#FFF8F0`
- **Font:** Google Fonts DM Sans (`--font-family`)
- **Glass effect:** `--glass-bg`, `--glass-border`, `--glass-blur`, `--glass-shadow` tokens power the glassmorphism cards
- **Spacing scale:** `--space-xs` (0.5rem) through `--space-4xl` (6rem)
- **Radius scale:** `--radius-sm` (12px) through `--radius-pill` (999px)
- **Layout:** `--max-width: 1200px`, `--nav-height: 72px`
- **Animations:** `scroll-reveal` class (fade-up on viewport entry), `float`, `pulse-soft`, `gradient-shift`, `fade-in-up` keyframes
- **Accessibility:** `prefers-reduced-motion` disables all animations; `:focus-visible` outlines
- **BentoCard variants:** `default` (plain glass), `accent` (pink tint), `golden` (yellow tint), `highlight` (orange tint)

## Component Patterns

### Adding a new section
1. Create `src/components/NewSection.tsx` + `NewSection.css`
2. Use `SectionWrapper` for consistent layout: `<SectionWrapper id="new" title="New Section">`
3. Wrap content items in `ScrollReveal` for entrance animation
4. Use `BentoCard` for card-based layouts with appropriate variant
5. Import data from `portfolioData.ts`
6. Add the component to `src/App.tsx` in the desired order
7. Add a nav entry in `portfolioData.ts` → `navLinks` array

### Section component structure
```tsx
import SectionWrapper from './common/SectionWrapper';
import ScrollReveal from './common/ScrollReveal';
import BentoCard from './common/BentoCard';
import { dataExport } from '../data/portfolioData';
import './SectionName.css';

export default function SectionName() {
  return (
    <SectionWrapper id="section-id" title="Section Title">
      <ScrollReveal>
        <BentoCard variant="default">
          {/* content */}
        </BentoCard>
      </ScrollReveal>
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
- **CSS:** Component-level CSS files matching component names, BEM-like class naming (`section__container`, `nav__link--active`)
- **Exports:** Default exports for components, named exports for data and hooks
- **No test files currently** — `App.test.tsx` was removed

## Skills

| Skill | Command | Description |
|-------|---------|-------------|
| update-resume | `/update-resume` | Update portfolio data and regenerate the resume PDF |
