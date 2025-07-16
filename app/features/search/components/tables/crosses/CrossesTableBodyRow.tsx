import { memo } from "react";

import { SearchCounter } from "@/features/search/components/SearchCounter";
import { CrossesTableRowProps } from "@/features/search/types/crosses.types";

import { CameraAltIcon, InfoIcon } from "@/components/icons";
import {
  StyledTableCellBody,
  StyledTableRowBody
} from "@/components/styled/tables/StylesTables";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

import { useBasket } from "@/hooks/useBasket";

import { formatNumber } from "@/utils/format-number";

const CrossesTableRowComponent = ({
  cross,
  descr,
  properties,
  images,
  onOpenImageModal,
  onOpenInfoModal
}: CrossesTableRowProps) => {
  const { items, addItem, removeItem } = useBasket();

  const item = items.find(
    i => i.skuId === cross.skuId && i.supplierId === cross.supplierId
  );

  const count = item?.qty ?? 0;

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
            addItem({
              skuId: cross.skuId,
              supplierId: cross.supplierId,
              brand: cross.brand,
              article: cross.numberFix,
              description: descr || "Описание отсутствует",
              price: cross.price,
              qty: 1,
              selected: true
            })
          }
          onDecrement={() =>
            removeItem({ skuId: cross.skuId, supplierId: cross.supplierId })
          }
          onInputChange={() => {}}
        />
      </StyledTableCellBody>
    </StyledTableRowBody>
  );
};

CrossesTableRowComponent.displayName = "CrossesTableRow";

export const CrossesTableRow = memo(CrossesTableRowComponent);
