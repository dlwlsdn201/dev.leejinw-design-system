import type { ComponentPropsWithRef } from 'react';
import { Toast as Primitive } from 'radix-ui';
import { OVERLAY_CONFIG } from './overlay-config';
import styles from './extended.module.css';

export const ToastProvider = Primitive.Provider;
export type ToastViewportProps = ComponentPropsWithRef<typeof Primitive.Viewport>;
export interface ToastProps extends Omit<ComponentPropsWithRef<typeof Primitive.Root>, 'asChild' | 'title'> { title: string; description?: string; closeLabel: string; tone?: 'info' | 'error' }

/** Renders a transient notification; open state and translated copy belong to the consumer. */
export const Toast = ({ title, description, closeLabel, tone = 'info', className, ...props }: ToastProps) => <Primitive.Root duration={OVERLAY_CONFIG.toastDuration} type={tone === 'error' ? 'foreground' : 'background'} {...props} data-tone={tone} className={[styles.toast, className].filter(Boolean).join(' ')}>
  <div className={styles.choiceGroup}><Primitive.Title className={styles.label}>{title}</Primitive.Title>{description && <Primitive.Description className={styles.description}>{description}</Primitive.Description>}</div>
  <Primitive.Close className={styles.close} aria-label={closeLabel}>×</Primitive.Close>
</Primitive.Root>;

/** Mount once within ToastProvider; pass a translated label for the notification region. */
export const ToastViewport = ({ className, ...props }: ToastViewportProps) => <Primitive.Viewport {...props} className={[styles.toastViewport, className].filter(Boolean).join(' ')} />;
