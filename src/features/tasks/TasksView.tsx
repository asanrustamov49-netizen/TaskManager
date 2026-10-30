"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { useTasks } from "./hooks";
import { Pagination } from "./Pagination";
import { TaskFormModal } from "./TaskFormModal";
import { TaskRow } from "./TaskRow";
import { TaskToolbar } from "./TaskToolbar";
import styles from "./TasksView.module.css";
import type { Task, TaskFilters } from "./types";

const DEFAULT_FILTERS: TaskFilters = { search: "", priority: "", category: "", sort: "newest" };

type OpenModal = { type: "none" } | { type: "create" } | { type: "edit"; task: Task } | { type: "delete"; task: Task };

export function TasksView() {
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [modal, setModal] = useState<OpenModal>({ type: "none" });

  const search = useDebouncedValue(filters.search, 300);
  const { data, isPending, isError, error, isPlaceholderData } = useTasks({ ...filters, search, page, limit });

  function changeFilters(changes: Partial<TaskFilters>) {
    setFilters((current) => ({ ...current, ...changes }));
    setPage(1);
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }

  function changeLimit(newLimit: number) {
    setLimit(newLimit);
    setPage(1);
  }

  function handleDeleted() {
    if (data && data.tasks.length === 1 && page > 1) setPage(page - 1);
  }

  const closeModal = () => setModal({ type: "none" });
  const hasFilters = filters.search !== "" || filters.priority !== "" || filters.category !== "";

  return (
    <main className={styles.page}>
      <div className={styles.heading}>
        <div>
          <h1 className={styles.title}>Мои задачи</h1>
          {data && <p className={styles.subtitle}>{countLabel(data.pagination.total, hasFilters)}</p>}
        </div>
        <Button onClick={() => setModal({ type: "create" })}>+ Новая задача</Button>
      </div>

      <TaskToolbar filters={filters} onChange={changeFilters} onReset={resetFilters} />

      {isPending && <ListSkeleton />}

      {isError && <p className={styles.error}>Не удалось загрузить задачи: {error.message}</p>}

      {data && data.tasks.length === 0 && (
        <div className={styles.empty}>
          {hasFilters ? (
            <>
              <p className={styles.emptyTitle}>Ничего не найдено</p>
              <p>Попробуйте изменить поиск или фильтры.</p>
              <Button variant="secondary" onClick={resetFilters}>
                Сбросить фильтры
              </Button>
            </>
          ) : (
            <>
              <p className={styles.emptyTitle}>Задач пока нет</p>
              <p>Создайте первую задачу — она появится здесь.</p>
              <Button onClick={() => setModal({ type: "create" })}>+ Новая задача</Button>
            </>
          )}
        </div>
      )}

      {data && data.tasks.length > 0 && (
        <>
          <ul className={`${styles.list} ${isPlaceholderData ? styles.loading : ""}`}>
            {data.tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onEdit={(t) => setModal({ type: "edit", task: t })}
                onDelete={(t) => setModal({ type: "delete", task: t })}
              />
            ))}
          </ul>
          <Pagination pagination={data.pagination} onPageChange={setPage} onLimitChange={changeLimit} />
        </>
      )}

      {modal.type === "create" && <TaskFormModal onClose={closeModal} />}
      {modal.type === "edit" && <TaskFormModal task={modal.task} onClose={closeModal} />}
      {modal.type === "delete" && <DeleteTaskModal task={modal.task} onClose={closeModal} onDeleted={handleDeleted} />}
    </main>
  );
}

function countLabel(count: number, filtered: boolean): string {
  const word = new Intl.PluralRules("ru").select(count);
  const forms: Record<string, string> = { one: "задача", few: "задачи", many: "задач", other: "задачи" };
  return `${filtered ? "Найдено" : "Всего"}: ${count} ${forms[word]}`;
}

function ListSkeleton() {
  return (
    <ul className={styles.list} aria-label="Загрузка">
      {[1, 2, 3].map((i) => (
        <li key={i} className={styles.skeleton} />
      ))}
    </ul>
  );
}
