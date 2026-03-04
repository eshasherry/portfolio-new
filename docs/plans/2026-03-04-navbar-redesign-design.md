# Navbar Redesign — Design Document

**Date:** 2026-03-04
**Branch:** `feat/portfolio-chatbot`

## Overview

Replace the current full-width sticky navbar with a floating centered pill navigation bar. The new design features a Framer Motion sliding pill indicator for active section highlighting, a GlassSurface glass effect, and a mobile bottom sheet menu.

## Desktop Layout

```
┌──────────────────────── viewport ────────────────────────┐
│                                                           │
│   ┌────────────────────────────────────────────────────┐  │
│   │ ES. │ About  Projects  Experience  Skills  Edu  Contact │
│   │     │          ▓▓▓▓▓▓▓▓▓                              │
│   └────────────────────────────────────────────────────┘  │
│                                                           │
│                      Page Content                         │
│                                                           │
```

- **Position:** `fixed`, centered horizontally (`left-1/2 -translate-x-1/2`), offset from top (`top-4`)
- **Shape:** Rounded pill (`rounded-pill` / `border-radius: 999px`)
- **Glass effect:** `GlassSurface` component with `borderRadius={999}`, `backgroundOpacity={0.9}`, `distortionScale={-30}` (same params as current nav)
- **Sizing:** Auto-width based on content, ~48px height, `px-2 py-1` internal padding
- **Logo:** "ES." on the left, separated from links by spacing (no explicit divider)
- **Links:** Horizontal row, `text-sm font-medium`, `px-3 py-1.5` each
- **Z-index:** `z-[100]`

## Active Section Indicator

- **Mechanism:** Framer Motion `<motion.div layoutId="activeNav" />` rendered as a child of the currently active link
- **Appearance:** Warm peach background (`bg-primary/20` → `rgba(255,176,136,0.2)`), pill-shaped, sits behind the link text
- **Animation:** Spring physics — `{ type: "spring", stiffness: 350, damping: 30 }`
- **Behavior:** Slides smoothly from one link to another as the user scrolls between sections

## Mobile Experience (< 768px)

### Closed State
```
┌──────────── viewport ────────────┐
│                                   │
│      ┌───────────────────┐       │
│      │   ES.    ☰        │       │
│      └───────────────────┘       │
│                                   │
│          Page Content             │
```

- Floating pill shrinks to logo + hamburger icon
- Same `GlassSurface` glass effect, same centered position
- Hamburger: 3-line icon → X animation when open

### Open State (Bottom Sheet)
```
┌──────────── viewport ────────────┐
│                                   │
│  ┌─────── dark scrim ─────────┐  │
│  │                             │  │
│  │  ┌───────────────────────┐  │  │
│  │  │       About           │  │  │
│  │  │       Projects        │  │  │
│  │  │       Experience      │  │  │
│  │  │       Skills          │  │  │
│  │  │       Education       │  │  │
│  │  │       Contact         │  │  │
│  │  └───────────────────────┘  │  │
│  └─────────────────────────────┘  │
```

- **Backdrop:** Semi-transparent scrim (`bg-black/30`), tap to dismiss
- **Sheet:** Slides up from bottom with Framer Motion `animate={{ y: 0 }}` from `initial={{ y: "100%" }}`
- **Sheet styling:** `GlassSurface` with rounded top corners, padded links as full-width rows
- **Active link:** Warm orange highlight, full-width row
- **Dismiss:** Tap scrim, tap X, or tap a link (navigates + closes)
- **Body scroll:** Locked when sheet is open (`overflow: hidden` on `<body>`)

## Animations & Interactions

### Desktop
- **Sliding pill:** Spring animation via Framer Motion `layoutId`
- **Hover:** Non-active links go `opacity-70 → opacity-100`, subtle `scale(1.02)`
- **Scroll shadow:** When `scrollY > 10`, add `shadow-lg` to the floating pill (smooth transition)

### Mobile
- **Sheet enter:** `AnimatePresence` + `motion.div` sliding from `y: "100%"` to `y: 0`, spring transition
- **Scrim enter:** `motion.div` fading `opacity: 0 → 0.3`
- **Sheet exit:** Reverse animations

### Accessibility
- `prefers-reduced-motion: reduce` — all animations become instant (no springs, no slides)
- Proper `aria-label`, `aria-expanded` on hamburger
- Focus management when sheet opens/closes

## Dependencies

- **Add:** `framer-motion` (~33KB gzipped) to root `package.json`

## Files Changed

| File | Action |
|------|--------|
| `src/components/Nav.tsx` | Full rewrite — floating pill layout, Framer Motion |
| `src/components/Nav.css` | Rewrite — new structure, bottom sheet, floating position |
| `package.json` | Add `framer-motion` dependency |

## Files Unchanged

| File | Reason |
|------|--------|
| `src/components/GlassSurface.tsx` | Reused as pill glass background |
| `src/hooks/useActiveSection.ts` | Still drives active section detection |
| `src/data/portfolioData.ts` | `navLinks` array unchanged |

## Key Technical Decisions

1. **Fixed positioning** (not sticky) — pill floats independently of document flow
2. **GlassSurface with `borderRadius={999}`** — reuses existing SVG displacement glass effect
3. **Framer Motion `layoutId`** — automatic position animation for active indicator
4. **`AnimatePresence`** — clean enter/exit for mobile bottom sheet
5. **No link changes** — all 6 nav links retained