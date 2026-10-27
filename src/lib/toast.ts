// Всплывающие уведомления (тосты). Показать из любого места кода:
//   toast.success("Задача создана")
//   toast.error("Не удалось сохранить")
// Список тостов хранится в Zustand-хранилище, а на экран его выводит компонент <Toaster /> (components/ui/Toaster.tsx).

import { create } from "zustand";

export type ToastType = "success" | "error";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastStore {
  toasts: Toast[];
  show: (type: ToastType, message: string) => void;
  hide: (id: number) => void;
}

const TOAST_DURATION_MS = 3500;
let nextId = 1;

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  show: (type, message) => {
    const id = nextId++;
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
    // Через несколько секунд тост исчезает сам.
    setTimeout(() => get().hide(id), TOAST_DURATION_MS);
  },

  hide: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

// Короткие функции, чтобы не писать каждый раз useToastStore.getState().show(...).
export const toast = {
  success: (message: string) => useToastStore.getState().show("success", message),
  error: (message: string) => useToastStore.getState().show("error", message),
};
