import { api } from "@/lib/api";
import type { LoginValues } from "./schemas";

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

type UserResponse = { user: User };

export const authApi = {
  me: () => api<UserResponse>("/auth/me").then((r) => r.user),
  login: (body: LoginValues) =>
    api<UserResponse>("/auth/login", { method: "POST", body: JSON.stringify(body) }).then((r) => r.user),
  register: (body: LoginValues) =>
    api<UserResponse>("/auth/register", { method: "POST", body: JSON.stringify(body) }).then((r) => r.user),
  logout: () => api<void>("/auth/logout", { method: "POST" }),
};
