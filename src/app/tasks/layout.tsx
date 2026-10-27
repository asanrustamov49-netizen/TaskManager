// Шаблон всех страниц /tasks: сначала проверка входа (AuthGuard), потом шапка и содержимое.

import { AppHeader } from "@/components/AppHeader";
import { AuthGuard } from "@/components/AuthGuard";

export default function TasksLayout({ children }: LayoutProps<"/tasks">) {
  return (
    <AuthGuard>
      <AppHeader />
      {children}
    </AuthGuard>
  );
}
