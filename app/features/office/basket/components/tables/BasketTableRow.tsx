"use client";

import { FC } from "react";

import { BasketCounter } from "@/features/office/basket/components/BasketCounter";

import { CloseIcon } from "@/components/icons";
import {
  StyledTableCellBody,
  StyledTableRowBody
} from "@/components/styled/tables/StylesTables";
import { CheckboxComponent } from "@/components/ui/forms/inputs/CheckboxComponent";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

import { useBasket } from "@/hooks/useBasket";

import { formatNumber } from "@/utils/format-number";

interface BasketTableRowProps {
  skuId: number;
  supplierId: number;
  brand: string;
  number: string;
  hash: string;
  description: string;
  selectedSet: Set<string>;
  setSelectedSet: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const BasketTableRow: FC<BasketTableRowProps> = ({
  skuId,
  supplierId,
  selectedSet,
  setSelectedSet
}) => {
  const { items, deleteItem, toggleItemSelection } = useBasket({
    selectedSet,
    setSelectedSet
  });

  const item = items.find(
    i => i.skuId === skuId && i.supplierId === supplierId
  );

  if (!item) return null;
  const { hash } = item; // ❗️добавь обязательно

  return (
    <StyledTableRowBody>
      <StyledTableCellBody>{item.brand}</StyledTableCellBody>
      <StyledTableCellBody>{item.article}</StyledTableCellBody>
      <StyledTableCellBody>{item.description}</StyledTableCellBody>
      <StyledTableCellBody>{formatNumber(item.price)}</StyledTableCellBody>
      <StyledTableCellBody>
        <BasketCounter
          skuId={skuId}
          supplierId={supplierId}
          hash={hash} // ✅ обязательно
          id={`${skuId}_${supplierId}_${hash}`}
          brand={item.brand}
          number={item.article}
        />
      </StyledTableCellBody>
      <StyledTableCellBody>
        {formatNumber(item.price * item.qty)} ₽
      </StyledTableCellBody>
      <StyledTableCellBody sx={{ textAlign: "center" }}>
        <TooltipComponent title="Выбрать">
          <CheckboxComponent
            size="small"
            checked={item.selected ?? false}
            onChange={() => {
              toggleItemSelection(skuId, supplierId, hash);
            }}
          />
        </TooltipComponent>
      </StyledTableCellBody>
      <StyledTableCellBody>
        <CloseIcon
          onClick={() => {
            console.log("🗑 Удаление товара:", { skuId, supplierId, hash });
            deleteItem({ skuId, supplierId, hash });
          }}
          fontSize="small"
          className="closeButton"
        />
      </StyledTableCellBody>
    </StyledTableRowBody>
  );
};
