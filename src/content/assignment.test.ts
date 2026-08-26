import { describe, expect, it } from 'vitest';
import { combinatoricsCases, premises, proofSteps, propositionalVariables, truthTable } from './assignment';

describe('truthTable generator', () => {
  it('produces exactly 16 rows', () => {
    expect(truthTable()).toHaveLength(16);
  });

  it('has exactly 10 rows where both premises hold (1 fired + 9 vacuous)', () => {
    const both = truthTable().filter((r) => r.premisesBothTrue);
    expect(both).toHaveLength(10);
    expect(both.some((r) => r.A && r.B && r.X && r.T)).toBe(true);
  });

  it('conclusion is true whenever both premises are true (validity)', () => {
    for (const r of truthTable()) {
      if (r.premisesBothTrue) expect(r.conclusion).toBe(true);
    }
    expect(truthTable().every((r) => !r.premisesBothTrue || r.conclusion)).toBe(true);
  });
});

describe('content integrity', () => {
  it('exposes 4 propositional variables and 6 proof steps', () => {
    expect(propositionalVariables).toHaveLength(4);
    expect(proofSteps).toHaveLength(6);
  });

  it('carries the hypothetical-syllogism chain', () => {
    expect(premises.p1.expr).toBe('(A ∧ B) → X');
    expect(premises.p2.expr).toBe('X → T');
    expect(premises.conclusion.expr).toBe('(A ∧ B) → T');
  });

  it('case metadata carries formulas but no hardcoded result digits', () => {
    expect(combinatoricsCases).toHaveLength(3);
    const blob = JSON.stringify(combinatoricsCases);
    expect(blob).not.toMatch(/792|3302|3,302|95040|95,040/);
  });
});
