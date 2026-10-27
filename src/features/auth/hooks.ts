"use client";

// Хуки авторизации (TanStack Query).
// useMe — текущий пользователь. После входа или регистрации кладём его в кэш сразу,
// чтобы не делать лишний запрос /me, и переходим на /tasks.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "./api";

export const meQueryKey = ["auth", "me"] as const;

export function useMe() {
  return useQuery({ queryKey: meQueryKey, queryFn: authApi.me });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      queryClient.setQueryData(meQueryKey, user);
      router.replace("/tasks");
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (user) => {
      queryClient.setQueryData(meQueryKey, user);
      router.replace("/tasks");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.logout,
    // Очищаем весь кэш, чтобы следующий вошедший пользователь не увидел чужие задачи.
    // onSettled срабатывает и при успехе, и при ошибке: выйти нужно в любом случае.
    onSettled: () => {
      queryClient.clear();
      router.replace("/login");
    },
  });
}
