"use client";

// Окно «Удалить задачу?» с кнопками «Отмена» и «Удалить».

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import styles from "./DeleteTaskModal.module.css";
import { useDeleteTask } from "./hooks";
import type { Task } from "./types";

type Props = {
  task: Task;
  onClose: () => void;
  onDeleted: () => void; // вызывается после успешного удаления
};

export function DeleteTaskModal({ task, onClose, onDeleted }: Props) {
  const deleteTask = useDeleteTask();

  function handleDelete() {
    deleteTask.mutate(task.id, {
      onSuccess: () => {
        onDeleted();
        onClose();
      },
    });
  }

  return (
    <Modal title="Удалить задачу?" onClose={onClose}>
      <p className={styles.text}>
        Задача <strong>«{task.title}»</strong> будет удалена. Это действие нельзя отменить.
      </p>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onClose} autoFocus>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={deleteTask.isPending}>
          {deleteTask.isPending ? "Удаляем…" : "Удалить"}
        </Button>
      </div>
    </Modal>
  );
}
