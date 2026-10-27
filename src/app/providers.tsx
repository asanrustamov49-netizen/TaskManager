"use client";

// Обёртка над всем приложением (подключена в app/layout.tsx):
// - QueryClientProvider: TanStack Query загружает данные с сервера и кэширует их;
// - Toaster: всплывающие уведомления.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/Toaster";
import { ApiError } from "@/lib/api";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000, // 30 секунд данные считаются свежими и не загружаются повторно
        // Повторяем запрос не больше двух раз и только при ошибке сервера (5xx) или сети.
        // Ошибки 4xx (нет входа, неверные данные) от повтора не исправятся.
        retry: (failureCount, error) =>
          !(error instanceof ApiError && error.status < 500) && failureCount < 2,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  // На сервере новый клиент для каждого запроса, чтобы данные разных пользователей не смешивались.
  // В браузере один клиент на всё время работы страницы, чтобы кэш не терялся.
  if (typeof window === "undefined") return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
