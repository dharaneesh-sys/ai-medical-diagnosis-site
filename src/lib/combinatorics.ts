// Exact integer combinatorics (todo-4). No floats, no lookup tables.

function assertValid(n: number, k: number): void {
  if (!Number.isInteger(n) || !Number.isInteger(k)) {
    throw new RangeError(`n and k must be integers (got n=${n}, k=${k})`);
  }
  if (n < 0 || k < 0) {
    throw new RangeError(`n and k must be non-negative (got n=${n}, k=${k})`);
  }
  if (k > n) {
    throw new RangeError(`k must not exceed n (got k=${k}, n=${n})`);
  }
}

/** Binomial coefficient C(n, k) via multiplicative loop — exact at every step. */
export function nCr(n: number, k: number): number {
  assertValid(n, k);
  const kk = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= kk; i++) {
    result = (result * (n - kk + i)) / i; // integral after each division step
  }
  return result;
}

/** Permutations P(n, k) = n! / (n-k)! — exact product loop. */
export function nPr(n: number, k: number): number {
  assertValid(n, k);
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= n - i;
  }
  return result;
}

/** Sum of C(n, i) for i = k..n ("at least k selected"). */
export function atLeastSum(n: number, k: number): number {
  assertValid(n, k);
  let total = 0;
  for (let i = k; i <= n; i++) {
    total += nCr(n, i);
  }
  return total;
}

export function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(`factorial requires a non-negative integer (got ${n})`);
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
