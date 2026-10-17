import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('runs the action when available', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Save</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('keeps its accessible name and blocks duplicate actions while loading', async () => {
    const handleClick = vi.fn();
    render(<Button isLoading onClick={handleClick}>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });

    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(handleClick).not.toHaveBeenCalled();
  });
});
