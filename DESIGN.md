# AI Medical Diagnosis — Design System

## 0. Research Log

- Embedded refs: shortlisted [linear.app, stripe, notion] → picked **minimalist-skill + notion** because the R&D report needs editorial clarity, dense data tables, and a calm clinical voice over glossy SaaS chrome; stripe's vibrant accents would compete with the graph's spring motion, linear's precision is too cold for faculty assessment.
- Lazyweb: 3 queries (`medical research dashboard`, `clinical trial report`, `healthcare analytics bento`) — **14 screens viewed** → layout grammar harvested: asymmetric split hero (text 48% / visual 52% with generous left whitespace), bento for heterogeneous demos (mixed cell sizes, not 3-equal), vertical stack for truth tables, sticky section labels for long reports, tonal-shift surface hierarchy without card shadows.
- Imagen drafts: 2 drafts seeded with Clinical Paper tokens (paper #FEFCFB / ink #0A1128 / cyan #1282A2) — draft A (light paper, editorial grid) picked over draft B (dark lab, too much depth) as the reference-fidelity contract because faculty prints light. **Picked: draft A.** Paths: `.omo/evidence/imagen/clinical-paper-a.png`, `.omo/evidence/imagen/clinical-paper-b.png`.
- ui-ux-db: `python3 references/ui-ux-db/scripts/search.py "medical research" --domain color` → palette `Surgical Precision` (GEC Healthcare) validated for AA contrast (primary #1282A2 on paper #FEFCFB = 4.6:1 large text).
- Skipped lanes: none — all three research lanes ran; no network/tool failure.

## 1. Atmosphere & Identity

A quiet lab notebook left open on a bench. Not a marketing site, not a dashboard — a **clinical editorial** that happens to be interactive. The signature is **paper honesty**: off-white paper that feels printable, ink that feels typeset, and a single cyan accent that carries all interactivity (graph edges, focus rings, active chips, the `Isomorphic ✓` badge). Motion is the second signature: the knowledge graph breathes — edges draw in sequence like a pen tracing, nodes pop with a soft spring, and the layout morph is a physical spring, not a cross-fade. A visitor remembers the graph's inhale.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/primary | --color-bg | #FEFCFB | #0A1128 | Main background (paper / ink) |
| Surface/secondary | --color-surface | #E8EEF7 | #161B2C | Cards, panels, table headers |
| Surface/graph-symptom | --color-graph-symptom | #1282A2 | #78BCBA | Symptom nodes |
| Surface/graph-disease | --color-graph-disease | #034078 | #D4DAE5 | Disease nodes |
| Text/primary | --color-text | #0A1128 | #FEFCFB | Headlines, body |
| Text/secondary | --color-muted | #3C4C68 | #6D7F9F | Captions, table meta, nav muted |
| Border/default | --border-default | #D4DAE5 | #1E2A3A | Dividers, card outlines |
| Border/subtle | --border-subtle | #E8EEF7 | #1E2A3A | Soft separations |
| Accent/primary | --color-primary | #1282A2 | #78BCBA | CTAs, links, focus, active graph edges, selection |
| Status/success | --status-success | #15803D | #22C55E | Verdict badge, passing checks |
| Status/error | --status-error | #B91C1C | #EF4444 | RangeError banner |

### Rules

- Surface hierarchy is tonal-shift, not shadow: paper → surface tint, no drop shadows on light, subtle inner border on dark.
- Accent is used **only** for interactive or active states. Never decorative washes.
- Never introduce a color not in this table. Extend the table first.
- Graph colors are CSS variables so they flip with the theme; never hard-code hex in SVG fill.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | 48px / 3rem | 700 | 1.05 | -0.025em | Hero title (max 2 lines) |
| H1 | 32px / 2rem | 700 | 1.15 | -0.02em | Section titles |
| H2 | 24px / 1.5rem | 600 | 1.3 | -0.01em | Subsection titles |
| H3 | 18px / 1.125rem | 600 | 1.4 | 0 | Card titles, demo headers |
| Body/lg | 18px / 1.125rem | 400 | 1.65 | 0 | Lead paragraphs, hero subtext |
| Body | 16px / 1rem | 400 | 1.6 | 0 | Default text |
| Body/sm | 14px / 0.875rem | 400 | 1.55 | 0 | Table cells, secondary info |
| Caption | 12px / 0.75rem | 500 | 1.4 | 0.02em | Labels, metadata, figcaptions |
| Overline | 11px / 0.6875rem | 600 | 1.3 | 0.08em | Section kickers, uppercase |

### Font Stack

- Primary: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` (no Inter default)
- Mono: `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` (numbers, formulas, matrices)
- Serif: none (serif is banned for this clinical editorial; see taste-skill discipline)

### Rules

- Max 2 families. Body never below 14px.
- Headings that wrap to 4+ lines are too large — use clamp().
- Italic is used only for captions and `Hypothetical Syllogism` method name; when an italic word contains a descender (`y g j p q`), use `leading-[1.1]` + `pb-1` reserve.

## 4. Spacing & Layout

### Base Unit

All spacing derives from **4px**.

| Token | Value | Usage |
|-------|-------|-------|
| --space-1 | 4px | Tight: icon-to-label |
| --space-2 | 8px | Compact: list items, inline groups |
| --space-3 | 12px | Default: form padding |
| --space-4 | 16px | Standard: card padding |
| --space-6 | 24px | Generous: card padding (default) |
| --space-8 | 32px | Between card groups |
| --space-10 | 40px | Sections within a page |
| --space-12 | 48px | Major section breaks |
| --space-16 | 64px | Page-level vertical rhythm |
| --space-20 | 80px | Hero spacing |

### Grid

- Max content width: **1120px** (`max-w-6xl`)
- Column system: **12-column, 24px gutter, 16px margin at mobile**
- Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1536

### Rules

- Asymmetric spacing is intentional: hero has 20vw left whitespace on desktop, sections use `scroll-mt-20` for sticky nav offset.
- Content blocks are assigned a job (hook, prove, compare) and ordered by the reader's decision path, not symmetry.

## 5. Components

### Button
- **Structure:** `<button class="rounded-lg border px-4 py-2.5 text-sm font-semibold">`
- **Variants:** primary (`bg-primary text-bg`), ghost (`border-white/20 hover:border-primary`), chip (`rounded-full border`)
- **Spacing:** `gap-2` for label+icon, `min-h-11` (44px) tap target
- **States:** default, hover (border → primary), active (`scale-[0.98] -translate-y-[1px]`), focus (2px primary ring), disabled (opacity 50%)
- **Accessibility:** keyboard, `aria-pressed` for toggles, contrast ≥4.5:1
- **Motion:** `transition-colors duration-200` + `transform` only
- **Layout:** cluster

### Card
- **Structure:** `<div class="rounded-lg border border-white/10 bg-surface p-5">`
- **Variants:** default, highlighted (border-primary/40)
- **Spacing:** `p-5` (20px), `gap-4` inside
- **States:** default, hover (border → subtle), active
- **Accessibility:** heading hierarchy, contrast
- **Motion:** border-color transition only
- **Layout:** grid / stack

### Table
- **Structure:** `<div class="overflow-x-auto"><table class="w-full border-collapse">`
- **Variants:** default, truth-table (shaded rows `.row-premises-true`)
- **Spacing:** `px-3 py-2` cells, `gap-0` (borders collapse)
- **States:** default, row hover (primary 6% tint)
- **Accessibility:** `thead`/`th` scope, caption
- **Motion:** none (static data)
- **Layout:** stack

### GraphSvgBase (animatic)
- **Structure:** `<svg viewBox="0 0 1000 640">` → `motion.line` edges + `motion.g` nodes (`motion.circle` + `<text>`)
- **Variants:** bipartite layout, circular layout; highlight prop emphasises incident edges (strokeWidth 6, primary)
- **Spacing:** `max-w-full h-auto`, `viewBox` 1000×640, nodes r=30
- **States:** default, highlighted edge, selected node, hover (scale 1.07), tap (0.96)
- **Accessibility:** `role="img"` + `aria-label`, `data-vertex` for testing, keyboard not required (explorer provides button toggle)
- **Motion:** edges staggered `opacity 0→1` (delay i*0.07) + spring `x1/y1/x2/y2`; nodes spring pop (`stiffness 340/damping 22`, delay 0.12+i*0.04); layout morph spring on `cx/cy/x1/y1`; all collapse under `prefers-reduced-motion`
- **Layout:** grid (bento cell or standalone)

### Nav
- **Structure:** `<header class="sticky top-0 z-40 border-b border-white/10 bg-bg/90 backdrop-blur"><nav>`
- **Spacing:** `max-w-6xl mx-auto px-4 py-3`, `gap-4`
- **States:** default, hover (bg-surface), active (text-primary), focus
- **Accessibility:** `aria-label="Primary"`, single-line at desktop, hamburger not needed (6 links fit at lg)
- **Motion:** none (static)
- **Layout:** cluster, height 64-72px

### Footer
- **Structure:** `<footer class="border-t border-white/10 px-4 py-6 text-center">`
- **States:** static
- **Accessibility:** disclaimer text, contrast
- **Motion:** none

### Section
- **Structure:** `<section id class="scroll-mt-20 py-10">` + optional kicker (`text-[11px] uppercase tracking-[0.08em]`)
- **States:** static
- **Motion:** `whileInView` stagger for child blocks (once, amount 0.3, delay i*0.06, ease [0.16,1,0.3,1])
- **Layout:** stack, max-w-6xl

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 100-150ms | ease-out | Button press, toggle |
| Standard | 200-300ms | ease-in-out | Panel open, tab switch |
| Emphasis | 400-600ms | cubic-bezier(0.16, 1, 0.3, 1) | Hero entry, graph draw |
| Spring | spring | stiffness 260-340 / damping 20-32 | Graph nodes/edges, layout morph |
| Scroll-driven | tied to scroll | linear | Not used (no scroll-hijack) |

### Rules

- Only `transform` and `opacity`. Never layout properties.
- Every interactive element has hover + active + focus.
- Reduced motion: respect `prefers-reduced-motion` — disable all spring/delay, collapse to instant.
- Motion is motivated: edges draw = story of knowledge flow, nodes pop = hierarchy, toggle morph = state change.

## 7. Depth & Surface

### Strategy

Tonal-shift (chosen for clinical paper). Paper `#FEFCFB` → surface `#E8EEF7` tint. No shadows on light; subtle inner border on dark. Graph circles have `stroke="var(--color-bg)"` for separation, not shadow.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.1 AA: contrast 4.5:1 body / 3:1 large text, visible focus on every interactive element, full keyboard reachability, `prefers-reduced-motion` respected (Section 6).
- Tap targets ≥44px (min-h-11) for all buttons.
- No horizontal scroll at 320/375/768/1440 (tables inside `overflow-x-auto`, main `overflow-x-hidden`).

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|------|----------|--------------|--------------|
| No dedicated dark-mode toggle UI | `src/index.css` | Respects `prefers-color-scheme` per spec; toggle would add UI debt without faculty ask | Sisyphus / add toggle if faculty requests explicit switch |
| Graph uses CSS variables for fill | `graphModel.ts` | Needed for theme flip; not a standard hex but supported in modern browsers | Sisyphus / fallback to hex if legacy browser required |
