import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

// Импортируем хук useAuth
import { useAuthStore } from "@/store/useAuthStore";

export function useRoleChangeHandler() {
  const { logoutMutation } = useAuth(); // Берём logoutMutation из useAuth
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const store = useAuthStore.getState(); // Получаем начальное состояние
    let currentRole = store.user?.role; // Сохраняем текущую роль пользователя

    // Подписываемся на изменения состояния
    const unsubscribe = useAuthStore.subscribe(state => {
      const newRole = state.user?.role;

      if (newRole && newRole !== currentRole) {
        console.log("Role changed, performing logout...");
        logoutMutation.mutate(); // Вызываем логаут через react-query
        currentRole = newRole; // Обновляем текущую роль
      }
    });

    return () => {
      console.log("Cleaning up role change subscription...");
      unsubscribe(); // Отписываемся при размонтировании
    };
  }, [logoutMutation]);
}
