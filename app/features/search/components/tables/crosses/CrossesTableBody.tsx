import { TableBody } from "@mui/material";

import { CrossesTableRow } from "@/features/search/components/tables/crosses/CrossesTableBodyRow";
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
}: CrossesTableBodyProps) => (
  <TableBody>
    {crosses.map((cross, index) => (
      <CrossesTableRow
        key={index}
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
