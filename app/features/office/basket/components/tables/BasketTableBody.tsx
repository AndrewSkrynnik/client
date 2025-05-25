import { TableBody } from "@mui/material";

import { BasketTableRow } from "@/features/office/basket/components/tables/BasketTableRow";

import { useBasketStore } from "@/store/useBasketStore";

export const BasketTableBody = () => {
  const items = useBasketStore(state => state.items);
  const hasHydrated = useBasketStore(state => state.hasHydrated);

  if (!hasHydrated) return null; // 👈 гарантируем, что items готовы

  return (
    <TableBody>
      {items.map(item => (
        <BasketTableRow
          key={`${item.brand}-${item.number}`}
          itemKey={{ brand: item.brand, number: item.number }}
        />
      ))}
    </TableBody>
  );
};
