import { useEffect } from "react";

import { useBasketStore } from "@/store/useBasketStore";

/**
 * Хук для синхронизации Zustand-корзины между страницами/вкладками.
 * Слушает событие обновления localStorage и вызывает rehydrate() для актуализации данных.
 */
export const useBasketSync = () => {
  const rehydrate = useBasketStore.persist?.rehydrate;

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "basket-storage") {
        rehydrate?.();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [rehydrate]);
};
