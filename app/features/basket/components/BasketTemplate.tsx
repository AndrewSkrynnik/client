"use client";

import { BasketSummary } from "@/features/basket/components/BasketSummary";
import { BasketTable } from "@/features/basket/components/tables/BasketTable";

import { useBasketStore } from "@/store/useBasketStore";

export const BasketTemplate = () => {
  const items = useBasketStore(state => state.items);

  const hasHydrated = useBasketStore(state => state.hasHydrated);

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
