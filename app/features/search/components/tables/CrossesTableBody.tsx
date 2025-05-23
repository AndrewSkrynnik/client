import { TableBody } from "@mui/material";
import { FC } from "react";

import { CrossesTableRow } from "@/features/search/components/tables/CrossesTableBodyRow";

interface Cross {
  brand: string;
  numberFix: string;
  price: string;
  stock: number;
  count: number;
}

interface CrossesTableBodyProps {
  crosses: Cross[];
  descr?: string;
  properties?: Record<string, string>;
  images?: { url: string }[];
  onUpdateCount: (index: number, value: number) => void;
  onOpenImageModal: (url: string) => void;
  onOpenInfoModal: (info: Record<string, string>) => void;
  onAddToCart: (index: number) => void;
}

export const CrossesTableBody: FC<CrossesTableBodyProps> = ({
  crosses,
  descr,
  properties,
  images,
  onUpdateCount,
  onOpenImageModal,
  onOpenInfoModal,
  onAddToCart
}) => (
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
