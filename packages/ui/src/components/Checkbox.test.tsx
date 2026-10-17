import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('exposes a mixed state and accepts keyboard changes', async () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Select all" isIndeterminate onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Select all' });

    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    expect((checkbox as HTMLInputElement).indeterminate).toBe(true);

    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(handleChange).toHaveBeenCalledOnce();
  });
});
