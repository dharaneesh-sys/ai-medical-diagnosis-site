import { useState } from 'react';
import { atLeastSum, nCr, nPr } from '../../lib/combinatorics';

const fmt = (n: number) => n.toLocaleString('en-US');

interface CardProps {
  testid: string;
  label: string;
  value: number;
}

function Card({ testid, label, value }: CardProps) {
  return (
    <div className="rounded border border-white/10 p-3 text-center">
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <output data-testid={testid} className="mt-1 block text-2xl font-bold text-primary">
        {fmt(value)}
      </output>
    </div>
  );
}

/**
 * Live combinatorics calculator (todo-14). Defaults n=12, k=5 reproduce the
 * assignment answers; engine RangeErrors surface inline.
 */
export default function CombinatoricsPanel() {
  const [n, setN] = useState(12);
  const [k, setK] = useState(5);

  let error: string | null = null;
  let exactly = 0;
  let atLeast = 0;
  let ordered = 0;
  try {
    exactly = nCr(n, k);
    atLeast = atLeastSum(n, k);
    ordered = nPr(n, k);
  } catch (e) {
    error = e instanceof RangeError ? e.message : 'Invalid input';
  }

  const numCls = 'w-24 rounded border border-white/20 bg-transparent px-2 py-1 font-mono';

  return (
    <div data-testid="combinatorics-panel" className="space-y-4 rounded-lg border border-white/10 bg-surface p-5">
      <h3 className="font-semibold text-primary">Combination calculator</h3>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          n (database symptoms)
          <input
            type="number"
            min={0}
            max={16}
            value={n}
            data-testid="input-n"
            onChange={(e) => setN(Math.max(0, Math.min(16, Number(e.target.value) || 0)))}
            className={numCls}
          />
        </label>
        <label className="flex items-center gap-2">
          k (used by the system)
          <input
            type="number"
            min={0}
            value={k}
            data-testid="input-k"
            onChange={(e) => setK(Number(e.target.value) || 0)}
            className={numCls}
          />
        </label>
      </div>

      {error !== null ? (
        <p data-testid="calc-error" role="alert" className="rounded border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-3">
          <Card testid="count-exactly" label="Exactly k — C(n, k)" value={exactly} />
          <Card testid="count-atLeast" label="At least k — Σ C(n, i)" value={atLeast} />
          <Card testid="count-ordered" label="Ordered — P(n, k)" value={ordered} />
        </div>
      )}
    </div>
  );
}
