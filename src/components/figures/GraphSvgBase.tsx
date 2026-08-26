import { EDGES } from '../../lib/graphModel';

export interface Point {
  id: string;
  x: number;
  y: number;
}

interface GraphSvgBaseProps {
  points: Point[];
  ariaLabel: string;
  /** When set, edges incident to this vertex are emphasised */
  highlight?: string | null;
  width?: number;
}

/** Shared renderer: vertices as circles + subscript labels, edges as lines (todo-11). */
export default function GraphSvgBase({ points, ariaLabel, highlight = null, width = 560 }: GraphSvgBaseProps) {
  const byId = new Map(points.map((p) => [p.id, p]));
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 1000 640"
      width={width}
      className="max-w-full h-auto"
    >
      {EDGES.map(([a, b]) => {
        const pa = byId.get(a);
        const pb = byId.get(b);
        if (!pa || !pb) return null;
        const emphasised = highlight !== null && (highlight === a || highlight === b);
        return (
          <line
            key={`${a}-${b}`}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            stroke={emphasised ? 'var(--color-primary)' : '#64748b'}
            strokeWidth={emphasised ? 6 : 3}
          />
        );
      })}
      {points.map((p) => (
        <g key={p.id}>
          <circle cx={p.x} cy={p.y} r={30} fill={vertexColor(p.id)} stroke="#0a1816" strokeWidth={3} />
          <text
            x={p.x}
            y={p.y}
            dy="0.35em"
            textAnchor="middle"
            fontSize={26}
            fontWeight={700}
            fill="#ffffff"
            style={{ pointerEvents: 'none' }}
          >
            {vertexLabel(p.id)}
          </text>
        </g>
      ))}
    </svg>
  );
}

function vertexColor(id: string): string {
  return id.startsWith('S') ? '#4a90d9' : '#e07a5f';
}

const LABELS: Record<string, string> = {
  S1: 'S₁', S2: 'S₂', S3: 'S₃', S4: 'S₄',
  D1: 'D₁', D2: 'D₂', D3: 'D₃',
};

function vertexLabel(id: string): string {
  return LABELS[id] ?? id;
}
