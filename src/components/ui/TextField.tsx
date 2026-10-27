// Поле ввода с подписью и текстом ошибки.
// С react-hook-form: <TextField label="Email" error={errors.email?.message} {...register("email")} />
// register() возвращает name, onChange, onBlur и ref, а TextField передаёт их в <input>.

import { useId, type ComponentProps } from "react";
import styles from "./Field.module.css";

type Props = ComponentProps<"input"> & {
  label: string;
  error?: string;
  hint?: string; // серый текст-подсказка под полем
};

export function TextField({ label, error, hint, id, className, ...inputProps }: Props) {
  // useId даёт уникальный id, чтобы связать <label> и <input> (клик по подписи ставит фокус в поле).
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
