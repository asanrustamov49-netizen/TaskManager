// Страница /tasks. Сама логика — в features/tasks/TasksView.tsx.

import type { Metadata } from "next";
import { TasksView } from "@/features/tasks/TasksView";

export const metadata: Metadata = { title: "Задачи — Task Manager" };

export default function TasksPage() {
  return <TasksView />;
}
