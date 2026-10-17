import { useId } from 'react';

interface FieldIdsOptions {
  id?: string;
  hint?: string;
  error?: string;
  describedBy?: string;
}

/** Returns stable field and feedback IDs for accessible labels and descriptions. */
export const useFieldIds = ({ id, hint, error, describedBy }: FieldIdsOptions) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const descriptionIds = [describedBy, hintId, errorId].filter(Boolean).join(' ') || undefined;

  return { inputId, hintId, errorId, descriptionIds };
};
