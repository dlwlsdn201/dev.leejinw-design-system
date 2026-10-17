import styles from './ui.module.css';

interface FieldMessageProps {
  hint?: string;
  error?: string;
  hintId?: string;
  errorId?: string;
}

/** Displays accessible guidance and validation feedback below a field. */
export const FieldMessage = ({ hint, error, hintId, errorId }: FieldMessageProps) => (
  <>
    {hint && <span className={styles.fieldHint} id={hintId}>{hint}</span>}
    {error && <span className={styles.fieldError} id={errorId}>{error}</span>}
  </>
);
