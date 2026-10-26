import type { ComponentPropsWithRef } from 'react';
import { Popover as Primitive } from 'radix-ui';
import { OVERLAY_CONFIG } from './overlay-config';
import styles from './extended.module.css';

export const Popover = Primitive.Root;
export const PopoverTrigger = Primitive.Trigger;
export const PopoverClose = Primitive.Close;
export interface PopoverContentProps extends Omit<ComponentPropsWithRef<typeof Primitive.Content>, 'asChild' | 'title'> { title: string; closeLabel: string }

/** Renders a dismissible, named panel for contextual interaction. */
export const PopoverContent = ({ title, closeLabel, children, className, ...props }: PopoverContentProps) => <Primitive.Portal><Primitive.Content sideOffset={OVERLAY_CONFIG.sideOffset} collisionPadding={OVERLAY_CONFIG.collisionPadding} {...props} aria-label={title} className={[styles.popover, className].filter(Boolean).join(' ')}>
  <div className={styles.dialogHeader}><strong className={styles.label}>{title}</strong><Primitive.Close className={styles.close} aria-label={closeLabel}>×</Primitive.Close></div>{children}
</Primitive.Content></Primitive.Portal>;
