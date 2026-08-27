import { useState } from 'react';
import { runRule } from '../../lib/ruleEngine';

const chipCls = (on: boolean) =>
  `rounded-full border px-4 py-2.5 min-h-11 min-w-11 font-mono text-sm transition-colors duration-200 ${
    on ? 'border-primary bg-primary/20 text-primary' : 'border-white/20 text-muted'
  }`;

const stepCls = (active: boolean) =>
  `rounded border px-2 py-1 transition-colors duration-200 ${
    active ? 'step-active border-primary text-primary' : 'border-white/15 text-muted'
  }`;

/**
 * Interactive diagnostic rule card (todo-13): toggle symptoms A/B and watch the
 * inference chain (A∧B) → X → T fire, or the vacuous-case explainer appear.
 * Total animation budget: CSS transitions ≤ 200ms per step (reduced-motion = instant).
 */
export default function SymptomChecker() {
  const [A, setA] = useState(false);
  const [B, setB] = useState(false);
  const r = runRule({ A, B });

  return (
    <div data-testid="symptom-checker" className="space-y-4 rounded-lg border border-white/10 bg-surface p-5">
      <h3 className="font-semibold text-primary">Symptom checker — rule engine</h3>
      <div className="flex flex-wrap gap-3">
        <button type="button" aria-pressed={A} data-testid="toggle-A" onClick={() => setA((v) => !v)} className={chipCls(A)}>
          Symptom A present
        </button>
        <button type="button" aria-pressed={B} data-testid="toggle-B" onClick={() => setB((v) => !v)} className={chipCls(B)}>
          Symptom B present
        </button>
      </div>

      <div data-testid="inference-strip" className="flex flex-wrap items-center gap-2 font-mono text-sm">
        <span className={`rounded border px-2 py-1 ${A && B ? 'step-active border-primary text-primary' : 'border-white/15 text-muted'}`}>
          (A ∧ B)
        </span>
        <span aria-hidden="true" className="text-muted">→</span>
        <span data-testid="step-X" className={stepCls(r.X)}>X — disease suspected</span>
        <span aria-hidden="true" className="text-muted">→</span>
        <span data-testid="step-T" className={stepCls(r.T)}>T — further testing</span>
      </div>

      {r.vacuous ? (
        <p data-testid="vacuous-explainer" className="text-sm text-muted">
          Both symptoms are not present together, so the rule chain never fires — the conclusion
          holds vacuously. Toggle <strong>both</strong> symptoms to trigger testing.
        </p>
      ) : (
        <p data-testid="verdict" className="rounded border border-primary/40 bg-primary/10 px-3 py-2 font-semibold text-primary">
          Verdict: disease X suspected — further testing recommended.
        </p>
      )}
    </div>
  );
}
