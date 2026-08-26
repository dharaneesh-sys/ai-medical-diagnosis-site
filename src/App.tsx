import type { ReactNode } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import UnitOne from './components/UnitOne';
import UnitTwo from './components/UnitTwo';
import UnitThree from './components/UnitThree';

function Section({ id, kicker, title, children }: { id: string; kicker?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 py-10">
      {kicker && <p className="text-xs uppercase tracking-wide text-muted">{kicker}</p>}
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4">
        <Section id="overview" kicker="Discrete Mathematics · Units I–III" title="AI-Based Medical Diagnosis">
          <p className="max-w-3xl">
            How propositional logic, combinatorics and graph theory power a symptom-based diagnosis
            assistant — proved in Unit I, counted in Unit II and mapped in Unit III, then made runnable
            in the Live Demo.
          </p>
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
          <p className="text-muted">Symptom checker, combinatorics calculator and isomorphism explorer arrive with Wave 4.</p>
        </Section>
        <Section id="report" title="Report">
          <p className="text-muted">The downloadable report (docx) will be linked here.</p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
