import { TableBody } from "@mui/material";

import { CrossesTableRow } from "@/features/search/components/tables/crosses/CrossesTableRow";
import { CrossesTableBodyProps } from "@/features/search/types/crosses.types";

export const CrossesTableBody = ({
  crosses,
  descr,
  properties,
  images,
  onUpdateCount,
  onOpenImageModal,
  onOpenInfoModal,
  onAddToCart
}: CrossesTableBodyProps) => {
  const sortedCrosses = [...crosses].sort((a, b) => {
    const aKey = `${a.skuId}_${a.supplierId}`;
    const bKey = `${b.skuId}_${b.supplierId}`;
    return aKey.localeCompare(bKey);
  });

  return (
    <TableBody>
      {sortedCrosses.map((cross, index) => (
        <CrossesTableRow
          key={`${cross.skuId}_${cross.supplierId}`}
          index={index}
          cross={cross}
          descr={descr}
          properties={properties}
          images={images}
          onUpdateCount={onUpdateCount}
          onOpenImageModal={onOpenImageModal}
          onOpenInfoModal={onOpenInfoModal}
          onAddToCart={onAddToCart}
        />
      ))}
    </TableBody>
  );
};
