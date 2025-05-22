import { TableBody } from "@mui/material";

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

export const BasketTableBody = () => {
  const items = useBasketStore(state => state.items);
  const removeItem = useBasketStore(state => state.removeItem);
  const selectItem = useBasketStore(state => state.selectItem);
  const updateCount = useBasketStore(state => state.updateCount);

  return (
    <TableBody>
      {items.map(item => (
        <StyledTableRowBody key={`${item.brand}-${item.number}`}>
          <StyledTableCellBody>{item.brand}</StyledTableCellBody>
          <StyledTableCellBody>{item.number}</StyledTableCellBody>
          <StyledTableCellBody>{item.description}</StyledTableCellBody>
          <StyledTableCellBody>{formatNumber(item.price)}</StyledTableCellBody>
          <StyledTableCellBody>
            <BasketCounter
              count={item.count}
              stock={item.stock}
              onChange={(newCount: number) =>
                updateCount(item.number, item.brand, newCount)
              }
            />
          </StyledTableCellBody>
          <StyledTableCellBody>
            {formatNumber(item.totalPrice)}
          </StyledTableCellBody>

          <StyledTableCellBody sx={{ textAlign: "center" }}>
            <TooltipComponent title="Выбрать">
              <CheckboxComponent
                size="small"
                checked={item.selected ?? false}
                onChange={checked =>
                  selectItem(item.number, item.brand, checked)
                }
              />
            </TooltipComponent>
          </StyledTableCellBody>

          <StyledTableCellBody>
            <CloseIcon
              onClick={() => removeItem(item.number, item.brand)}
              fontSize="small"
              className="closeButton"
            />
          </StyledTableCellBody>
        </StyledTableRowBody>
      ))}
    </TableBody>
  );
};
