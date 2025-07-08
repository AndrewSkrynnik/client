import { FC } from "react";

import { BasketCounter } from "@/features/office/basket/components/BasketCounter";

import { CloseIcon } from "@/components/icons";
import {
  StyledTableCellBody,
  StyledTableRowBody
} from "@/components/styled/tables/StylesTables";
import { CheckboxComponent } from "@/components/ui/forms/inputs/CheckboxComponent";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

import { useBasketStore } from "@/store/useBasketStore";

import { formatNumber } from "@/utils/format-number";

interface BasketTableRowProps {
  id: string; // 🔹 передаём id напрямую
}

export const BasketTableRow: FC<BasketTableRowProps> = ({ id }) => {
  const item = useBasketStore(state => state.items.find(i => i.id === id));

  const removeItem = useBasketStore(state => state.removeItem);
  const selectItem = useBasketStore(state => state.selectItem);

  if (!item) return null;

  return (
    <StyledTableRowBody>
      <StyledTableCellBody>{item.brand}</StyledTableCellBody>
      <StyledTableCellBody>{item.number}</StyledTableCellBody>
      <StyledTableCellBody>{item.description}</StyledTableCellBody>
      <StyledTableCellBody>{formatNumber(item.price)}</StyledTableCellBody>
      <StyledTableCellBody>
        <BasketCounter id={item.id} number={item.number} brand={item.brand} />
      </StyledTableCellBody>
      <StyledTableCellBody>{formatNumber(item.totalPrice)}</StyledTableCellBody>
      <StyledTableCellBody sx={{ textAlign: "center" }}>
        <TooltipComponent title="Выбрать">
          <CheckboxComponent
            size="small"
            checked={item.selected ?? false}
            onChange={checked => selectItem(item.id, checked)} // ✅ по id
          />
        </TooltipComponent>
      </StyledTableCellBody>
      <StyledTableCellBody>
        <CloseIcon
          onClick={() => removeItem(item.id)} // ✅ по id
          fontSize="small"
          className="closeButton"
        />
      </StyledTableCellBody>
    </StyledTableRowBody>
  );
};
