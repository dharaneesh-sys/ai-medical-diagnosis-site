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
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4">
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
          <div className="grid gap-6">
            <SymptomChecker />
            <CombinatoricsPanel />
            <IsoExplorer />
          </div>
        </Section>
        <Section id="report" title="Report">
          <SummarySection />
          <p className="mt-6">
            <a
              href="/GROUP4_AI_Medical_Diagnosis_Solutions.docx"
              download
              data-testid="report-download"
              className="inline-block rounded-lg bg-primary px-4 py-2 font-semibold text-[#06231c] transition-opacity hover:opacity-90"
            >
              Download full report (docx)
            </a>
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
