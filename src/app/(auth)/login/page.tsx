import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/LoginForm";

export const metadata: Metadata = { title: "Вход — Task Manager" };

export default function LoginPage() {
  return <LoginForm />;
}
