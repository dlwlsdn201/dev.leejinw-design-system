import { useEffect, useRef } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { FieldMessage } from './FieldMessage';
import { useFieldIds } from './useFieldIds';
import styles from './ui.module.css';

export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label: string;
  hint?: string;
  error?: string;
  isIndeterminate?: boolean;
}

/** Renders a native checkbox, including its mixed state and accessible feedback. */
export const Checkbox = ({
  label,
  hint,
  error,
  id,
  className,
  isIndeterminate = false,
  ref,
  'aria-describedby': describedBy,
  ...inputProps
}: CheckboxProps) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const { inputId, hintId, errorId, descriptionIds } = useFieldIds({ id, hint, error, describedBy });

  useEffect(() => {
    if (internalRef.current) internalRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  const handleRef = (element: HTMLInputElement | null) => {
    internalRef.current = element;
    if (typeof ref === 'function') ref(element);
    else if (ref) ref.current = element;
  };

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={styles.checkboxLabel} htmlFor={inputId}>
        <input
          {...inputProps}
          ref={handleRef}
          id={inputId}
          type="checkbox"
          aria-checked={isIndeterminate ? 'mixed' : undefined}
          aria-describedby={descriptionIds}
          aria-invalid={Boolean(error) || undefined}
          className={styles.checkbox}
        />
        <span>{label}{inputProps.required && <span className={styles.required} aria-hidden="true"> *</span>}</span>
      </label>
      <div className={styles.checkboxFeedback}>
        <FieldMessage hint={hint} error={error} hintId={hintId} errorId={errorId} />
      </div>
    </div>
  );
};
