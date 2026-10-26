import type { ComponentPropsWithRef } from 'react';
import { AlertDialog as Primitive } from 'radix-ui';
import styles from './extended.module.css';

export const AlertDialog = Primitive.Root;
export const AlertDialogTrigger = Primitive.Trigger;
export const AlertDialogCancel = Primitive.Cancel;
export const AlertDialogAction = Primitive.Action;
export interface AlertDialogContentProps extends Omit<ComponentPropsWithRef<typeof Primitive.Content>, 'asChild' | 'title'> {
  title: string;
  description: string;
}

/** Renders an interrupting confirmation; consumers provide explicit cancel and action controls. */
export const AlertDialogContent = ({ title, description, children, className, ...props }: AlertDialogContentProps) => <Primitive.Portal>
  <Primitive.Overlay className={styles.overlay} />
  <Primitive.Content {...props} className={[styles.dialog, className].filter(Boolean).join(' ')}>
    <Primitive.Title className={styles.title}>{title}</Primitive.Title>
    <Primitive.Description className={styles.description}>{description}</Primitive.Description>
    {children}
  </Primitive.Content>
</Primitive.Portal>;
