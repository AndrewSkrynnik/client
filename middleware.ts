import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Получаем токен и роль из cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  // --- Запрещаем маршрут "/" для авторизованных пользователей ---
  if (pathname === "/") {
    if (!accessToken) {
      console.log("Redirecting unauthorized user from / to /auth");
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    // Авторизованные пользователи остаются на "/"
    return NextResponse.next();
  }

  // --- Маршруты, доступные для всех пользователей ---
  const publicRoutes = ["/forgot-password", "/reset-password", "/info"];

  if (
    publicRoutes.some(route => pathname === route || pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // --- Если токен отсутствует, разрешаем только /auth ---
  if (!accessToken) {
    if (pathname !== "/auth") {
      console.log("Redirecting to /auth due to missing accessToken");
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }

  // --- Если авторизованный пользователь пытается попасть на /auth ---
  if (pathname === "/auth") {
    console.log("Redirecting to / due to already authenticated user");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // --- Если роль "pending", разрешаем только /confirmation и /info/* ---
  if (userRole === "pending") {
    if (pathname !== "/confirmation" && !pathname.startsWith("/info")) {
      console.log("Redirecting to /confirmation due to pending role");
      return NextResponse.redirect(new URL("/confirmation", request.url));
    }
    return NextResponse.next();
  }

  // --- Если роль "user", запрещаем доступ к /confirmation и /auth ---
  if (userRole === "user") {
    if (pathname === "/confirmation" || pathname === "/auth") {
      console.log("Redirecting to / due to user role restriction");
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // все пути, кроме API, _next, статики, favicon, sitemap, robots и проверочных HTML
    "/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|google273306f69acdefef\\.html|yandex_76be64e45a69686b\\.html).*)"
  ]
};
