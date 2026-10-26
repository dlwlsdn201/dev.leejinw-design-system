import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { Switch as Primitive } from 'radix-ui';
import styles from './extended.module.css';

export interface SwitchProps extends ComponentPropsWithRef<typeof Primitive.Root> { label: string; hint?: string }

/** Renders a labeled on/off setting with native form participation. */
export const Switch = ({ label, hint, id, className, 'aria-describedby': describedBy, ...props }: SwitchProps) => {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  return <div className={styles.choiceGroup}>
    <label className={styles.choiceLabel} htmlFor={switchId} data-disabled={props.disabled || undefined}>
      <Primitive.Root {...props} id={switchId} aria-describedby={[describedBy, hint && `${switchId}-hint`].filter(Boolean).join(' ') || undefined} className={[styles.switch, className].filter(Boolean).join(' ')}><Primitive.Thumb className={styles.switchThumb} /></Primitive.Root>
      <span>{label}</span>
    </label>
    {hint && <span className={styles.description} id={`${switchId}-hint`}>{hint}</span>}
  </div>;
};
