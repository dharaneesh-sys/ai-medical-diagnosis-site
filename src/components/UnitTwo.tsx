import { atLeastSum, factorial, nCr, nPr } from '../lib/combinatorics';
import { combinatoricsCases, investigationTakeaway } from '../content/assignment';

const fmt = (n: number) => n.toLocaleString('en-US');

const COUNTS = {
  exactlyFive: () => nCr(12, 5),
  atLeastFive: () => atLeastSum(12, 5),
  orderedFive: () => nPr(12, 5),
} as const;

/** Unit II — Combinatorics (todo-9). Counts are LIVE engine calls, never literals. */
export default function UnitTwo() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        {combinatoricsCases.map((c) => (
          <div key={c.key} className="rounded-lg border border-white/10 bg-surface p-4">
            <div className="mb-1 text-xs uppercase tracking-wide text-muted">{c.title}</div>
            <div className="font-mono text-sm">{c.formula}</div>
            <output
              data-testid={`count-${c.key}`}
              className="mt-3 block text-3xl font-bold text-primary"
            >
              {fmt(COUNTS[c.key]())}
            </output>
            <div className="mt-2 text-sm text-muted">{c.interpretation}</div>
          </div>
        ))}
      </section>

      <p className="text-sm text-muted" data-testid="consistency-line">
        Consistency check: P(12, 5) = {fmt(nPr(12, 5))} = C(12, 5) × 5! = {nCr(12, 5)} × {factorial(5)} ✓
        — each unordered set of 5 can be arranged in 5! orders.
      </p>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-primary">Investigation summary</h3>
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-surface">
              <th className="border border-white/10 px-3 py-2">Case</th>
              <th className="border border-white/10 px-3 py-2">Formula</th>
              <th className="border border-white/10 px-3 py-2">Count</th>
              <th className="border border-white/10 px-3 py-2">Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {combinatoricsCases.map((c) => (
              <tr key={c.key}>
                <td className="border border-white/10 px-3 py-2">{c.title}</td>
                <td className="border border-white/10 px-3 py-2 font-mono">{c.formula}</td>
                <td className="border border-white/10 px-3 py-2 font-bold text-primary">{fmt(COUNTS[c.key]())}</td>
                <td className="border border-white/10 px-3 py-2">{c.interpretation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-sm italic text-muted">{investigationTakeaway}</p>
      </section>
    </div>
  );
}
