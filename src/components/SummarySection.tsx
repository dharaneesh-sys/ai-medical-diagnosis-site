import { atLeastSum, nCr, nPr } from '../lib/combinatorics';
import { premises } from '../content/assignment';

const fmt = (n: number) => n.toLocaleString('en-US');

/** Results summary table (todo-12). Counts live-computed from the engines. */
export default function SummarySection() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-surface">
            <th className="border border-white/10 px-3 py-2">Unit</th>
            <th className="border border-white/10 px-3 py-2">Task</th>
            <th className="border border-white/10 px-3 py-2">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-white/10 px-3 py-2">I — Logic</td>
            <td className="border border-white/10 px-3 py-2">Translate rules, prove conclusion</td>
            <td className="border border-white/10 px-3 py-2 font-mono">
              {premises.p1.expr}, {premises.p2.expr} ⊢ {premises.conclusion.expr} — valid
            </td>
          </tr>
          <tr>
            <td className="border border-white/10 px-3 py-2">II — Combinatorics</td>
            <td className="border border-white/10 px-3 py-2">Count symptom selections</td>
            <td className="border border-white/10 px-3 py-2 font-mono">
              Exactly 5: {fmt(nCr(12, 5))} · At least 5: {fmt(atLeastSum(12, 5))} · Order matters:{' '}
              {fmt(nPr(12, 5))}
            </td>
          </tr>
          <tr>
            <td className="border border-white/10 px-3 py-2">III — Graphs</td>
            <td className="border border-white/10 px-3 py-2">Model + isomorphism</td>
            <td className="border border-white/10 px-3 py-2 font-mono">
              Bipartite graph; representations isomorphic via bijection f and A₂ = P A₁ P<sup>T</sup>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
