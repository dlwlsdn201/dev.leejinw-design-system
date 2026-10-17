import type { ComponentPropsWithRef } from 'react';
import { FieldMessage } from './FieldMessage';
import { useFieldIds } from './useFieldIds';
import styles from './ui.module.css';

export interface TextFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label: string;
  hint?: string;
  error?: string;
}

/** Renders a labeled native input with guidance and validation feedback. */
export const TextField = ({
  label,
  hint,
  error,
  id,
  className,
  'aria-describedby': describedBy,
  ...inputProps
}: TextFieldProps) => {
  const { inputId, hintId, errorId, descriptionIds } = useFieldIds({ id, hint, error, describedBy });

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={styles.fieldLabel} htmlFor={inputId}>
        {label}{inputProps.required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>
      <input
        {...inputProps}
        id={inputId}
        aria-describedby={descriptionIds}
        aria-invalid={Boolean(error) || undefined}
        className={styles.input}
      />
      <FieldMessage hint={hint} error={error} hintId={hintId} errorId={errorId} />
    </div>
  );
};
