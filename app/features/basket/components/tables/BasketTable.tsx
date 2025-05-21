"use client";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from "@mui/material";

import { CloseIcon } from "@/components/icons";
import {
  StyledTableCellBody,
  StyledTableCellHead,
  StyledTableRowBody,
  StyledTableRowHead
} from "@/components/styled/tables/StylesTables";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

import { useBasketStore } from "@/store/useBasketStore";

export const BasketTable = () => {
  const items = useBasketStore(state => state.items);
  const hasHydrated = useBasketStore(state => state.hasHydrated);
  const removeItem = useBasketStore(state => state.removeItem);

  if (!hasHydrated) {
    return <p>Загрузка корзины...</p>;
  }

  if (items.length === 0) {
    return <p>Корзина пуста</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRowHead>
            <StyledTableCellHead>Бренд</StyledTableCellHead>
            <StyledTableCellHead>Артикул</StyledTableCellHead>
            <StyledTableCellHead>Описание</StyledTableCellHead>
            <StyledTableCellHead>Цена</StyledTableCellHead>
            <StyledTableCellHead>Кол-во (шт.)</StyledTableCellHead>
            <StyledTableCellHead>Сумма</StyledTableCellHead>
            <StyledTableCellHead />
          </StyledTableRowHead>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <StyledTableRowBody key={`${item.brand}-${item.number}`}>
              <StyledTableCellBody>{item.brand}</StyledTableCellBody>
              <StyledTableCellBody>{item.number}</StyledTableCellBody>
              <StyledTableCellBody>{item.description}</StyledTableCellBody>
              <StyledTableCellBody>{item.price.toFixed(2)}</StyledTableCellBody>
              <StyledTableCellBody>{item.count}</StyledTableCellBody>
              <StyledTableCellBody>
                {item.totalPrice.toFixed(2)}
              </StyledTableCellBody>
              <StyledTableCellBody>
                <TooltipComponent title="Удалить">
                  <CloseIcon
                    onClick={() => removeItem(item.number, item.brand)}
                    fontSize="small"
                    className="closeButton"
                  />
                </TooltipComponent>
              </StyledTableCellBody>
            </StyledTableRowBody>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
