import { useEffect } from "react";

import { useOrderStore } from "@/store/useOrderStore";

export const useOrderSync = () => {
  const set = useOrderStore.setState;
  const get = useOrderStore.getState;

  useEffect(() => {
    // 1. Пометить, что store готов
    set({ hasHydrated: true });

    // 2. Слушать события из других вкладок
    const handler = (event: StorageEvent) => {
      if (event.key !== "order-storage") return;

      try {
        const newData = JSON.parse(event.newValue || "{}");
        const newOrders = newData?.state?.orders;
        const currentOrders = get().orders;

        const changed =
          JSON.stringify(currentOrders) !== JSON.stringify(newOrders);

        if (changed && Array.isArray(newOrders)) {
          set({ orders: newOrders });
        }
      } catch (e) {
        console.warn("Ошибка синхронизации заказов", e);
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
};
