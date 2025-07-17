"use client";

import { TableBody } from "@mui/material";
import { FC } from "react";

import { BasketTableRow } from "@/features/office/basket/components/tables/BasketTableRow";

import { useBasket } from "@/hooks/useBasket";

interface BasketTableBodyProps {
  selectedSet: Set<string>;
  setSelectedSet: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const BasketTableBody: FC<BasketTableBodyProps> = ({
  selectedSet,
  setSelectedSet
}) => {
  const { items, isLoading } = useBasket({ selectedSet, setSelectedSet });

  if (isLoading) return null;

  return (
    <TableBody>
      {[...items]
        .filter(item => item.skuId && item.supplierId && item.hash)
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
    </TableBody>
  );
};
