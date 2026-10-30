"use client";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useMe } from "@/features/auth/hooks";
import { ApiError } from "@/lib/api";
import styles from "./AuthGuard.module.css";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { error, isPending } = useMe();
  const unauthorized = error instanceof ApiError && error.status === 401;

  useEffect(() => {
    if (unauthorized) router.replace("/login");
  }, [unauthorized, router]);

  if (isPending || unauthorized) return <div className={styles.loader} aria-label="Загрузка" />;
  if (error) return <p className={styles.error}>Не удалось загрузить профиль: {error.message}</p>;
  return children;
}
