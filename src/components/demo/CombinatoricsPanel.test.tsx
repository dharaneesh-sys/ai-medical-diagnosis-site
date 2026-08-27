import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import CombinatoricsPanel from './CombinatoricsPanel';

afterEach(cleanup);

describe('CombinatoricsPanel', () => {
  it('defaults n=12, k=5 render the session-verified answers', () => {
    const { getByTestId } = render(<CombinatoricsPanel />);
    expect(getByTestId('count-exactly').textContent).toBe('792');
    expect(getByTestId('count-atLeast').textContent).toBe('3,302');
    expect(getByTestId('count-ordered').textContent).toBe('95,040');
  });

  it('recomputes live for n=5, k=5', () => {
    const { getByTestId } = render(<CombinatoricsPanel />);
    fireEvent.change(getByTestId('input-n'), { target: { value: '5' } });
    fireEvent.change(getByTestId('input-k'), { target: { value: '5' } });
    expect(getByTestId('count-exactly').textContent).toBe('1');
    expect(getByTestId('count-atLeast').textContent).toBe('1');
    expect(getByTestId('count-ordered').textContent).toBe('120');
  });

  it('surfaces the engine RangeError inline for k > n', () => {
    const { getByTestId, queryByTestId } = render(<CombinatoricsPanel />);
    fireEvent.change(getByTestId('input-n'), { target: { value: '3' } });
    fireEvent.change(getByTestId('input-k'), { target: { value: '7' } });
    expect(getByTestId('calc-error').textContent).toMatch(/k must not exceed n/);
    expect(queryByTestId('count-exactly')).toBeNull();
  });
});
