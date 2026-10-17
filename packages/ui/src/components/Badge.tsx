import type { ComponentPropsWithRef } from 'react';
import styles from './ui.module.css';

export interface BadgeProps extends ComponentPropsWithRef<'span'> {
  tone?: 'neutral' | 'accent' | 'error';
}

/** Displays a short non-interactive label or status. */
export const Badge = ({ tone = 'neutral', className, ...spanProps }: BadgeProps) => (
  <span
    {...spanProps}
    className={[styles.badge, styles[`badge-${tone}`], className].filter(Boolean).join(' ')}
  />
);
