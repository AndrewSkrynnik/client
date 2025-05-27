import { useEffect } from "react";

import { useOrderStore } from "@/store/useOrderStore";

export const useOrderSync = () => {
  useEffect(() => {
    const { setState, getState } = useOrderStore;

    // 1. Установка hasHydrated
    setState({ hasHydrated: true });

    // 2. Слушатель для синхронизации
    const handler = (event: StorageEvent) => {
      if (event.key !== "order-storage") return;

      try {
        const newData = JSON.parse(event.newValue || "{}");
        const newOrders = newData?.state?.orders;
        const currentOrders = getState().orders;

        const changed =
          JSON.stringify(currentOrders) !== JSON.stringify(newOrders);

        if (changed && Array.isArray(newOrders)) {
          setState({ orders: newOrders });
        }
      } catch (e) {
        console.warn("Ошибка синхронизации заказов", e);
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
};
