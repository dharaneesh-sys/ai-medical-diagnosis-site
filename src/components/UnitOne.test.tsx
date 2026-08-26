import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, getAllByText, render } from '@testing-library/react';

afterEach(cleanup);
import UnitOne from './UnitOne';

describe('UnitOne', () => {
  it('renders a 16-row truth table', () => {
    const { container } = render(<UnitOne />);
    const table = container.querySelector('[data-testid="truth-table"]');
    expect(table?.querySelectorAll('tbody tr')).toHaveLength(16);
  });

  it('shades exactly the 10 premises-true rows', () => {
    const { getAllByTestId } = render(<UnitOne />);
    expect(getAllByTestId('row-premises-true')).toHaveLength(10);
  });

  it('names the proof method and the inference rules', () => {
    const { getAllByText } = render(<UnitOne />);
    expect(getAllByText(/Hypothetical Syllogism/).length).toBeGreaterThan(0);
    expect(getAllByText(/Modus Ponens/).length).toBeGreaterThan(0);
  });
});
