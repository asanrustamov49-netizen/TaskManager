"use client";

// Хуки TanStack Query для задач.
//
// useQuery — загрузка данных: сам кэширует ответ и отдаёт { data, isPending, error }.
// useMutation — изменение данных: даёт функцию mutate() и флаг isPending.
//
// После каждого изменения вызываем invalidateQueries(["tasks"]): так всё, что закэшировано
// по ключам, начинающимся с "tasks" (списки и категории), загрузится заново.

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import { tasksApi } from "./api";
import type { TaskInput, TaskListParams } from "./types";

// Ключи кэша. У каждого набора параметров списка свой ключ и свой кэш.
export const tasksKeys = {
  all: ["tasks"] as const,
  list: (params: TaskListParams) => ["tasks", "list", params] as const,
  categories: ["tasks", "categories"] as const,
};

export function useTasks(params: TaskListParams) {
  return useQuery({
    queryKey: tasksKeys.list(params),
    queryFn: () => tasksApi.list(params),
    // Пока грузится новая страница или результат поиска, показываем старый список, а не пустоту.
    placeholderData: keepPreviousData,
  });
}

export function useTaskCategories() {
  return useQuery({ queryKey: tasksKeys.categories, queryFn: tasksApi.categories });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: TaskInput) => tasksApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });
      toast.success("Задача создана");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: TaskInput }) => tasksApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });
      toast.success("Изменения сохранены");
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tasksApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.all });
      toast.success("Задача удалена");
    },
    onError: (error) => toast.error(error.message),
  });
}
