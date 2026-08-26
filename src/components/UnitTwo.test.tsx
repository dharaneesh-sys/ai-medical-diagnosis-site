import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';

afterEach(cleanup);
import UnitTwo from './UnitTwo';

describe('UnitTwo live-computed counts', () => {
  it('renders the session-verified engine values', () => {
    const { getByTestId } = render(<UnitTwo />);
    expect(getByTestId('count-exactlyFive').textContent).toBe('792');
    expect(getByTestId('count-atLeastFive').textContent).toBe('3,302');
    expect(getByTestId('count-orderedFive').textContent).toBe('95,040');
  });

  it('binds to the engine rather than literals (computed consistency line)', () => {
    const { getByTestId } = render(<UnitTwo />);
    expect(getByTestId('consistency-line').textContent).toMatch(/= 792 × 120 ✓/);
  });
});
