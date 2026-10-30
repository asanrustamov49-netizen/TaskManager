"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { PasswordField } from "@/components/ui/PasswordField";
import { TextField } from "@/components/ui/TextField";
import styles from "./AuthForm.module.css";
import { useRegister } from "./hooks";
import { registerSchema, type RegisterValues } from "./schemas";

export function RegisterForm() {
  const registerUser = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(({ email, password }) => registerUser.mutate({ email, password }))}
      noValidate
    >
      <h1 className={styles.title}>Создать аккаунт</h1>
      <p className={styles.subtitle}>Это займёт меньше минуты</p>

      {registerUser.error && <p className={styles.serverError}>{registerUser.error.message}</p>}

      <TextField label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <PasswordField
        label="Пароль"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <PasswordField
        label="Повторите пароль"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" disabled={registerUser.isPending}>
        {registerUser.isPending ? "Создаём аккаунт…" : "Зарегистрироваться"}
      </Button>

      <p className={styles.footer}>
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
    </form>
  );
}
