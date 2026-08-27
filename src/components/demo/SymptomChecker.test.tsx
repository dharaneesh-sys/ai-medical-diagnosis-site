import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import SymptomChecker from './SymptomChecker';

afterEach(cleanup);

describe('SymptomChecker', () => {
  it('starts inert: vacuous explainer visible, no verdict', () => {
    const { getByTestId, queryByTestId } = render(<SymptomChecker />);
    expect(getByTestId('vacuous-explainer')).toBeTruthy();
    expect(queryByTestId('verdict')).toBeNull();
  });

  it('fires the full chain when both toggles are on', () => {
    const { getByTestId, getByRole } = render(<SymptomChecker />);
    fireEvent.click(getByRole('button', { name: 'Symptom A present' }));
    fireEvent.click(getByRole('button', { name: 'Symptom B present' }));
    expect(getByTestId('step-X').className).toContain('border-primary');
    expect(getByTestId('step-T').className).toContain('border-primary');
    expect(getByTestId('verdict').textContent).toMatch(/further testing recommended/i);
  });

  it('falls back to the vacuous explainer when a symptom is unset', () => {
    const { getByRole, getByTestId, queryByTestId } = render(<SymptomChecker />);
    const b = getByRole('button', { name: 'Symptom B present' });
    fireEvent.click(b);
    fireEvent.click(b);
    expect(getByTestId('vacuous-explainer')).toBeTruthy();
    expect(queryByTestId('verdict')).toBeNull();
  });

  it('mirrors toggle state into aria-pressed', () => {
    const { getByRole } = render(<SymptomChecker />);
    const a = getByRole('button', { name: 'Symptom A present' });
    expect(a.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(a);
    expect(a.getAttribute('aria-pressed')).toBe('true');
  });
});
