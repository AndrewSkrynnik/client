"use client";

import { Paper, Table, TableContainer } from "@mui/material";

import { BasketEmpty } from "@/features/office/basket/components/BasketEmpty";
import { BasketTableBody } from "@/features/office/basket/components/tables/BasketTableBody";
import { BasketTableHead } from "@/features/office/basket/components/tables/BasketTableHead";

import { useBasketStore } from "@/store/useBasketStore";

export const BasketTable = () => {
  const items = useBasketStore(state => state.items);
  const hasHydrated = useBasketStore(state => state.hasHydrated);

  if (!hasHydrated) return <p>Загрузка корзины...</p>;
  if (items.length === 0) return <BasketEmpty />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <BasketTableHead />
        <BasketTableBody />
      </Table>
    </TableContainer>
  );
};
