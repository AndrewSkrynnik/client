"use client";

import { FC } from "react";

import { BasketTableHead } from "@/features/office/basket/components/tables/BasketTableHead";
import { BasketTableRow } from "@/features/office/basket/components/tables/BasketTableRow";

import { useBasket } from "@/hooks/useBasket";

interface BasketTableProps {
  selectedSet: Set<string>;
  setSelectedSet: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const BasketTable: FC<BasketTableProps> = ({
  selectedSet,
  setSelectedSet
}) => {
  const { items } = useBasket({ selectedSet, setSelectedSet });

  return (
    <table>
      <BasketTableHead
        selectedSet={selectedSet}
        setSelectedSet={setSelectedSet}
      />
      <tbody>
        {[...items]
          .sort((a, b) => a.hash.localeCompare(b.hash))
          .map(item => (
            <BasketTableRow
              key={`${item.skuId}_${item.supplierId}_${item.hash}`}
              skuId={item.skuId}
              supplierId={item.supplierId}
              brand={item.brand}
              description={item.description}
              number={item.article}
              hash={item.hash}
              selectedSet={selectedSet}
              setSelectedSet={setSelectedSet}
            />
          ))}
      </tbody>
    </table>
  );
};
