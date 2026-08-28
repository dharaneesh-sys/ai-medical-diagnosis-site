import { premises, proofSteps, propositionalVariables, truthTable } from '../content/assignment';

const BOOL = (v: boolean) => (v ? 'T' : 'F');

/** Unit I — Logic and Proofs (todo-8). All data from the single-source module. */
export default function UnitOne() {
  const rows = truthTable();
  return (
    <div className="space-y-8">
      <p>
        The diagnosis assistant reasons over four propositions. We translate the system rules into
        propositional logic and prove the conclusion{" "}
        <strong>{premises.conclusion.expr}</strong> by Hypothetical Syllogism.
      </p>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-primary">Propositional variables</h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-surface">
              <th className="border border-white/10 px-3 py-2">Symbol</th>
              <th className="border border-white/10 px-3 py-2">Statement</th>
            </tr>
          </thead>
          <tbody>
            {propositionalVariables.map((v) => (
              <tr key={v.symbol}>
                <td className="border border-white/10 px-3 py-2 font-mono">{v.symbol}</td>
                <td className="border border-white/10 px-3 py-2">{v.statement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {[premises.p1, premises.p2, premises.conclusion].map((item, i) => {
          const isConclusion = i === 2;
          return (
            <div
              key={item.expr}
              className={`rounded-lg border p-4 ${isConclusion ? 'md:col-span-2 border-primary/40 bg-surface' : 'border-white/10 bg-surface'}`}
            >
            <div className="mb-1 text-xs uppercase tracking-wide text-muted">
              {i === 0 ? 'Premise 1' : i === 1 ? 'Premise 2' : 'Conclusion'}
            </div>
            <div className="font-mono text-primary">{item.expr}</div>
            <div className="mt-2 text-sm text-muted">{item.meaning}</div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-primary">Proof — Hypothetical Syllogism (via Conditional Proof)</h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-surface">
              <th className="border border-white/10 px-3 py-2 w-14">Step</th>
              <th className="border border-white/10 px-3 py-2">Statement</th>
              <th className="border border-white/10 px-3 py-2">Justification</th>
            </tr>
          </thead>
          <tbody>
            {proofSteps.map((s) => (
              <tr key={s.step}>
                <td className="border border-white/10 px-3 py-2">{s.step}</td>
                <td className="border border-white/10 px-3 py-2 font-mono">{s.statement}</td>
                <td className="border border-white/10 px-3 py-2">{s.justification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-semibold text-primary">Truth-table verification</h3>
        <div className="overflow-x-auto">
          <table data-testid="truth-table" className="w-full border-collapse text-center text-sm">
            <thead>
              <tr className="bg-surface">
                {['A', 'B', 'X', 'T', 'A∧B', '(A∧B)→X', 'X→T', '(A∧B)→T'].map((h) => (
                  <th key={h} className="border border-white/10 px-2 py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  data-testid={r.premisesBothTrue ? 'row-premises-true' : undefined}
                  className={r.premisesBothTrue ? 'row-premises-true' : undefined}
                >
                  <td className="border border-white/10 px-2 py-1">{BOOL(r.A)}</td>
                  <td className="border border-white/10 px-2 py-1">{BOOL(r.B)}</td>
                  <td className="border border-white/10 px-2 py-1">{BOOL(r.X)}</td>
                  <td className="border border-white/10 px-2 py-1">{BOOL(r.T)}</td>
                  <td className="border border-white/10 px-2 py-1">{BOOL(r.aAndB)}</td>
                  <td className="border border-white/10 px-2 py-1">{BOOL(r.premise1)}</td>
                  <td className="border border-white/10 px-2 py-1">{BOOL(r.premise2)}</td>
                  <td className="border border-white/10 px-2 py-1 font-semibold">{BOOL(r.conclusion)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-muted">
          Shaded rows: both premises hold (1 fired + 9 vacuous). In every shaded row the conclusion is
          also true — the argument is valid.
        </p>
      </section>
    </div>
  );
}
