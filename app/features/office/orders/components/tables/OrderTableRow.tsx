import { TableCell, TableRow } from "@mui/material";

import { orderStatusColors } from "@/features/office/orders/data/order-status-color.data";
import { OrderTableItem } from "@/features/office/orders/types";
import { getOrderSummary } from "@/features/office/orders/utils/orders-table";

import { ORDERS_TABLE_HEAD } from "@/data/table-header.data";

import { formatNumber } from "@/utils/format-number";

import { format } from "date-fns";

interface OrderTableRowProps {
  order: OrderTableItem;
  onSelect: (order: OrderTableItem) => void;
}

export const OrderTableRow = ({ order, onSelect }: OrderTableRowProps) => {
  const summary = getOrderSummary(order.details);

  return (
    <TableRow
      key={order.id}
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => onSelect(order)}
    >
      {ORDERS_TABLE_HEAD.map(({ key }) => {
        let value: string | number;

        if (key === "qty") {
          value = summary.qty;
        } else if (key === "totalPrice") {
          value = formatNumber(summary.total);
        } else if (key === "orderDate") {
          value = format(order.orderDate, "dd.MM.yyyy");
        } else {
          const raw = order[key];
          value =
            typeof raw === "string" || typeof raw === "number" ? raw : "-";
        }

        const color =
          key === "status" ? orderStatusColors[order.status] : undefined;

        return (
          <TableCell
            key={key}
            sx={{
              height: 48,
              padding: "8px",
              wordBreak: "break-word",
              textAlign: "center",
              ...(color && { color })
            }}
          >
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
