"use client";

import { useState } from "react";

import { BasketEmpty } from "@/features/office/basket/components/BasketEmpty";
import { BasketSummary } from "@/features/office/basket/components/BasketSummary";
import { BasketTable } from "@/features/office/basket/components/tables/BasketTable";

import { useBasket } from "@/hooks/useBasket";

export const BasketTemplate = () => {
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());

  const { items, isLoading } = useBasket({ selectedSet, setSelectedSet });

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div className="officePage">
      <h2 className="officePageTitle">Корзина</h2>
      <div className="officePageContent">
        {items.length > 0 ? (
          <>
            <BasketTable
              selectedSet={selectedSet}
              setSelectedSet={setSelectedSet}
            />
            <BasketSummary
              selectedSet={selectedSet}
              setSelectedSet={setSelectedSet}
            />
          </>
        ) : (
          <BasketEmpty />
        )}
      </div>
    </div>
  );
};
