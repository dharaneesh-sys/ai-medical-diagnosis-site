import { circularLayout } from '../../lib/graphModel';
import GraphSvgBase from './GraphSvgBase';

interface Props {
  highlight?: string | null;
  width?: number;
}

/**
 * Representation 2 — the SAME network drawn with a scrambled circular layout,
 * demonstrating that visual arrangement does not affect isomorphism.
 */
export default function CircularFigure({ highlight = null, width = 560 }: Props) {
  return (
    <GraphSvgBase
      points={circularLayout()}
      ariaLabel="Representation 2: the same diagnostic network drawn with a circular scrambled layout"
      highlight={highlight}
      width={width}
    />
  );
}
