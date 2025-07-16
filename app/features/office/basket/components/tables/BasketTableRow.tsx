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
          id={`${skuId}_${supplierId}`}
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
            onChange={() => toggleItemSelection(skuId, supplierId)}
          />
        </TooltipComponent>
      </StyledTableCellBody>
      <StyledTableCellBody>
        <CloseIcon
          onClick={() => deleteItem({ skuId, supplierId })} // 🔹 полное удаление
          fontSize="small"
          className="closeButton"
        />
      </StyledTableCellBody>
    </StyledTableRowBody>
  );
};
