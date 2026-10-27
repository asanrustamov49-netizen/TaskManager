import { NextResponse, type NextRequest } from "next/server";

// proxy.ts — так в Next.js 16 называется middleware. Код выполняется на сервере до открытия страницы.
// Без cookie "token" сразу отправляем с /tasks на /login.
// Действителен ли токен, здесь не проверяем: это делает AuthGuard через /api/auth/me.
// Важно: не перенаправляйте отсюда с /login на /tasks, если cookie есть. Если токен устарел,
// AuthGuard вернёт на /login, proxy снова на /tasks — получится бесконечный цикл.
export function proxy(request: NextRequest) {
  if (!request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*"],
};
