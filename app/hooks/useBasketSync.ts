import { useEffect } from "react";

import { useBasketStore } from "@/store/useBasketStore";

export const useBasketSync = () => {
  const rehydrate = useBasketStore.persist?.rehydrate;
  const setHasHydrated = useBasketStore(state => state.setHasHydrated);

  useEffect(() => {
    rehydrate?.(); // загружает данные из localStorage
    setHasHydrated(true); // вручную устанавливаем флаг готовности
  }, [rehydrate, setHasHydrated]);
};
