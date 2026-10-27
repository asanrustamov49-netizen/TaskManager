"use client";

// Шапка страницы задач: логотип, email пользователя и кнопка «Выйти».

import { useLogout, useMe } from "@/features/auth/hooks";
import { Button } from "./ui/Button";
import styles from "./AppHeader.module.css";

export function AppHeader() {
  const { data: user } = useMe();
  const logout = useLogout();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.logo}>
          <span className={styles.logoMark} aria-hidden>
            ✓
          </span>
          Task Manager
        </span>

        <div className={styles.user}>
          {user && (
            <>
              {/* Кружок с первой буквой email */}
              <span className={styles.avatar} aria-hidden>
                {user.email[0].toUpperCase()}
              </span>
              <span className={styles.email}>{user.email}</span>
            </>
          )}
          <Button variant="secondary" onClick={() => logout.mutate()} disabled={logout.isPending}>
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
}
