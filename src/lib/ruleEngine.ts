// Diagnostic rule chain from Unit I (todo-5):
//   Premise 1: (A ∧ B) → X
//   Premise 2: X → T
// Forward chaining ONLY — this is not a general theorem prover.

export interface RuleInput {
  A: boolean;
  B: boolean;
}

export interface TraceStep {
  /** Derived expression as displayed on screen */
  expr: string;
  /** Inference rule name / justification */
  rule: string;
}

export interface RuleResult {
  A: boolean;
  B: boolean;
  /** Disease X suspected — derived via premise 1 */
  X: boolean;
  /** Further testing recommended — derived via premise 2 */
  T: boolean;
  /** True when the antecedent A ∧ B is false: conclusion holds vacuously */
  vacuous: boolean;
  trace: TraceStep[];
}

/**
 * Run the assignment's diagnostic rule chain.
 * X := A ∧ B   (Modus Ponens on premise 1)
 * T := X       (Modus Ponens on premise 2)
 */
export function runRule(input: RuleInput): RuleResult {
  const { A, B } = input;
  const antecedent = A && B;
  const vacuous = !antecedent;

  const trace: TraceStep[] = [];

  const X = antecedent;
  if (X) {
    trace.push({ expr: 'X — disease X suspected', rule: 'Modus Ponens on premise 1: (A ∧ B) → X' });
  }

  const T = X;
  if (T) {
    trace.push({ expr: 'T — further testing recommended', rule: 'Modus Ponens on premise 2: X → T' });
  }

  if (vacuous) {
    trace.push({
      expr: '(A ∧ B) → T holds vacuously — antecedent A ∧ B is false',
      rule: 'Vacuous truth of implication',
    });
  }

  return { A, B, X, T, vacuous, trace };
}
