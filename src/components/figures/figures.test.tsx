import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';

afterEach(cleanup);
import BipartiteFigure from './BipartiteFigure';
import CircularFigure from './CircularFigure';

describe.each([
  ['BipartiteFigure', BipartiteFigure, 'bipartite'],
  ['CircularFigure', CircularFigure, 'circular'],
])('%s renders the canonical network', (_name, Figure, keyword) => {
  it('draws exactly 7 vertices and 6 edges', () => {
    const { container } = render(<Figure />);
    expect(container.querySelectorAll('circle')).toHaveLength(7);
    expect(container.querySelectorAll('line')).toHaveLength(6);
  });

  it('exposes an accessible label mentioning the representation', () => {
    const { getByRole } = render(<Figure />);
    const svg = getByRole('img');
    expect(svg.getAttribute('aria-label')).toMatch(new RegExp(keyword, 'i'));
  });
});
