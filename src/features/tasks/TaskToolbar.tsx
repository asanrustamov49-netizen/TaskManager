"use client";

// Панель над списком: поиск, фильтры по приоритету и категории, сортировка.
// Сама панель ничего не хранит: текущие значения приходят в filters,
// а изменения уходят наверх через onChange (состояние лежит в TasksView).

import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { TextField } from "@/components/ui/TextField";
import { PRIORITIES, PRIORITY_LABELS, SORT_LABELS } from "./constants";
import { useTaskCategories } from "./hooks";
import styles from "./TaskToolbar.module.css";
import type { TaskFilters, TaskPriority, TaskSort } from "./types";

type Props = {
  filters: TaskFilters;
  onChange: (changes: Partial<TaskFilters>) => void;
  onReset: () => void;
};

export function TaskToolbar({ filters, onChange, onReset }: Props) {
  const { data: categories = [] } = useTaskCategories();
  const hasActiveFilters = filters.search !== "" || filters.priority !== "" || filters.category !== "";

  return (
    <div className={styles.toolbar}>
      <TextField
        className={styles.search}
        label="Поиск"
        type="search"
        placeholder="Название или описание…"
        value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })}
      />

      <Select
        label="Приоритет"
        value={filters.priority}
        onChange={(e) => onChange({ priority: e.target.value as TaskPriority | "" })}
      >
        <option value="">Все</option>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {PRIORITY_LABELS[p]}
          </option>
        ))}
      </Select>

      <Select label="Категория" value={filters.category} onChange={(e) => onChange({ category: e.target.value })}>
        <option value="">Все</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>

      <Select label="Сортировка" value={filters.sort} onChange={(e) => onChange({ sort: e.target.value as TaskSort })}>
        {Object.entries(SORT_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" className={styles.reset} onClick={onReset}>
          Сбросить
        </Button>
      )}
    </div>
  );
}
