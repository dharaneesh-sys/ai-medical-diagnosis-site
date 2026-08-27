import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import IsoExplorer from './IsoExplorer';

afterEach(cleanup);

const cyOf = (container: HTMLElement) =>
  container.querySelector<SVGCircleElement>('g[data-vertex="S4"] > circle')?.getAttribute('cy');

describe('IsoExplorer', () => {
  it('shows the isomorphism badge computed from the similarity check', () => {
    const { getByTestId } = render(<IsoExplorer />);
    expect(getByTestId('iso-badge').textContent).toMatch(/Isomorphic ✓/);
  });

  it('layout toggle moves S₄ to different coordinates', () => {
    const { container, getByTestId } = render(<IsoExplorer />);
    const before = cyOf(container);
    fireEvent.click(getByTestId('layout-toggle'));
    const after = cyOf(container);
    expect(before).toBeTruthy();
    expect(after).not.toBe(before);
  });

  it('selecting D₁ highlights its 3 incident edges and shows the degree chip', () => {
    const { container, getAllByText } = render(<IsoExplorer />);
    const d1 = container.querySelector('[data-vertex="D1"]');
    expect(d1).toBeTruthy();
    fireEvent.click(d1 as Element);
    expect(container.querySelectorAll('line[stroke-width="6"]')).toHaveLength(3);
    expect(getAllByText(/D₁: degree 3/).length).toBeGreaterThan(0);
  });
});
