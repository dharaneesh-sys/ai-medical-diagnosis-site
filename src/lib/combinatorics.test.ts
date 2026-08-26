import { describe, expect, it } from 'vitest';
import { atLeastSum, factorial, nCr, nPr } from './combinatorics';

describe('session-verified constants', () => {
  it('C(12, 5) === 792', () => {
    expect(nCr(12, 5)).toBe(792);
  });

  it('atLeastSum(12, 5) === 3302', () => {
    expect(atLeastSum(12, 5)).toBe(3302);
  });

  it('P(12, 5) === 95040', () => {
    expect(nPr(12, 5)).toBe(95040);
  });
});

describe('identities', () => {
  it('P(n,k) === C(n,k) · k!', () => {
    expect(nPr(12, 5)).toBe(nCr(12, 5) * factorial(5));
  });

  it('complement rule: Σ_{k..n} === 2^n − Σ_{0..k-1}', () => {
    let below = 0;
    for (let j = 0; j < 5; j++) below += nCr(12, j);
    expect(atLeastSum(12, 5)).toBe(2 ** 12 - below);
  });

  it('symmetry C(n,k) === C(n,n−k)', () => {
    expect(nCr(12, 5)).toBe(nCr(12, 7));
  });
});

describe('input validation', () => {
  it('throws RangeError when k > n', () => {
    expect(() => nCr(3, 5)).toThrow(RangeError);
  });

  it('throws RangeError on negatives and non-integers', () => {
    expect(() => nCr(-1, 0)).toThrow(RangeError);
    expect(() => nPr(5, -2)).toThrow(RangeError);
    expect(() => atLeastSum(12.5, 5)).toThrow(RangeError);
  });
});
