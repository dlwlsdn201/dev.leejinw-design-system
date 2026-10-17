import type { ComponentPropsWithRef } from 'react';
import { FieldMessage } from './FieldMessage';
import { useFieldIds } from './useFieldIds';
import styles from './ui.module.css';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  label: string;
  hint?: string;
  error?: string;
}

/** Renders a labeled native textarea with guidance and validation feedback. */
export const Textarea = ({
  label,
  hint,
  error,
  id,
  className,
  'aria-describedby': describedBy,
  rows = 4,
  ...textareaProps
}: TextareaProps) => {
  const { inputId, hintId, errorId, descriptionIds } = useFieldIds({ id, hint, error, describedBy });

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={styles.fieldLabel} htmlFor={inputId}>
        {label}{textareaProps.required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>
      <textarea
        {...textareaProps}
        id={inputId}
        rows={rows}
        aria-describedby={descriptionIds}
        aria-invalid={Boolean(error) || undefined}
        className={styles.textarea}
      />
      <FieldMessage hint={hint} error={error} hintId={hintId} errorId={errorId} />
    </div>
  );
};
