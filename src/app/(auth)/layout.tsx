// Общая обёртка страниц /login и /register: цветной фон и карточка с формой по центру.
// Папка в скобках "(auth)" не попадает в адрес страницы, она только объединяет страницы.

import type { ReactNode } from "react";
import styles from "./layout.module.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.logoMark} aria-hidden>
            ✓
          </span>
          Task Manager
        </div>
        {children}
      </div>
    </main>
  );
}
