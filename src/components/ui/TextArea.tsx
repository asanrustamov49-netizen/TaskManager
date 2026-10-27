// Многострочное поле с подписью и ошибкой. Работает так же, как TextField.

import { useId, type ComponentProps } from "react";
import styles from "./Field.module.css";

type Props = ComponentProps<"textarea"> & {
  label: string;
  error?: string;
};

export function TextArea({ label, error, id, ...textareaProps }: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <textarea
        id={inputId}
        className={`${styles.input} ${styles.textarea}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...textareaProps}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
