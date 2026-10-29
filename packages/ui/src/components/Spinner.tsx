import type { ComponentPropsWithRef } from 'react';
import styles from './extended.module.css';

export type SpinnerVariant = 'ring' | 'dots' | 'bars';
export interface SpinnerProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  label: string;
  variant?: SpinnerVariant;
}

const SPINNER_PARTS = ['first', 'second', 'third'] as const;

/**
 * Announces loading with a restrained indicator; visible text also works without motion.
 * @returns A status with decorative motion and a visible loading label.
 */
export const Spinner = ({ label, variant = 'ring', className, ...props }: SpinnerProps) => (
  <span {...props} role="status" className={[styles.spinnerStatus, className].filter(Boolean).join(' ')}>
    <span className={styles.spinnerVisual} data-spinner-variant={variant} aria-hidden="true">
      {variant === 'ring' ? <span className={styles.spinner} /> : (
        <span className={styles.spinnerSequence}>
          {SPINNER_PARTS.map(part => <span key={part} className={variant === 'dots' ? styles.spinnerDot : styles.spinnerBar} />)}
        </span>
      )}
    </span>
    <span>{label}</span>
  </span>
);
