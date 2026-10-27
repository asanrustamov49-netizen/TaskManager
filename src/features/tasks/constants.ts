// Подписи для приоритетов и сортировки. Используются в фильтрах, форме и строке задачи.

import type { TaskPriority, TaskSort } from "./types";

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: "Высокий",
  medium: "Средний",
  low: "Низкий",
};

// Порядок, в котором приоритеты показываются в выпадающих списках.
export const PRIORITIES: TaskPriority[] = ["high", "medium", "low"];

export const SORT_LABELS: Record<TaskSort, string> = {
  newest: "Сначала новые",
  oldest: "Сначала старые",
  priority: "По приоритету",
  title: "По названию (А–Я)",
};

export const PAGE_SIZES = [5, 10, 20, 50];
