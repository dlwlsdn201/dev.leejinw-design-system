import type { ComponentPropsWithRef } from 'react';
import { Select as Primitive } from 'radix-ui';
import { FieldMessage } from './FieldMessage';
import { useFieldIds } from './useFieldIds';
import { OVERLAY_CONFIG } from './overlay-config';
import field from './ui.module.css';
import styles from './extended.module.css';

export interface SelectOption { value: string; label: string; disabled?: boolean }
export interface SelectProps extends Omit<Primitive.SelectProps, 'children'> {
  label: string;
  options: readonly SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  id?: string;
  className?: string;
  ref?: ComponentPropsWithRef<typeof Primitive.Trigger>['ref'];
  'aria-describedby'?: string;
  'aria-invalid'?: ComponentPropsWithRef<'button'>['aria-invalid'];
}

/** Renders a labeled single-value select with keyboard navigation and form support. */
export const Select = ({ label, options, placeholder, hint, error, id, className, ref, 'aria-describedby': describedBy, 'aria-invalid': invalid, ...props }: SelectProps) => {
  const ids = useFieldIds({ id, hint, error, describedBy });
  return <div className={[field.field, className].filter(Boolean).join(' ')}>
    <label className={field.fieldLabel} htmlFor={ids.inputId}>{label}{props.required && <span className={field.required} aria-hidden="true"> *</span>}</label>
    <Primitive.Root {...props}>
      <Primitive.Trigger ref={ref} id={ids.inputId} className={styles.selectTrigger} aria-describedby={ids.descriptionIds} aria-invalid={error ? true : invalid}>
        <Primitive.Value placeholder={placeholder} /><Primitive.Icon aria-hidden="true">⌄</Primitive.Icon>
      </Primitive.Trigger>
      <Primitive.Portal><Primitive.Content position="popper" sideOffset={OVERLAY_CONFIG.sideOffset} collisionPadding={OVERLAY_CONFIG.collisionPadding} className={styles.selectContent}>
        <Primitive.ScrollUpButton className={styles.scrollButton} aria-hidden="true">⌃</Primitive.ScrollUpButton>
        <Primitive.Viewport className={styles.selectViewport}>{options.map(option => <Primitive.Item className={styles.menuItem} key={option.value} value={option.value} disabled={option.disabled}>
          <Primitive.ItemText>{option.label}</Primitive.ItemText><Primitive.ItemIndicator aria-hidden="true">✓</Primitive.ItemIndicator>
        </Primitive.Item>)}</Primitive.Viewport>
        <Primitive.ScrollDownButton className={styles.scrollButton} aria-hidden="true">⌄</Primitive.ScrollDownButton>
      </Primitive.Content></Primitive.Portal>
    </Primitive.Root>
    <FieldMessage hint={hint} error={error} hintId={ids.hintId} errorId={ids.errorId} />
  </div>;
};
