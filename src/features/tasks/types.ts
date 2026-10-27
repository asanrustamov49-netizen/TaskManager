// Типы задач на фронтенде. Повторяют то, что возвращает бэкенд (backend/src/types.ts).

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  category: string | null;
  createdAt: string;
}

// Что отправляем при создании и изменении задачи.
export interface TaskInput {
  title: string;
  description: string;
  priority: TaskPriority;
  category: string | null;
}

// Варианты сортировки. Названия совпадают с параметром sort в GET /api/tasks.
export type TaskSort = "newest" | "oldest" | "title" | "priority";

// Фильтры списка. Пустая строка означает «не фильтровать».
export interface TaskFilters {
  search: string;
  priority: TaskPriority | "";
  category: string;
  sort: TaskSort;
}

// Всё, что нужно для запроса одной страницы списка.
export interface TaskListParams extends TaskFilters {
  page: number;
  limit: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number; // сколько задач подходит под фильтры (на всех страницах)
  totalPages: number;
}

export interface TaskListResponse {
  tasks: Task[];
  pagination: Pagination;
}
