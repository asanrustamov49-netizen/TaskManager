import { useId, type ComponentProps } from "react";
import styles from "./Field.module.css";

type Props = ComponentProps<"input"> & {
  label: string;
  error?: string;
  hint?: string; 
};

export function TextField({ label, error, hint, id, className, ...inputProps }: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={styles.input}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
