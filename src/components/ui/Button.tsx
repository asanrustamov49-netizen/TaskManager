import type { ComponentProps } from "react";
import styles from "./Button.module.css";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  iconOnly?: boolean;
};

export function Button({ variant = "primary", iconOnly = false, type = "button", className, ...props }: Props) {
  const classes = [styles.button, styles[variant], iconOnly && styles.iconOnly, className];
  return <button type={type} className={classes.filter(Boolean).join(" ")} {...props} />;
}
