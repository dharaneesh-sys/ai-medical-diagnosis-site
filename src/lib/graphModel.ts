// Canonical owner of ALL graph facts for Unit III (todo-6).
// The content module imports NOTHING from here that duplicates data —
// consumers import facts FROM this module.

export type VertexId = 'S1' | 'S2' | 'S3' | 'S4' | 'D1' | 'D2' | 'D3';
export type Partition = 'symptom' | 'disease';

export interface Vertex {
  id: VertexId;
  /** Display label with Unicode subscript */
  label: string;
  name: string;
  partition: Partition;
  color: string;
}

export const SYMPTOM_COLOR = '#4a90d9';
export const DISEASE_COLOR = '#e07a5f';

export const VERTICES: Vertex[] = [
  { id: 'S1', label: 'S₁', name: 'Fever', partition: 'symptom', color: SYMPTOM_COLOR },
  { id: 'S2', label: 'S₂', name: 'Cough', partition: 'symptom', color: SYMPTOM_COLOR },
  { id: 'S3', label: 'S₃', name: 'Rash', partition: 'symptom', color: SYMPTOM_COLOR },
  { id: 'S4', label: 'S₄', name: 'Fatigue', partition: 'symptom', color: SYMPTOM_COLOR },
  { id: 'D1', label: 'D₁', name: 'Influenza', partition: 'disease', color: DISEASE_COLOR },
  { id: 'D2', label: 'D₂', name: 'Measles', partition: 'disease', color: DISEASE_COLOR },
  { id: 'D3', label: 'D₃', name: 'Anemia', partition: 'disease', color: DISEASE_COLOR },
];

export type EdgeTriple = [source: VertexId, target: VertexId, meaning: string];

export const EDGES: EdgeTriple[] = [
  ['S1', 'D1', 'Fever indicates Influenza'],
  ['S1', 'D2', 'Fever indicates Measles'],
  ['S2', 'D1', 'Cough indicates Influenza'],
  ['S3', 'D2', 'Rash indicates Measles'],
  ['S4', 'D1', 'Fatigue indicates Influenza'],
  ['S4', 'D3', 'Fatigue indicates Anemia'],
];

export function degrees(): Record<VertexId, number> {
  const d = Object.fromEntries(VERTICES.map((v) => [v.id, 0])) as Record<VertexId, number>;
  for (const [a, b] of EDGES) {
    d[a] += 1;
    d[b] += 1;
  }
  return d;
}

/** Degree sequence sorted descending — invariant used in the isomorphism check. */
export function degreeSequence(): number[] {
  return Object.values(degrees()).sort((a, b) => b - a);
}

function edgeSet(): Set<string> {
  return new Set(EDGES.map(([a, b]) => `${a}|${b}`));
}

function hasEdge(a: VertexId, b: VertexId, set: Set<string> = edgeSet()): boolean {
  return set.has(`${a}|${b}`) || set.has(`${b}|${a}`);
}

/**
 * Biadjacency matrix for given vertex orders.
 * A1 = biadjacency(['S1','S2','S3','S4'], ['D1','D2','D3'])
 */
export function biadjacency(symptoms: VertexId[], diseases: VertexId[]): number[][] {
  const set = edgeSet();
  return symptoms.map((s) => diseases.map((dd) => (hasEdge(s, dd, set) ? 1 : 0)));
}

/** Apply a permutation to both rows and columns of a square-ish matrix pair-wise per axis. */
export function permute(matrix: number[][], rowPerm: number[], colPerm: number[]): number[][] {
  return rowPerm.map((i) => colPerm.map((j) => matrix[i][j]));
}

/**
 * Formal certificate of isomorphism: does applying the given permutation to
 * A1's rows/columns reproduce A2 exactly?
 */
export function isPermutationSimilar(A1: number[][], A2: number[][], rowPerm: number[], colPerm: number[]): boolean {
  const permuted = permute(A1, rowPerm, colPerm);
  return (
    permuted.length === A2.length &&
    permuted.every((row, i) =>
      row.length === A2[i].length && row.every((v, j) => v === A2[i][j]),
    )
  );
}

export interface Point {
  id: VertexId;
  x: number;
  y: number;
}

const VIEW_W = 1000;
const VIEW_H = 640;

/** Bipartite layout: symptoms left column (x=200), diseases right column (x=800). */
export function bipartiteLayout(): Point[] {
  const symptoms = VERTICES.filter((v) => v.partition === 'symptom');
  const diseases = VERTICES.filter((v) => v.partition === 'disease');
  const pts: Point[] = symptoms.map((v, i) => ({ id: v.id, x: 200, y: 80 + i * ((VIEW_H - 160) / (symptoms.length - 1)) }));
  pts.push(...diseases.map((v, i) => ({ id: v.id, x: 800, y: 140 + i * ((VIEW_H - 280) / (diseases.length - 1)) })));
  return pts;
}

/** Circular layout of the SAME network — fixed scrambled order to look visually distinct. */
const CIRCULAR_ORDER: VertexId[] = ['S4', 'D1', 'S1', 'D3', 'S2', 'D2', 'S3'];

export function circularLayout(): Point[] {
  const cx = VIEW_W / 2;
  const cy = VIEW_H / 2;
  const radius = 300;
  return CIRCULAR_ORDER.map((id, i) => {
    const angle = Math.PI / 2 + (i * 2 * Math.PI) / CIRCULAR_ORDER.length;
    return { id, x: cx + radius * Math.cos(angle), y: cy - radius * Math.sin(angle) };
  });
}
