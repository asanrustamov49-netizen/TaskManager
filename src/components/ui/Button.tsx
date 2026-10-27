// Кнопка. Принимает все свойства обычного <button> и ещё:
//   variant — внешний вид: "primary" (главное действие), "secondary", "danger" (удаление), "ghost" (без рамки)
//   iconOnly — квадратная кнопка только с иконкой (не забудьте aria-label для экранного диктора)

import type { ComponentProps } from "react";
import styles from "./Button.module.css";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  iconOnly?: boolean;
};

export function Button({ variant = "primary", iconOnly = false, type = "button", className, ...props }: Props) {
  const classes = [styles.button, styles[variant], iconOnly && styles.iconOnly, className];
  // type="button" по умолчанию, чтобы кнопка внутри формы случайно её не отправила.
  // Для отправки формы пишите type="submit".
  return <button type={type} className={classes.filter(Boolean).join(" ")} {...props} />;
}
