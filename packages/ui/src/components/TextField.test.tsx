import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextField } from './TextField';

describe('TextField', () => {
  it('connects its label, guidance, and validation error', () => {
    render(<TextField label="Email" hint="Use your work email" error="Enter a valid address" />);
    const input = screen.getByRole('textbox', { name: 'Email' });

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Use your work email Enter a valid address');
  });
});
