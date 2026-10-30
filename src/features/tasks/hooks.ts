"use client";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/toast";
import { tasksApi } from "./api";
import type { TaskInput, TaskListParams } from "./types";

export const tasksKeys = {
  all: ["tasks"] as const,
  list: (params: TaskListParams) => ["tasks", "list", params] as const,
  categories: ["tasks", "categories"] as const,
};
export function useTasks(params: TaskListParams) {
  return useQuery({
    queryKey: tasksKeys.list(params),
    queryFn: () => tasksApi.list(params),
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
