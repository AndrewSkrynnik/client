import { DeleteForeverIcon } from "@/components/icons";
import {
  StyledTableCellHead,
  StyledTableRowHead
} from "@/components/styled/tables/StylesTables";
import { CheckboxComponent } from "@/components/ui/forms/inputs/CheckboxComponent";

import { BASKET_TABLE } from "@/data/table-header.data";

import { useBasketStore } from "@/store/useBasketStore";

export const BasketTableHead = () => {
  const items = useBasketStore(state => state.items);
  const selectAll = useBasketStore(state => state.selectAll);
  const clearCart = useBasketStore(state => state.clearCart);

  return (
    <thead>
      <StyledTableRowHead>
        {BASKET_TABLE.map(itemHead => (
          <StyledTableCellHead key={itemHead.id}>
            {itemHead.id === 6 ? (
              <CheckboxComponent
                checked={items.every(item => item.selected)}
                onChange={checked => selectAll(checked)}
                size="large"
              />
            ) : itemHead.id === 7 ? (
              <DeleteForeverIcon
                className="closeButton"
                fontSize="medium"
                onClick={clearCart}
              />
            ) : (
              itemHead.label
            )}
          </StyledTableCellHead>
        ))}
      </StyledTableRowHead>
    </thead>
  );
};
