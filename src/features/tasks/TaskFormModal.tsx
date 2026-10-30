"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";
import { TextField } from "@/components/ui/TextField";
import { PRIORITIES, PRIORITY_LABELS } from "./constants";
import { useCreateTask, useTaskCategories, useUpdateTask } from "./hooks";
import { taskFormSchema, type TaskFormValues } from "./schemas";
import styles from "./TaskFormModal.module.css";
import type { Task } from "./types";

type Props = {
  task?: Task;
  onClose: () => void;
};

export function TaskFormModal({ task, onClose }: Props) {
  const isEdit = task !== undefined;
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const { data: categories = [] } = useTaskCategories();
  const isSaving = createTask.isPending || updateTask.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      priority: task?.priority ?? "medium",
      category: task?.category ?? "",
    },
  });

  function onSubmit(values: TaskFormValues) {
    const input = { ...values, category: values.category || null }; 
    if (isEdit) {
      updateTask.mutate({ id: task.id, input }, { onSuccess: onClose });
    } else {
      createTask.mutate(input, { onSuccess: onClose });
    }
  }

  return (
    <Modal title={isEdit ? "Редактировать задачу" : "Новая задача"} onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Название"
          placeholder="Например, купить продукты"
          autoFocus
          error={errors.title?.message}
          {...register("title")}
        />

        <TextArea
          label="Описание"
          placeholder="Подробности, если нужны"
          error={errors.description?.message}
          {...register("description")}
        />

        <div className={styles.row}>
          <Select label="Приоритет" {...register("priority")}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABELS[p]}
              </option>
            ))}
          </Select>

          <TextField
            label="Категория"
            placeholder="Работа, Дом…"
            list="task-categories"
            autoComplete="off"
            error={errors.category?.message}
            {...register("category")}
          />
          <datalist id="task-categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Сохраняем…" : isEdit ? "Сохранить" : "Создать"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
