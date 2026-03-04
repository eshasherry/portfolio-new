# Navbar Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the full-width sticky navbar with a floating centered pill nav featuring a Framer Motion sliding active indicator and a mobile bottom sheet menu.

**Architecture:** The Nav component will be rewritten as a fixed-position floating pill using GlassSurface for the glass effect. Framer Motion's `layoutId` handles the sliding active indicator animation. On mobile (<768px), the pill shrinks to logo+hamburger, and links appear in an AnimatePresence-powered bottom sheet. The `useActiveSection` hook and `navLinks` data remain unchanged.

**Tech Stack:** React 19, Framer Motion (new dep), GlassSurface (existing), Tailwind CSS v3

**Design doc:** `docs/plans/2026-03-04-navbar-redesign-design.md`

---

### Task 1: Install Framer Motion

**Files:**
- Modify: `package.json`

**Step 1: Install the dependency**

Run from the project root (`/Users/eshasherry/Repository/cute-portfolio`):
```bash
npm install framer-motion
```

**Step 2: Verify installation**

Run: `npm ls framer-motion`
Expected: Shows `framer-motion@<version>` in the tree.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion dependency for navbar redesign"
```

---

### Task 2: Rewrite Nav.css for floating pill + bottom sheet

**Files:**
- Modify: `src/components/Nav.css`

**Step 1: Replace Nav.css with new styles**

Replace the entire file with:

```css
/* ─── Hamburger (mobile only) ──────────────────── */
.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 101;
}

.nav__hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all 0.2s ease;
}

.nav__hamburger--open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.nav__hamburger--open span:nth-child(2) {
  opacity: 0;
}

.nav__hamburger--open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ─── Desktop nav links ─────────────────────────── */
.nav__links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ─── Mobile bottom sheet ────────────────────────── */
.nav__scrim {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
}

.nav__sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 2rem 1.5rem calc(2rem + env(safe-area-inset-bottom));
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  background: rgba(255, 248, 240, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 -8px 32px rgba(61, 44, 44, 0.12);
}

