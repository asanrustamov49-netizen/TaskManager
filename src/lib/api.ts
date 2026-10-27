// Все запросы к бэкенду идут через функцию api().
//
// Адреса начинаются с /api. Next.js (next.config.ts) пересылает их на Express (порт 4000),
// поэтому браузер общается только с localhost:3000 и cookie с токеном отправляется автоматически.
//
// Если бэкенд ответил ошибкой, api() бросает ApiError. В error.message лежит русский текст
// от сервера, его можно сразу показать пользователю.

export class ApiError extends Error {
  constructor(
    public status: number, // HTTP-статус: 400, 401, 404, 500…
    message: string,
  ) {
    super(message);
  }
}

// Пример: api<{ task: Task }>("/tasks", { method: "POST", body: JSON.stringify(data) })
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body !== undefined) headers.set("Content-Type", "application/json");

  let res: Response;
  try {
    res = await fetch(`/api${path}`, { ...init, headers });
  } catch {
    // fetch падает, только если запрос вообще не дошёл (нет сети, сервер выключен).
    throw new ApiError(0, "Нет связи с сервером");
  }

  if (!res.ok) {
    // Бэкенд всегда отвечает на ошибку телом { error: "..." }.
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new ApiError(res.status, body?.error ?? "Не удалось выполнить запрос");
  }

  if (res.status === 204) return undefined as T; // 204 — успех без тела (например, удаление)
  return (await res.json()) as T;
}
