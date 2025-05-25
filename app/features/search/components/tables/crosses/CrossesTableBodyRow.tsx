import { memo } from "react";

import { SearchCounter } from "@/features/search/components/SearchCounter";
import { CrossesTableRowProps } from "@/features/search/types/crosses.types";

import { CameraAltIcon, InfoIcon } from "@/components/icons";
import {
  StyledTableCellBody,
  StyledTableRowBody
} from "@/components/styled/tables/StylesTables";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

import { useBasketStore } from "@/store/useBasketStore";

import { formatNumber } from "@/utils/format-number";

const CrossesTableRowComponent = ({
  cross,
  descr,
  properties,
  images,
  onOpenImageModal,
  onOpenInfoModal
}: CrossesTableRowProps) => {
  const increment = useBasketStore(state => state.incrementItemCount);
  const decrement = useBasketStore(state => state.decrementItemCount);
  const update = useBasketStore(state => state.updateCount);

  const count = useBasketStore(
    state =>
      state.items.find(
        i => i.number === cross.numberFix && i.brand === cross.brand
      )?.count ?? 0
  );

  return (
    <StyledTableRowBody>
      <StyledTableCellBody>{cross.brand}</StyledTableCellBody>
      <StyledTableCellBody>{cross.numberFix}</StyledTableCellBody>
      <StyledTableCellBody>
        {descr || "Описание отсутствует"}
      </StyledTableCellBody>
      <StyledTableCellBody>
        <div className="flex justify-center gap-2">
          <TooltipComponent title="Информация о товаре">
            <InfoIcon
              onClick={() => onOpenInfoModal(properties ?? {})}
              className="closeButton"
            />
          </TooltipComponent>
          {images?.[0]?.url && (
            <TooltipComponent title="Просмотр изображения">
              <CameraAltIcon
                onClick={() => onOpenImageModal(images[0].url)}
                className="closeButton"
              />
            </TooltipComponent>
          )}
        </div>
      </StyledTableCellBody>
      <StyledTableCellBody>{formatNumber(cross.price)}</StyledTableCellBody>
      <StyledTableCellBody>{cross.stock}</StyledTableCellBody>
      <StyledTableCellBody>
        <SearchCounter
          count={count}
          stock={cross.stock}
          price={cross.price}
          onIncrement={() =>
            increment({
              brand: cross.brand,
              number: cross.numberFix,
              description: descr || "Описание отсутствует",
              price: cross.price,
              stock: cross.stock,
              count: 1
            })
          }
          onDecrement={() => decrement(cross.numberFix, cross.brand)}
          onInputChange={value => update(cross.numberFix, cross.brand, value)}
        />
      </StyledTableCellBody>
    </StyledTableRowBody>
  );
};

CrossesTableRowComponent.displayName = "CrossesTableRow";

export const CrossesTableRow = memo(
  CrossesTableRowComponent,
  (prev, next) =>
    prev.cross.brand === next.cross.brand &&
    prev.cross.numberFix === next.cross.numberFix &&
    prev.cross.price === next.cross.price &&
    prev.cross.stock === next.cross.stock
);
