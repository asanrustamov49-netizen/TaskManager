// Запросы к /api/tasks. Только сами запросы, без кэширования (оно в hooks.ts).

import { api } from "@/lib/api";
import type { Task, TaskInput, TaskListParams, TaskListResponse } from "./types";

// Собирает строку вида "page=1&limit=10&search=хлеб&sort=newest".
// Пустые фильтры не отправляем: на сервере отсутствие параметра означает «не фильтровать».
function toQueryString(params: TaskListParams): string {
  const query = new URLSearchParams();
  query.set("page", String(params.page));
  query.set("limit", String(params.limit));
  query.set("sort", params.sort);
  if (params.search.trim()) query.set("search", params.search.trim());
  if (params.priority) query.set("priority", params.priority);
  if (params.category) query.set("category", params.category);
  return query.toString();
}

export const tasksApi = {
  list: (params: TaskListParams) => api<TaskListResponse>(`/tasks?${toQueryString(params)}`),

  categories: () => api<{ categories: string[] }>("/tasks/categories").then((r) => r.categories),

  create: (input: TaskInput) =>
    api<{ task: Task }>("/tasks", { method: "POST", body: JSON.stringify(input) }).then((r) => r.task),

  update: (id: string, input: TaskInput) =>
    api<{ task: Task }>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(input) }).then((r) => r.task),

  remove: (id: string) => api<void>(`/tasks/${id}`, { method: "DELETE" }),
};
