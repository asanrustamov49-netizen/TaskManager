// Главная страница "/" сразу перенаправляет на список задач.

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/tasks");
}
