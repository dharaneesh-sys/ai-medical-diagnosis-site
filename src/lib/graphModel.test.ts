import { describe, expect, it } from 'vitest';
import {
  EDGES,
  VERTICES,
  biadjacency,
  bipartiteLayout,
  circularLayout,
  degreeSequence,
  degrees,
  isPermutationSimilar,
  permute,
} from './graphModel';

describe('graph facts', () => {
  it('has 7 vertices (4 symptoms, 3 diseases) and 6 edges', () => {
    expect(VERTICES).toHaveLength(7);
    expect(VERTICES.filter((v) => v.partition === 'symptom')).toHaveLength(4);
    expect(VERTICES.filter((v) => v.partition === 'disease')).toHaveLength(3);
    expect(EDGES).toHaveLength(6);
  });

  it('degree sequence is [3, 2, 2, 1, 1, 1, 1]', () => {
    expect(degreeSequence()).toEqual([3, 2, 2, 2, 1, 1, 1]);
    const d = degrees();
    expect(d.D1).toBe(3);
    expect(d.S1).toBe(2);
    expect(d.S4).toBe(2);
    expect(d.S2).toBe(1);
    expect(d.S3).toBe(1);
    expect(d.D2).toBe(2);
    expect(d.D3).toBe(1);
  });
});

describe('permutation similarity (isomorphism certificate)', () => {
  it('reversing both blocks maps A1 onto A2', () => {
    const A1 = biadjacency(['S1', 'S2', 'S3', 'S4'], ['D1', 'D2', 'D3']);
    const A2 = biadjacency(['S4', 'S3', 'S2', 'S1'], ['D3', 'D2', 'D1']);
    const rowRev = [3, 2, 1, 0];
    const colRev = [2, 1, 0];
    expect(A1[0]).toEqual([1, 1, 0]); // S1: D1,D2
    expect(A2[0]).toEqual([1, 0, 1]); // S4: D3,D1
    expect(isPermutationSimilar(A1, A2, rowRev, colRev)).toBe(true);
  });

  it('permute actually moves entries (sanity against identity-only passes)', () => {
    const m = [
      [1, 0],
      [0, 1],
    ];
    expect(permute(m, [1, 0], [1, 0])).toEqual([
      [1, 0],
      [0, 1],
    ]); // anti-diagonal identity survives double reversal
    expect(permute(m, [1, 0], [0, 1])).toEqual([
      [0, 1],
      [1, 0],
    ]);
  });

  it('a wrong permutation fails the check (guards vacuous pass)', () => {
    const A1 = biadjacency(['S1', 'S2', 'S3', 'S4'], ['D1', 'D2', 'D3']);
    const A2 = biadjacency(['S4', 'S3', 'S2', 'S1'], ['D3', 'D2', 'D1']);
    expect(isPermutationSimilar(A1, A2, [0, 1, 2, 3], [0, 1, 2])).toBe(false);
  });
});

describe('layouts', () => {
  it('each layout places exactly 7 distinct points inside the viewBox', () => {
    for (const layout of [bipartiteLayout(), circularLayout()]) {
      expect(layout).toHaveLength(7);
      const ids = new Set(layout.map((p) => p.id));
      expect(ids.size).toBe(7);
      for (const p of layout) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(1000);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(640);
      }
    }
  });

  it('bipartite layout separates partitions by x-axis', () => {
    const pts = bipartiteLayout();
    const sx = new Set(pts.filter((p) => p.id.startsWith('S')).map((p) => p.x));
    const dx = new Set(pts.filter((p) => p.id.startsWith('D')).map((p) => p.x));
    expect([...sx]).toEqual([200]);
    expect([...dx]).toEqual([800]);
  });
});
