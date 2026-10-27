import { z } from "zod";

// Правила проверки форм входа и регистрации.
// Повторяют credentialsSchema в backend/src/controllers/auth.controller.ts — меняйте их вместе.
export const loginSchema = z.object({
  email: z.email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен быть не короче 6 символов"),
});

export const registerSchema = loginSchema
  .extend({ confirmPassword: z.string() })
  // refine — дополнительная проверка: оба пароля должны совпадать. Ошибка показывается под полем confirmPassword.
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
