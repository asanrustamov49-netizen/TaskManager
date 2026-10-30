"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { PasswordField } from "@/components/ui/PasswordField";
import { TextField } from "@/components/ui/TextField";
import styles from "./AuthForm.module.css";
import { useLogin } from "./hooks";
import { loginSchema, type LoginValues } from "./schemas";

export function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  return (
    <form className={styles.form} onSubmit={handleSubmit((values) => login.mutate(values))} noValidate>
      <h1 className={styles.title}>С возвращением!</h1>
      <p className={styles.subtitle}>Войдите, чтобы увидеть свои задачи</p>

      {login.error && <p className={styles.serverError}>{login.error.message}</p>}

      <TextField label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <PasswordField
        label="Пароль"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button type="submit" disabled={login.isPending}>
        {login.isPending ? "Входим…" : "Войти"}
      </Button>

      <p className={styles.footer}>
        Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
      </p>
    </form>
  );
}
