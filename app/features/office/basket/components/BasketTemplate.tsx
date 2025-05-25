"use client";

import { useEffect } from "react";

import { BasketSummary } from "@/features/office/basket/components/BasketSummary";
import { BasketTable } from "@/features/office/basket/components/tables/BasketTable";

import { useBasketStore } from "@/store/useBasketStore";

export const BasketTemplate = () => {
  const hasHydrated = useBasketStore(state => state.hasHydrated);
  const rehydrate = useBasketStore.persist?.rehydrate;
  const items = useBasketStore(state => state.items); // 👈 ВЫЗВАН ДО return/if

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "basket-storage") {
        rehydrate?.();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [rehydrate]);

  if (!hasHydrated) return <p>Загрузка...</p>;

  return (
    <div className="officePage">
      <h2 className="officePageTitle">Корзина</h2>
      <div className="officePageContent">
        <BasketTable />
        {items.length > 0 && <BasketSummary />}
      </div>
    </div>
  );
};
