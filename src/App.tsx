import type { ReactNode } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import UnitOne from './components/UnitOne';
import UnitTwo from './components/UnitTwo';
import UnitThree from './components/UnitThree';
import Hero from './components/Hero';
import SummarySection from './components/SummarySection';
import SymptomChecker from './components/demo/SymptomChecker';
import CombinatoricsPanel from './components/demo/CombinatoricsPanel';
import IsoExplorer from './components/demo/IsoExplorer';
import Showcase from './components/showcase/Showcase';

function Section({ id, kicker, title, children }: { id: string; kicker?: string; title?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 py-10">
      {kicker && <p className="text-xs uppercase tracking-wide text-muted">{kicker}</p>}
      {title && <h2 className="mb-6 text-2xl font-bold">{title}</h2>}
      {children}
    </section>
  );
}

export default function App() {
  if (typeof window !== 'undefined' && window.location.pathname === '/showcase') {
    return <Showcase />;
  }
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 overflow-x-hidden">
        <Section id="overview" kicker="Discrete Mathematics · Units I–III">
          <Hero />
        </Section>
        <Section id="unit-1" kicker="Hypothetical Syllogism" title="Unit I — Logic and Proofs">
          <UnitOne />
        </Section>
        <Section id="unit-2" kicker="Combinations & Permutations" title="Unit II — Combinatorics">
          <UnitTwo />
        </Section>
        <Section id="unit-3" kicker="Bipartite graphs" title="Unit III — Graphs & Isomorphism">
          <UnitThree />
        </Section>
        <Section id="demo" kicker="Interactive" title="Live Demo">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-12">
              <SymptomChecker />
            </div>
            <div className="md:col-span-5">
              <CombinatoricsPanel />
            </div>
            <div className="md:col-span-7">
              <IsoExplorer />
            </div>
          </div>
        </Section>
        <Section id="report" title="Reports — Download">
          <SummarySection />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-primary/30 bg-surface p-4 lg:col-span-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Complete Volume — All 3 Units</h3>
                  <p className="mt-1 text-xs text-muted">36 sections (12 per unit) — the full file containing all three reports back-to-back</p>
                </div>
                <div className="flex gap-2">
                  <a href="/GROUP4_Full_Volume_3in1.docx" download data-testid="report-fullvolume-docx" className="rounded bg-primary px-3 py-1.5 text-xs font-semibold text-[var(--color-bg)]">DOCX</a>
                  <a href="/GROUP4_Full_Volume_3in1.pdf" download data-testid="report-fullvolume-pdf" className="rounded border border-white/20 px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary">PDF</a>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface p-4">
              <h3 className="font-semibold">Full R&D Report — Integrated</h3>
              <p className="mt-1 text-xs text-muted">12 sections, 5–7 pages — synthesis of all units</p>
              <div className="mt-3 flex gap-2">
                <a href="/GROUP4_RnD_Report.docx" download data-testid="report-full-docx" className="rounded bg-primary px-3 py-1.5 text-xs font-semibold text-[var(--color-bg)]">DOCX</a>
                <a href="/GROUP4_RnD_Report.pdf" download data-testid="report-full-pdf" className="rounded border border-white/20 px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary">PDF</a>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface p-4">
              <h3 className="font-semibold">Unit I — Logic</h3>
              <p className="mt-1 text-xs text-muted">12 sections — proof & truth table</p>
              <div className="mt-3 flex gap-2">
                <a href="/GROUP4_Unit1_Logic_Report.docx" download data-testid="report-unit1-docx" className="rounded bg-primary px-3 py-1.5 text-xs font-semibold text-[var(--color-bg)]">DOCX</a>
                <a href="/GROUP4_Unit1_Logic_Report.pdf" download data-testid="report-unit1-pdf" className="rounded border border-white/20 px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary">PDF</a>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface p-4">
              <h3 className="font-semibold">Unit II — Combinatorics</h3>
              <p className="mt-1 text-xs text-muted">12 sections — counts & formulas</p>
              <div className="mt-3 flex gap-2">
                <a href="/GROUP4_Unit2_Combinatorics_Report.docx" download data-testid="report-unit2-docx" className="rounded bg-primary px-3 py-1.5 text-xs font-semibold text-[var(--color-bg)]">DOCX</a>
                <a href="/GROUP4_Unit2_Combinatorics_Report.pdf" download data-testid="report-unit2-pdf" className="rounded border border-white/20 px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary">PDF</a>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface p-4">
              <h3 className="font-semibold">Unit III — Graphs</h3>
              <p className="mt-1 text-xs text-muted">12 sections — bipartite & isomorphism</p>
              <div className="mt-3 flex gap-2">
                <a href="/GROUP4_Unit3_Graphs_Report.docx" download data-testid="report-unit3-docx" className="rounded bg-primary px-3 py-1.5 text-xs font-semibold text-[var(--color-bg)]">DOCX</a>
                <a href="/GROUP4_Unit3_Graphs_Report.pdf" download data-testid="report-unit3-pdf" className="rounded border border-white/20 px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary">PDF</a>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-muted">
            Legacy alias also at <a href="/GROUP4_AI_Medical_Diagnosis_Solutions.docx" download data-testid="report-download" className="underline hover:text-primary">GROUP4_AI_Medical_Diagnosis_Solutions.docx</a>
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
