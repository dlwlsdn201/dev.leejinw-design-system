import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';
import type { SelectOption } from './Select';
import styles from './extended.module.css';

export interface RadioGroupProps extends Omit<ComponentPropsWithRef<'fieldset'>, 'onChange' | 'defaultValue'> {
  label: string;
  options: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  required?: boolean;
  form?: string;
}

/** Renders native mutually exclusive choices; browser radio behavior owns keyboard navigation and form reset. */
export const RadioGroup = ({ label, options, className, id, name, value, defaultValue, onValueChange, orientation = 'vertical', required, form, disabled, ...props }: RadioGroupProps) => {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  return <fieldset {...props} id={groupId} disabled={disabled} className={[styles.choiceGroup, styles.radioFieldset, className].filter(Boolean).join(' ')}>
    <legend className={styles.label}>{label}</legend>
    <div className={styles.radioGroup} data-orientation={orientation}>
      {options.map((option, index) => <label key={option.value} htmlFor={`${groupId}-${index}`} className={styles.choiceLabel} data-disabled={disabled || option.disabled || undefined}>
        <input type="radio" id={`${groupId}-${index}`} className={styles.radio} name={name ?? groupId} value={option.value} disabled={option.disabled} required={required} form={form} checked={value === undefined ? undefined : value === option.value} defaultChecked={value === undefined ? defaultValue === option.value : undefined} onChange={() => onValueChange?.(option.value)} />
        <span>{option.label}</span>
      </label>)}
    </div>
  </fieldset>;
};
