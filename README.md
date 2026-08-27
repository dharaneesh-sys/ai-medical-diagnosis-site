# GROUP 4 — AI-Based Medical Diagnosis

**Discrete Mathematics — Units I–III · 5–7 page mini R&D report as an interactive website**

Live URL (after Vercel deploy): `https://ai-medical-diagnosis-site.vercel.app` — will be updated here on deploy.

> Educational mathematics assignment — **not medical advice**.

## What it demonstrates

- **Unit I — Logic & Proofs:** propositional translation `(A ∧ B) → X`, `X → T ⊢ (A ∧ B) → T` via Hypothetical Syllogism + 16-row truth table (10 premises-true rows shaded).
- **Unit II — Combinatorics:** `C(12,5)=792`, `Σ_{k=5}^{12} C(12,k)=3,302`, `P(12,5)=95,040` live-computed from exact integer engines (no hardcoded result digits in UI).
- **Unit III — Graphs & Isomorphism:** bipartite model `G=(S∪D,E)` with 7 vertices / 6 edges, degree sequence `(3,2,2,2,1,1,1)` (handshake-lemma corrected — earlier prose had `3,2,2,1` typo), invariant table, bijection, biadjacency matrices `A₁/A₂` and certificate `A₂ = P·A₁·Pᵀ`.
- **Interactive demos:** symptom-checker (rule engine `(A∧B)→X→T` with vacuous-case explainer), live combination calculator (n/k sliders), isomorphism explorer (bipartite ↔ circular layout toggle with degree chips and `Isomorphic ✓` badge).
- Full report **docx** bundled at `/public/GROUP4_AI_Medical_Diagnosis_Solutions.docx` (84 KB, also downloadable from the site).

## R&D report structure (12 sections per faculty brief)

The site *is* the report — each section below maps to a page anchor:

1.  **Title** — hero `GROUP 4 — AI-Based Medical Diagnosis`
2.  **Problem Statement** — symptom-based triage needs provable decision logic at scale
3.  **Real-world Context** — AI diagnostic support / telemedicine
4.  **Mathematical Concept Used** — propositional logic, combinatorics, bipartite graphs
5.  **Mathematical Formulation** — propositions, `C(n,k)/P(n,k)/Σ`, `G=(S∪D,E)`
6.  **Analysis / Solution** — HS proof steps, exact counts, degree/bijection analysis
7.  **Diagram / Graph / Truth Table / Algorithm** — 16-row table, both SVG figures, invariant/bijection/matrix tables
8.  **Interpretation of Results** — validity on all 10 satisfying worlds; counts mean system must handle 3.3k symptom-sets, order multiplies by 120; layout-invariant isomorphism
9.  **Practical Application** — the three demos as a deployable triage assistant
10. **Innovation / Proposed Improvement** — weighted edges, larger DB, ML ranking, explanation traces (demo prototypes)
11. **Conclusion**
12. **References**

Additional challenge answer is embedded in §10.

## Local development

```bash
cd ai-medical-diagnosis-site
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build (strict)
npm run preview  # http://localhost:4173 (serves dist)
npm test         # vitest run — 46 tests (truth-table, combinatorics, rule-engine, graph-model, figure/component specs)
npm run test:e2e # playwright — 7 smoke + 6 a11y/responsive (axe 0 critical, no horizontal scroll at 320/375/768/1440)
```

Requires **Node ≥ 20.19**, **npm ≥ 10**.

## Tech stack

Vite 8 · React 19 · TypeScript (strict, `verbatimModuleSyntax`) · Tailwind v4 via `@tailwindcss/vite` + `@theme` tokens (`#0a1816` / `#152a26` / `#7ad9a8` / `#e8f5ef` / `#9db8ae`) · Vitest (jsdom, `passWithNoTests`) · Playwright + `@axe-core/playwright` · no chart/graph libs (hand-rolled SVG).

## Project structure

```
src/
  content/assignment.ts      # single-source prose + truthTable() generator
  lib/combinatorics.ts       # nCr / nPr / atLeastSum (exact)
  lib/ruleEngine.ts          # (A∧B)→X→T forward chain + trace
  lib/graphModel.ts          # canonical graph facts, degrees, layouts, similarity check
  components/figures/        # GraphSvgBase + BipartiteFigure + CircularFigure (inline SVG)
  components/demo/           # SymptomChecker, CombinatoricsPanel, IsoExplorer
  components/{Nav,Footer,Hero,SummarySection,UnitOne,UnitTwo,UnitThree}.tsx
e2e/{smoke,a11y}.spec.ts
public/GROUP4_AI_Medical_Diagnosis_Solutions.docx
```

## Verification

- `npm run build` + `npx tsc --noEmit` clean
- `npm test` green (includes 792/3302/95040 + truth-table + `isPermutationSimilar` assertions)
- `npx playwright test` green locally and (after deploy) against `PLAYWRIGHT_BASE_URL=<prod>`
- `axe` critical violations = 0; tap targets ≥ 44px; keyboard walkthrough of checker flow passes

## Disclaimer

This repository is an educational mathematics artifact. Nothing here constitutes medical advice or a diagnostic recommendation.
