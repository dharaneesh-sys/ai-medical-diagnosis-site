// Single-source content module (todo-3) — prose/tables ONLY.
// OWNERSHIP: graph facts (vertices, edges, degrees, matrices, bijection) live in
// src/lib/graphModel.ts (todo-6). Do NOT duplicate them here.
// NOTE: result digits (792 / 3302 / 95,040) are NEVER hardcoded here —
// counts render live from src/lib/combinatorics.ts.

export interface PropositionalVariable {
  symbol: string;
  statement: string;
}

export const propositionalVariables: PropositionalVariable[] = [
  { symbol: 'A', statement: 'The patient has symptom A' },
  { symbol: 'B', statement: 'The patient has symptom B' },
  { symbol: 'X', statement: 'Disease X is suspected' },
  { symbol: 'T', statement: 'Further testing is recommended' },
];

export const premises = {
  p1: {
    expr: '(A ∧ B) → X',
    meaning: 'If the patient has symptoms A and B, then disease X is suspected.',
  },
  p2: {
    expr: 'X → T',
    meaning: 'If disease X is suspected, further testing is recommended.',
  },
  conclusion: {
    expr: '(A ∧ B) → T',
    meaning: 'If the patient has symptoms A and B, further testing is recommended.',
  },
} as const;

export interface ProofStep {
  step: number;
  statement: string;
  justification: string;
}

export const proofSteps: ProofStep[] = [
  { step: 1, statement: '(A ∧ B) → X', justification: 'Premise 1' },
  { step: 2, statement: 'X → T', justification: 'Premise 2' },
  { step: 3, statement: 'A ∧ B', justification: 'Assumption (for Conditional Proof)' },
  { step: 4, statement: 'X', justification: 'Modus Ponens, 1, 3' },
  { step: 5, statement: 'T', justification: 'Modus Ponens, 2, 4' },
  { step: 6, statement: '(A ∧ B) → T', justification: 'Conditional Proof, 3–5 ∎' },
];

export interface TruthTableRow {
  A: boolean;
  B: boolean;
  X: boolean;
  T: boolean;
  aAndB: boolean;
  premise1: boolean;
  premise2: boolean;
  conclusion: boolean;
  /** true only when both premises hold simultaneously (only A,B,X,T = T,T,T,T) */
  premisesBothTrue: boolean;
}

/** Full 16-row truth table for the argument (premises 1,2 ⇒ conclusion). */
export function truthTable(): TruthTableRow[] {
  const rows: TruthTableRow[] = [];
  for (const A of [true, false]) {
    for (const B of [true, false]) {
      for (const X of [true, false]) {
        for (const T of [true, false]) {
          const aAndB = A && B;
          const premise1 = !aAndB || X;
          const premise2 = !X || T;
          const conclusion = !aAndB || T;
          rows.push({
            A,
            B,
            X,
            T,
            aAndB,
            premise1,
            premise2,
            conclusion,
            premisesBothTrue: premise1 && premise2,
          });
        }
      }
    }
  }
  return rows;
}

export interface CombinatoricsCaseMeta {
  key: 'exactlyFive' | 'atLeastFive' | 'orderedFive';
  title: string;
  formula: string;
  interpretation: string;
}

export const combinatoricsCases: CombinatoricsCaseMeta[] = [
  {
    key: 'exactlyFive',
    title: 'Exactly 5 symptoms selected',
    formula: 'C(12, 5) = 12! / (5! · 7!)',
    interpretation: 'One 5-symptom subset; order ignored.',
  },
  {
    key: 'atLeastFive',
    title: 'At least 5 symptoms selected',
    formula: 'Σ C(12, k), k = 5…12 = 2¹² − [C(12,0)+C(12,1)+C(12,2)+C(12,3)+C(12,4)] = 4096 − 794',
    interpretation: 'Any subset of size 5 to 12 (complement rule).',
  },
  {
    key: 'orderedFive',
    title: 'Order of symptoms considered',
    formula: 'P(12, 5) = 12! / 7! = C(12, 5) × 5!',
    interpretation: 'Exactly 5 chosen symptoms ranked by severity — sequence matters.',
  },
];

export const investigationTakeaway =
  'Relaxing "exactly 5" to "at least 5" multiplies the count by ≈ 4.17; additionally considering order multiplies by 5! = 120. Order matters far more than set size.';
