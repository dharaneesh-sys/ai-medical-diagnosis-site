"use client";

import { motion, useReducedMotion } from "motion/react";
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
  onNodeSelect?: (id: string) => void;
}

/** Animatic renderer — edges draw sequentially, nodes pop with spring, layout morphs via spring. */
export default function GraphSvgBase({ points, ariaLabel, highlight = null, width = 560, onNodeSelect }: GraphSvgBaseProps) {
  const shouldReduce = useReducedMotion();
  const byId = new Map(points.map((p) => [p.id, p]));
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 1000 640"
      width={width}
      className="max-w-full h-auto"
    >
      {EDGES.map(([a, b], i) => {
        const pa = byId.get(a);
        const pb = byId.get(b);
        if (!pa || !pb) return null;
        const emphasised = highlight !== null && (highlight === a || highlight === b);
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            animate={{
              x1: pa.x,
              y1: pa.y,
              x2: pb.x,
              y2: pb.y,
              opacity: 1,
            }}
            initial={shouldReduce ? false : { opacity: 0 }}
            transition={
              shouldReduce
                ? undefined
                : {
                    opacity: { duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
                    x1: { type: "spring", stiffness: 280, damping: 32 },
                    y1: { type: "spring", stiffness: 280, damping: 32 },
                    x2: { type: "spring", stiffness: 280, damping: 32 },
                    y2: { type: "spring", stiffness: 280, damping: 32 },
                  }
            }
            stroke={emphasised ? 'var(--color-primary)' : 'var(--color-muted)'}
            strokeWidth={emphasised ? 6 : 2.5}
            strokeLinecap="round"
          />
        );
      })}
      {points.map((p, i) => (
        <motion.g
          key={p.id}
          data-vertex={p.id}
          onClick={onNodeSelect ? () => onNodeSelect(p.id) : undefined}
          className={onNodeSelect ? 'cursor-pointer' : undefined}
          initial={shouldReduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            shouldReduce
              ? undefined
              : { type: "spring", stiffness: 340, damping: 22, delay: 0.12 + i * 0.04 }
          }
          whileHover={shouldReduce ? undefined : { scale: 1.07 }}
          whileTap={shouldReduce ? undefined : { scale: 0.96 }}
        >
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={30}
            fill={vertexColor(p.id)}
            stroke="var(--color-bg)"
            strokeWidth={3}
            animate={shouldReduce ? undefined : { cx: p.x, cy: p.y }}
            transition={
              shouldReduce ? undefined : { type: "spring", stiffness: 320, damping: 28 }
            }
          />
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
        </motion.g>
      ))}
    </svg>
  );
}

function vertexColor(id: string): string {
  return id.startsWith('S') ? 'var(--color-graph-symptom)' : 'var(--color-graph-disease)';
}

const LABELS: Record<string, string> = {
  S1: 'S₁', S2: 'S₂', S3: 'S₃', S4: 'S₄',
  D1: 'D₁', D2: 'D₂', D3: 'D₃',
};

function vertexLabel(id: string): string {
  return LABELS[id] ?? id;
}
