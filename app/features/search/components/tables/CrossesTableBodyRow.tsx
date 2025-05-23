import { memo } from "react";

import { CartTotal } from "@/features/search/components/CartTotal";
import { SearchCounter } from "@/features/search/components/SearchCounter";
import { CrossesTableRowProps } from "@/features/search/types/crosses.types";

import { CameraAltIcon, InfoIcon } from "@/components/icons";
import {
  StyledTableCellBody,
  StyledTableRowBody
} from "@/components/styled/tables/StylesTables";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

const CrossesTableRowComponent = ({
  index,
  cross,
  descr,
  properties,
  images,
  onUpdateCount,
  onOpenImageModal,
  onOpenInfoModal,
  onAddToCart
}: CrossesTableRowProps) => (
  <StyledTableRowBody>
    <StyledTableCellBody>{cross.brand}</StyledTableCellBody>
    <StyledTableCellBody>{cross.numberFix}</StyledTableCellBody>
    <StyledTableCellBody>{descr || "Описание отсутствует"}</StyledTableCellBody>
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
    <StyledTableCellBody>{cross.price}</StyledTableCellBody>
    <StyledTableCellBody>{cross.stock}</StyledTableCellBody>
    <StyledTableCellBody>
      <SearchCounter
        count={cross.count}
        stock={cross.stock}
        price={cross.price}
        onChange={value => onUpdateCount(index, value)}
      />
    </StyledTableCellBody>
    <StyledTableCellBody>
      <CartTotal count={cross.count} onAddToCart={() => onAddToCart(index)} />
    </StyledTableCellBody>
  </StyledTableRowBody>
);

CrossesTableRowComponent.displayName = "CrossesTableRow";

export const CrossesTableRow = memo(
  CrossesTableRowComponent,
  (prev, next) =>
    prev.cross.count === next.cross.count &&
    prev.cross.stock === next.cross.stock &&
    prev.cross.price === next.cross.price
);
