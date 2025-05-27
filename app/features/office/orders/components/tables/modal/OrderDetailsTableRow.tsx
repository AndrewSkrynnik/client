import { TableCell, TableRow } from "@mui/material";

import { HighlightMatch } from "@/features/office/orders/components/HighlightMatch";
import { OrderDetailsItem } from "@/features/office/orders/types";

import { ORDERS_DETAILS_TABLE_HEAD } from "@/data/table-header.data";

import { formatNumber } from "@/utils/format-number";

interface OrderDetailsTableRowProps {
  item: OrderDetailsItem;
  highlightArticle?: string;
}

export const OrderDetailsTableRow = ({
  item,
  highlightArticle = ""
}: OrderDetailsTableRowProps) => (
  <TableRow>
    {ORDERS_DETAILS_TABLE_HEAD.map(({ key }) => (
      <TableCell key={key} align="center">
        {key === "article"
          ? HighlightMatch(item[key], highlightArticle)
          : typeof item[key] === "number"
            ? formatNumber(item[key] as number)
            : String(item[key] ?? "-")}
      </TableCell>
    ))}
  </TableRow>
);
