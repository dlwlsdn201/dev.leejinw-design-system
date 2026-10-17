import type { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './ui.module.css';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

/** Renders a native button with consistent emphasis, size, and loading feedback. */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leadingIcon,
  trailingIcon,
  children,
  className,
  disabled,
  type = 'button',
  ...buttonProps
}: ButtonProps) => (
  <button
    {...buttonProps}
    type={type}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    className={[styles.button, styles[`button-${variant}`], styles[`button-${size}`], className].filter(Boolean).join(' ')}
  >
    {isLoading && <span className={styles.spinner} aria-hidden="true" />}
    {!isLoading && leadingIcon && <span className={styles.buttonIcon} aria-hidden="true">{leadingIcon}</span>}
    <span>{children}</span>
    {!isLoading && trailingIcon && <span className={styles.buttonIcon} aria-hidden="true">{trailingIcon}</span>}
  </button>
);
