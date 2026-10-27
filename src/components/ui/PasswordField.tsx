"use client";

// Поле пароля с кнопкой-глазом: по клику пароль показывается или снова скрывается точками.
// Используется так же, как TextField: <PasswordField label="Пароль" error={...} {...register("password")} />
// Показ меняет только type у <input> ("password" ↔ "text"), сам пароль остаётся в поле.

import { useId, useState, type ComponentProps } from "react";
import styles from "./Field.module.css";
import passwordStyles from "./PasswordField.module.css";

type Props = Omit<ComponentProps<"input">, "type"> & {
  label: string;
  error?: string;
};

export function PasswordField({ label, error, id, ...inputProps }: Props) {
  const [visible, setVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      {/* Обёртка нужна, чтобы поставить кнопку поверх правого края поля */}
      <div className={passwordStyles.wrapper}>
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          className={`${styles.input} ${passwordStyles.input}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        <button
          type="button" // без этого клик по кнопке отправил бы форму
          className={passwordStyles.toggle}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
          aria-pressed={visible}
          title={visible ? "Скрыть пароль" : "Показать пароль"}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>

      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

// Открытый глаз: пароль сейчас скрыт, клик покажет его.
function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Перечёркнутый глаз: пароль сейчас виден, клик скроет его.
function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-2.2 3.1" />
      <path d="M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="M2 2l20 20" />
    </svg>
  );
}
