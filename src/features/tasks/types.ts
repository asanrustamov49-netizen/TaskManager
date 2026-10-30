export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  category: string | null;
  createdAt: string;
}

export interface TaskInput {
  title: string;
  description: string;
  priority: TaskPriority;
  category: string | null;
}

export type TaskSort = "newest" | "oldest" | "title" | "priority";

export interface TaskFilters {
  search: string;
  priority: TaskPriority | "";
  category: string;
  sort: TaskSort;
}

export interface TaskListParams extends TaskFilters {
  page: number;
  limit: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number; 
  totalPages: number;
}

export interface TaskListResponse {
  tasks: Task[];
  pagination: Pagination;
}
