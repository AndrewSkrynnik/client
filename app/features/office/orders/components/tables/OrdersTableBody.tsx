import { TableBody, TableCell, TableRow } from "@mui/material";

import { OrderTableRow } from "@/features/office/orders/components/tables/OrderTableRow";
import { OrderTableItem } from "@/features/office/orders/types";

import { ORDERS_TABLE_HEAD } from "@/data/table-header.data";

interface OrdersTableBodyProps {
  orders: OrderTableItem[];
  onSelect: (order: OrderTableItem) => void;
}

export const OrdersTableBody = ({ orders, onSelect }: OrdersTableBodyProps) => (
  <TableBody>
    {orders.length === 0 ? (
      <TableRow>
        <TableCell colSpan={ORDERS_TABLE_HEAD.length} align="center">
          У Вас пока нет заказов
        </TableCell>
      </TableRow>
    ) : (
      orders.map(order => (
        <OrderTableRow key={order.id} order={order} onSelect={onSelect} />
      ))
    )}
  </TableBody>
);
