import type { ComponentPropsWithRef } from 'react';
import styles from './extended.module.css';

export interface SpinnerProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> { label: string }

/** Announces loading without depending on motion or color alone. */
export const Spinner = ({ label, className, ...props }: SpinnerProps) => <span {...props} role="status" className={[styles.spinnerStatus, className].filter(Boolean).join(' ')}><span className={styles.spinner} aria-hidden="true" /><span>{label}</span></span>;
