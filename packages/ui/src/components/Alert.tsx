import type { ComponentPropsWithRef } from 'react';
import styles from './extended.module.css';

export interface AlertProps extends ComponentPropsWithRef<'div'> { title: string; tone?: 'info' | 'error' }

/** Renders persistent inline feedback; urgent errors use an assertive live region. */
export const Alert = ({ title, tone = 'info', role = tone === 'error' ? 'alert' : 'status', children, className, ...props }: AlertProps) => <div {...props} role={role} data-tone={tone} className={[styles.alert, className].filter(Boolean).join(' ')}>
  <strong className={styles.label}>{title}</strong>{children && <div className={styles.description}>{children}</div>}
</div>;
