"use client";
import { useToastStore } from "@/lib/toast";
import styles from "./Toaster.module.css";

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts);
  const hide = useToastStore((state) => state.hide);

  return (
    <div className={styles.container} aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`} role="status">
          <span className={styles.icon} aria-hidden>
            {t.type === "success" ? "✓" : "!"}
          </span>
          <span className={styles.message}>{t.message}</span>
          <button type="button" className={styles.close} onClick={() => hide(t.id)} aria-label="Закрыть">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
