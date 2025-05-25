"use client";

import { BasketSummary } from "@/features/office/basket/components/BasketSummary";
import { BasketTable } from "@/features/office/basket/components/tables/BasketTable";

import { useBasketSync } from "@/hooks/useBasketSync";

import { useBasketStore } from "@/store/useBasketStore";

export const BasketTemplate = () => {
  useBasketSync();

  const hasHydrated = useBasketStore(state => state.hasHydrated);
  const items = useBasketStore(state => state.items);

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
