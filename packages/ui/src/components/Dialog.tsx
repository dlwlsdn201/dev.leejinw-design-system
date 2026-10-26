import type { ComponentPropsWithRef } from 'react';
import { Dialog as Primitive } from 'radix-ui';
import styles from './extended.module.css';

export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogClose = Primitive.Close;
export interface DialogContentProps extends Omit<ComponentPropsWithRef<typeof Primitive.Content>, 'asChild' | 'title'> {
  title: string;
  description: string;
  closeLabel: string;
}

/** Renders a modal surface with an accessible title, description, and close control. */
export const DialogContent = ({ title, description, closeLabel, children, className, ...props }: DialogContentProps) => <Primitive.Portal>
  <Primitive.Overlay className={styles.overlay} />
  <Primitive.Content {...props} className={[styles.dialog, className].filter(Boolean).join(' ')}>
    <div className={styles.dialogHeader}><Primitive.Title className={styles.title}>{title}</Primitive.Title><Primitive.Close className={styles.close} aria-label={closeLabel}>×</Primitive.Close></div>
    <Primitive.Description className={styles.description}>{description}</Primitive.Description>
    {children}
  </Primitive.Content>
</Primitive.Portal>;
