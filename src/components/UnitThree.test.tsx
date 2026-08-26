import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';

afterEach(cleanup);
import UnitThree from './UnitThree';

describe('UnitThree', () => {
  it('renders both figure representations', () => {
    const { getAllByRole } = render(<UnitThree />);
    const labels = getAllByRole('img').map((el) => el.getAttribute('aria-label') ?? '');
    expect(labels.some((l) => /bipartite/i.test(l))).toBe(true);
    expect(labels.some((l) => /circular/i.test(l))).toBe(true);
  });

  it('renders the clinical-meaning edge table', () => {
    const { getByText } = render(<UnitThree />);
    expect(getByText('Fever indicates Influenza')).toBeTruthy();
    expect(getByText('Fatigue indicates Anemia')).toBeTruthy();
  });

  it('shows the corrected degree sequence in both invariant cells and the superscripted certificate', () => {
    const { container } = render(<UnitThree />);
    const text = container.textContent ?? '';
    expect(text.split('(3, 2, 2, 2, 1, 1, 1)').length - 1).toBe(2);
    expect(container.querySelector('sup')?.textContent).toBe('T');
  });
});
