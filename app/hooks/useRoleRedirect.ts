import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/useAuthStore";

export function useRoleRedirect() {
  const { user, isAuthReady } = useAuthStore();
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    // Ждём, пока данные авторизации будут готовы
    if (!isAuthReady) return;

    // Если пользователь отсутствует, пропускаем логику
    if (!user) return;

    const redirect = () => {
      // Если роль "pending", перенаправляем на /confirmation
      if (user.role === "pending" && currentPath !== "/confirmation") {
        router.push("/confirmation");
      }

      // Если роль "user", не даём оставаться на /confirmation
      if (user.role === "user" && currentPath === "/confirmation") {
        router.push("/");
      }
    };

    redirect();
  }, [user, isAuthReady, router, currentPath]);
}
