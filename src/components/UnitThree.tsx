import { EDGES, VERTICES, biadjacency, degreeSequence } from '../lib/graphModel';
import BipartiteFigure from './figures/BipartiteFigure';
import CircularFigure from './figures/CircularFigure';

const LABEL: Record<string, string> = Object.fromEntries(VERTICES.map((v) => [v.id, v.label]));
const SYMS = ['S1', 'S2', 'S3', 'S4'] as const;
const DIS = ['D1', 'D2', 'D3'] as const;

const A1 = biadjacency([...SYMS], [...DIS]);
const A2 = biadjacency([...SYMS].reverse(), [...DIS].reverse());
const SEQ = degreeSequence().join(', ');

/** Unit III — Graphs & Isomorphism (todo-10). Facts from graphModel; prose from assignment. */
export default function UnitThree() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 text-lg font-semibold text-primary">Why the model is bipartite</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>V splits into two disjoint sets: symptoms S and diseases D.</li>
          <li>An edge (s, d) exists iff symptom s is indicative of disease d.</li>
          <li>No edges inside S or inside D — exactly the bipartite property.</li>
          <li>Patients extend this to a 3-partite network: diagnosis = disease-vertices at distance 2 through shared symptoms.</li>
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-primary">Worked example network</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-surface">
                <th className="border border-white/10 px-3 py-2">#</th>
                <th className="border border-white/10 px-3 py-2">Edge</th>
                <th className="border border-white/10 px-3 py-2">Clinical meaning</th>
              </tr>
            </thead>
            <tbody>
              {EDGES.map(([a, b, meaning], i) => (
                <tr key={`${a}-${b}`}>
                  <td className="border border-white/10 px-3 py-2">{i + 1}</td>
                  <td className="border border-white/10 px-3 py-2 font-mono">{LABEL[a]} — {LABEL[b]}</td>
                  <td className="border border-white/10 px-3 py-2">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <figure className="space-y-2">
          <BipartiteFigure />
          <figcaption className="text-center text-xs italic text-muted">
            Representation 1 — bipartite layout (symptoms left, diseases right)
          </figcaption>
        </figure>
        <figure className="space-y-2">
          <CircularFigure />
          <figcaption className="text-center text-xs italic text-muted">
            Representation 2 — the SAME network, circular scrambled layout
          </figcaption>
        </figure>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-primary">Isomorphism analysis</h3>
        <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-surface">
              <th className="border border-white/10 px-3 py-2">Invariant</th>
              <th className="border border-white/10 px-3 py-2">Rep. 1</th>
              <th className="border border-white/10 px-3 py-2">Rep. 2</th>
              <th className="border border-white/10 px-3 py-2">Match</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-white/10 px-3 py-2">Vertices |V|</td><td className="border border-white/10 px-3 py-2">7</td><td className="border border-white/10 px-3 py-2">7</td><td className="border border-white/10 px-3 py-2">✓</td></tr>
            <tr><td className="border border-white/10 px-3 py-2">Edges |E|</td><td className="border border-white/10 px-3 py-2">6</td><td className="border border-white/10 px-3 py-2">6</td><td className="border border-white/10 px-3 py-2">✓</td></tr>
            <tr><td className="border border-white/10 px-3 py-2">Degree sequence</td><td className="border border-white/10 px-3 py-2">({SEQ})</td><td className="border border-white/10 px-3 py-2">({SEQ})</td><td className="border border-white/10 px-3 py-2">✓</td></tr>
            <tr><td className="border border-white/10 px-3 py-2">Bipartite</td><td className="border border-white/10 px-3 py-2">yes</td><td className="border border-white/10 px-3 py-2">yes</td><td className="border border-white/10 px-3 py-2">✓</td></tr>
          </tbody>
        </table>
        </div>
        <p className="mt-2 text-sm text-muted">Degrees: S₁=2, S₂=1, S₃=1, S₄=2, D₁=3, D₂=2, D₃=1.</p>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-primary">Edge-preserving bijection f</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-surface">
                <th className="border border-white/10 px-3 py-2">Edge in G₁</th>
                <th className="border border-white/10 px-3 py-2">Image under f</th>
                <th className="border border-white/10 px-3 py-2">Edge in G₂?</th>
              </tr>
            </thead>
            <tbody>
              {EDGES.map(([a, b]) => (
                <tr key={`${a}-${b}`}>
                  <td className="border border-white/10 px-3 py-2 font-mono">{LABEL[a]}{LABEL[b]}</td>
                  <td className="border border-white/10 px-3 py-2 font-mono">{LABEL[a]}′{LABEL[b]}′</td>
                  <td className="border border-white/10 px-3 py-2">✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <MatrixBlock caption="Biadjacency matrix A₁ (order S₁…S₄ | D₁…D₃)" matrix={A1} cols={DIS} rows={SYMS} />
        <MatrixBlock caption="Same facts, reordered (S₄…S₁ | D₃…D₁)" matrix={A2} cols={[...DIS].reverse()} rows={[...SYMS].reverse()} />
      </section>

      <p className="rounded-lg border border-primary/40 bg-surface p-4 text-center font-mono">
        A₂ = P A₁ P<sup>T</sup> — permutation-similarity is the algebraic certificate of isomorphism.
      </p>
    </div>
  );
}

function MatrixBlock({ caption, matrix, cols, rows }: { caption: string; matrix: number[][]; cols: readonly string[]; rows: readonly string[] }) {
  return (
    <figure>
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse text-center text-sm">
          <caption className="mb-2 text-xs italic text-muted">{caption}</caption>
          <thead>
            <tr>
              <th className="border border-white/10 px-3 py-1"></th>
              {cols.map((d) => (
                <th key={d} className="border border-white/10 px-3 py-1">{LABEL[d]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                <th className="border border-white/10 px-3 py-1">{LABEL[rows[i]]}</th>
                {row.map((v, j) => (
                  <td key={j} className="border border-white/10 px-3 py-1 font-mono">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
