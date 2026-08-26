import { describe, expect, it } from 'vitest';
import { runRule, type RuleInput } from './ruleEngine';
import { truthTable } from '../content/assignment';

describe('fired path', () => {
  it('{A:true, B:true} → X=true, T=true, two Modus-Ponens steps traced', () => {
    const r = runRule({ A: true, B: true });
    expect(r.X).toBe(true);
    expect(r.T).toBe(true);
    expect(r.vacuous).toBe(false);
    expect(r.trace).toHaveLength(2);
    expect(r.trace.every((s) => s.rule.startsWith('Modus Ponens'))).toBe(true);
  });
});

describe('vacuous paths', () => {
  it('every vacuous input → X/T false, single explainer traced', () => {
    const inputs = [
      { A: false, B: true },
      { A: true, B: false },
      { A: false, B: false },
    ] satisfies RuleInput[];
    for (const input of inputs) {
      const r = runRule(input);
      expect(r.vacuous).toBe(true);
      expect(r.X).toBe(false);
      expect(r.T).toBe(false);
      expect(r.trace).toHaveLength(1);
      expect(r.trace[0].rule).toMatch(/Vacuous/);
    }
  });
});

describe('semantic agreement with the truth table', () => {
  it('engine matches all 16 rows of the content-module table', () => {
    for (const row of truthTable()) {
      const r = runRule({ A: row.A, B: row.B });
      // Engine forward-chains derivations; the table records world valuations.
      expect(r.vacuous).toBe(!row.aAndB);
      if (!r.vacuous) {
        expect(r.X).toBe(true); // premise 1 fires whenever A ∧ B holds
        expect(r.T).toBe(true); // the SYSTEM always recommends testing here
        if (row.premise1 && row.premise2) expect(row.conclusion).toBe(true); // validity needs BOTH premises
      }
    }
  });
});
