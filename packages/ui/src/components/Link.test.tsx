import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Link } from './Link';

describe('Link', () => {
  it('opens external links with safe relationship attributes', () => {
    render(<Link href="https://example.com" isExternal>Documentation</Link>);
    const link = screen.getByRole('link', { name: 'Documentation' });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