.nav__sheet-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__sheet-links a {
  display: block;
  position: relative;
  font-size: 1.125rem;
  font-weight: 500;
  padding: 0.875rem 1.25rem;
  border-radius: var(--radius-md);
  color: var(--color-text-light);
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav__sheet-links a.active {
  color: var(--color-text);
}

/* ─── Mobile breakpoint ──────────────────────────── */
@media (max-width: 768px) {
  .nav__hamburger {
    display: flex;
  }

  .nav__links {
    display: none;
  }
}

/* ─── Reduced motion ─────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .nav__hamburger span {
    transition: none;
  }
}
```

**Step 2: Verify the CSS file saved correctly**

Read the file to confirm. No runtime test needed yet (component isn't updated).

**Step 3: Commit**

```bash
git add src/components/Nav.css
git commit -m "style: rewrite Nav.css for floating pill and bottom sheet layout"
```

---

### Task 3: Rewrite Nav.tsx — Desktop floating pill with sliding indicator

**Files:**
- Modify: `src/components/Nav.tsx`

**Context for implementer:**
- `navLinks` from `portfolioData.ts` is an array of `{ label: string, href: string }` with 6 items
- `useActiveSection(sectionIds)` returns a string like `"about"` or `"projects"` matching the currently visible section
- `GlassSurface` takes `width`, `height`, `borderRadius`, `backgroundOpacity`, `distortionScale`, `className` props
- Current GlassSurface usage: `borderRadius={0}`, `backgroundOpacity={0.9}`, `distortionScale={-30}` — we change `borderRadius` to `999`
- Framer Motion `motion.div` with `layoutId` auto-animates position between renders
- The pill is `position: fixed`, centered with `left-1/2 -translate-x-1/2`, offset `top-4`

**Step 1: Rewrite Nav.tsx**

Replace the entire file with:

```tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/portfolioData';
import { useActiveSection } from '../hooks/useActiveSection';
import GlassSurface from './GlassSurface';
import './Nav.css';

const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

const springTransition = { type: 'spring' as const, stiffness: 350, damping: 30 };

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  const closeMenu = () => setMenuOpen(false);

  // Track scroll for shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Floating pill nav ─────────────────────── */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-shadow duration-300 ${
          scrolled ? 'shadow-lg' : ''
        }`}
        style={{ borderRadius: 999 }}
        aria-label="Main navigation"
      >
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={999}
          backgroundOpacity={0.9}
          distortionScale={-30}
          className="!absolute !inset-0 !bg-white/90"
        />
        <div className="relative z-10 flex items-center gap-1 px-3 py-1.5">
          {/* Logo */}
          <a
            href="#hero"
            className="text-xl font-bold text-text-main tracking-tight px-2 py-1 shrink-0"
            onClick={closeMenu}
          >
            ES<span className="text-accent">.</span>
          </a>

          {/* Desktop links */}
          <ul className="nav__links">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative py-1.5 px-3 rounded-pill text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-text-main'
                        : 'text-text-light hover:text-text-main'
                    }`}
                    onClick={closeMenu}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-pill bg-[rgba(255,176,136,0.2)]"
                        transition={springTransition}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ─── Mobile bottom sheet ───────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Scrim */}
            <motion.div
              className="nav__scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />
            {/* Sheet */}
            <motion.div
              className="nav__sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={springTransition}
            >
              <ul className="nav__sheet-links">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={isActive ? 'active' : ''}
                        onClick={closeMenu}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeNavSheet"
                            className="absolute inset-0 rounded-[var(--radius-md)] bg-[rgba(255,176,136,0.2)]"
                            transition={springTransition}
                          />
                        )}
                        <span className="relative z-10">{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

**Step 2: Verify the build compiles**

Run from root: `npm run build`
Expected: Successful build with no TypeScript or lint errors.

**Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: rewrite Nav as floating pill with Framer Motion sliding indicator"
```

---

### Task 4: Visual verification and polish

**Files:**
- Possibly tweak: `src/components/Nav.tsx`, `src/components/Nav.css`

**Step 1: Start dev server and verify desktop layout**

Run: `npm start`

Check:
- [ ] Pill floats centered at top of viewport with glass effect
- [ ] "ES." logo on the left, 6 links to the right
- [ ] Active section has warm peach pill background that slides between links on scroll
- [ ] Scroll shadow appears when scrolling down
- [ ] Hover on non-active links changes opacity/color

**Step 2: Verify mobile layout (resize to < 768px)**

Check:
- [ ] Pill shrinks to logo + hamburger
- [ ] Desktop links are hidden
- [ ] Tapping hamburger opens bottom sheet with smooth slide-up
- [ ] Dark scrim appears behind sheet
- [ ] Active link highlighted in sheet
- [ ] Tapping a link navigates and closes sheet
- [ ] Tapping scrim closes sheet
- [ ] Body scroll is locked when sheet is open

**Step 3: Verify accessibility**

Check:
- [ ] Tab through nav links — focus visible outline works
- [ ] Hamburger has proper aria-label and aria-expanded
- [ ] Enable "prefers-reduced-motion" in DevTools → animations should be instant

**Step 4: Fix any visual issues found**

Apply tweaks to `Nav.tsx` or `Nav.css` as needed. Common issues:
- GlassSurface pill may need explicit height/width adjustment
- Padding/gap may need fine-tuning for link density
- Bottom sheet handle/grabber if desired

**Step 5: Commit fixes**

```bash
git add src/components/Nav.tsx src/components/Nav.css
git commit -m "fix: polish navbar visual details after testing"
```

---

### Task 5: Adjust page layout for new nav

**Files:**
- Possibly modify: `src/components/HeroSection.tsx`, `src/index.css`

**Context:** The old nav was `sticky top-0` and `h-[var(--nav-height)]` (72px), so it occupied space in the document flow. The new nav is `fixed`, so it doesn't — meaning the hero section content may be hidden behind the floating pill.

**Step 1: Check if hero section needs top padding**

Open dev server, scroll to top. If the hero text is covered by or too close to the floating pill nav, add top padding.

Likely fix: Add `pt-20` (80px) to the `<main>` element or to HeroSection's container. The best place is the `<main>` tag in `src/App.tsx`:

```tsx
<main className="pt-20">
```

**Step 2: Remove old nav-height references if unused**

Check if `--nav-height: 72px` in `src/index.css` is still referenced anywhere. If not, it can be removed. If other components reference it, leave it.

**Step 3: Verify scrolling to sections still aligns correctly**

Click each nav link and verify the section scrolls into view without being hidden behind the floating pill. If sections have `scroll-margin-top` referencing nav height, update to account for floating pill + offset (~80px).

**Step 4: Commit**

```bash
git add -A
git commit -m "fix: adjust page layout for fixed-position floating nav"
```

---

### Task 6: Final build and verification

**Step 1: Run production build**

Run: `npm run build`
Expected: Successful build, no warnings about unused imports.

**Step 2: Serve production build locally**

Run: `npx serve -s build`

Check the same desktop and mobile items from Task 4 in the production build.

**Step 3: Final commit if any changes needed**

```bash
git add -A
git commit -m "chore: final navbar redesign polish"
```