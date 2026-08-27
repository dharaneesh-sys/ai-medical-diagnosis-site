import { useState } from 'react';
import {
  EDGES,
  VERTICES,
  biadjacency,
  bipartiteLayout,
  circularLayout,
  degrees,
  degreeSequence,
  isPermutationSimilar,
  type VertexId,
} from '../../lib/graphModel';
import GraphSvgBase from '../figures/GraphSvgBase';

const A1 = biadjacency(['S1', 'S2', 'S3', 'S4'], ['D1', 'D2', 'D3']);
const A2 = biadjacency(['S4', 'S3', 'S2', 'S1'], ['D3', 'D2', 'D1']);
const ISO = isPermutationSimilar(A1, A2, [3, 2, 1, 0], [2, 1, 0]);
const DEG = degrees();
const LABEL: Record<string, string> = Object.fromEntries(VERTICES.map((v) => [v.id, v.label]));

/**
 * Isomorphism explorer (todo-15): one network, two layouts, live certificate.
 * Clicking a vertex highlights its incident edges and shows its degree.
 */
export default function IsoExplorer() {
  const [circular, setCircular] = useState(false);
  const [selected, setSelected] = useState<VertexId | null>(null);
  const points = circular ? circularLayout() : bipartiteLayout();

  return (
    <div data-testid="iso-explorer" className="space-y-4 rounded-lg border border-white/10 bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold text-primary">Isomorphism explorer</h3>
        <button
          type="button"
          aria-pressed={circular}
          data-testid="layout-toggle"
          onClick={() => setCircular((c) => !c)}
          className="rounded-lg border border-white/20 px-4 py-2.5 min-h-11 text-sm transition-colors hover:border-primary hover:text-primary"
        >
          {circular ? 'Show bipartite layout' : 'Show circular layout'}
        </button>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[3fr_2fr]">
        <div className="min-w-0 overflow-x-auto">
          <GraphSvgBase
            points={points}
            ariaLabel={`Diagnostic network drawn in ${circular ? 'circular' : 'bipartite'} layout`}
            highlight={selected}
            width={520}
            onNodeSelect={(id) => setSelected((cur) => (cur === id ? null : (id as VertexId)))}
          />
          <p className="mt-1 text-xs text-muted">
            Layout changes only coordinates — connectivity is identical. Click a vertex to inspect it.
          </p>
        </div>

        <aside className="space-y-3 text-sm">
          <div className="rounded border border-white/10 p-3">
            <div className="text-xs uppercase tracking-wide text-muted">Degree sequence (both layouts)</div>
            <div className="font-mono">({degreeSequence().join(', ')})</div>
            {selected && (
              <div className="mt-1" data-testid="degree-chip">
                {LABEL[selected]}: degree {DEG[selected]}
              </div>
            )}
          </div>

          <div className="rounded border border-white/10 p-3">
            <div className="mb-1 text-xs uppercase tracking-wide text-muted">Bijection f</div>
            <ul className="space-y-0.5 font-mono text-xs">
              {EDGES.map(([a, b]) => (
                <li key={`${a}-${b}`}>
                  {LABEL[a]}
                  {LABEL[b]} → {LABEL[a]}′{LABEL[b]}′
                </li>
              ))}
            </ul>
          </div>

          {ISO && (
            <p data-testid="iso-badge" className="rounded border border-primary/40 bg-primary/10 px-3 py-2 text-center font-semibold text-primary">
              Isomorphic ✓ (A₂ = P A₁ P<sup>T</sup>)
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
