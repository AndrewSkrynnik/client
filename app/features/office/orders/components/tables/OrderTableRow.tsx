import { TableCell, TableRow } from "@mui/material";

import { orderStatusColors } from "@/features/office/orders/data/order-status-color.data";
import { OrderTableItem } from "@/features/office/orders/types";

import { ORDERS_TABLE_HEAD } from "@/data/table-header.data";

import { formatNumber } from "@/utils/format-number";

import { format } from "date-fns";

interface OrderTableRowProps {
  order: OrderTableItem;
  onSelect: (order: OrderTableItem) => void;
}

export const OrderTableRow = ({ order, onSelect }: OrderTableRowProps) => {
  console.log("📦 Order row:", order); // 👈 логируем весь объект
  const totalQty = order.details.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = order.details.reduce(
    (sum, item) => sum + item.clientPrice * item.qty,
    0
  );

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
          value = totalQty;
        } else if (key === "totalPrice") {
          value = formatNumber(totalPrice);
        } else if (key === "orderDate") {
          const date = new Date(order.orderDate);
          value = isNaN(date.getTime()) ? "-" : format(date, "dd.MM.yyyy");
        } else if (key === "id") {
          value = order.orderNumber ?? order.id;
        } else {
          const raw = order[key];
          value =
            typeof raw === "string" || typeof raw === "number" ? raw : "-";
        }

        const color =
          key === "status"
            ? (orderStatusColors[order.status] ?? undefined)
            : undefined;

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
