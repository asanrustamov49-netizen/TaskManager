import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Введите название")
    .max(200, "Название должно быть не длиннее 200 символов"),
  description: z.string().trim().max(5000, "Описание должно быть не длиннее 5000 символов"),
  priority: z.enum(["low", "medium", "high"]),
  category: z.string().trim().max(50, "Категория должна быть не длиннее 50 символов"),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
