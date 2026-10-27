import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/RegisterForm";

export const metadata: Metadata = { title: "Регистрация — Task Manager" };

export default function RegisterPage() {
  return <RegisterForm />;
}
