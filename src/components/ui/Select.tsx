// Выпадающий список с подписью. Варианты передаются как обычные <option> внутри:
// <Select label="Приоритет" value={...} onChange={...}>
//   <option value="high">Высокий</option>
// </Select>

import { useId, type ComponentProps } from "react";
import styles from "./Field.module.css";

type Props = ComponentProps<"select"> & {
  label: string;
};

export function Select({ label, id, className, children, ...selectProps }: Props) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      <label htmlFor={selectId} className={styles.label}>
        {label}
      </label>
      <select id={selectId} className={`${styles.input} ${styles.select}`} {...selectProps}>
        {children}
      </select>
    </div>
  );
}
