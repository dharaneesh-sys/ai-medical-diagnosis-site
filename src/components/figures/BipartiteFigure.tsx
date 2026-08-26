import { bipartiteLayout } from '../../lib/graphModel';
import GraphSvgBase from './GraphSvgBase';

interface Props {
  highlight?: string | null;
  width?: number;
}

/** Representation 1 — bipartite layout: symptoms left (x=200), diseases right (x=800). */
export default function BipartiteFigure({ highlight = null, width = 560 }: Props) {
  return (
    <GraphSvgBase
      points={bipartiteLayout()}
      ariaLabel="Representation 1: bipartite layout of the diagnostic network, symptom vertices on the left and disease vertices on the right"
      highlight={highlight}
      width={width}
    />
  );
}
