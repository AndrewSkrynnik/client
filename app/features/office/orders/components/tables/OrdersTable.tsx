"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useState } from "react";

import { getOrderSummary } from "@/features/office/orders/common/orders-table.utils";
import { OrderInfo } from "@/features/office/orders/components/OrderInfo";
import { OrderDetailsTable } from "@/features/office/orders/components/tables/OrderDetailsTable";
import { orderStatusColors } from "@/features/office/orders/data/order-status-color.data";
import { ordersTableColumns } from "@/features/office/orders/data/orders-table.columns";
import { formatCurrency } from "@/features/office/orders/data/orders-table.format";
import {
  OrderTableItem,
  OrdersTableProps
} from "@/features/office/orders/types";

import { ModalComponent } from "@/components/ui/modal/ModalComponent";

import { format } from "date-fns";

export const OrdersTable = ({
  orders,
  highlightArticle = ""
}: OrdersTableProps & { highlightArticle?: string }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderTableItem | null>(
    null
  );

  const handleClose = () => setSelectedOrder(null);

  const renderOrdersBody = (
    orders: OrderTableItem[],
    setSelectedOrder: (order: OrderTableItem) => void
  ) => {
    if (!orders.length) {
      return (
        <TableRow>
          <TableCell colSpan={ordersTableColumns.length} align="center">
            У Вас пока нет заказов
          </TableCell>
        </TableRow>
      );
    }

    return orders.map(order => {
      const summary = getOrderSummary(order.details);

      return (
        <TableRow
          key={order.id}
          hover
          sx={{ cursor: "pointer" }}
          onClick={() => setSelectedOrder(order)}
        >
          {ordersTableColumns.map(({ key }) => {
            let value: string | number;

            if (key === "qty") {
              value = summary.qty;
            } else if (key === "totalPrice") {
              value = formatCurrency(summary.total);
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
    });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 390,
          overflowY: "auto",
          boxShadow: "none",
          "@media (max-width: 1024px)": { maxHeight: 254 }
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {ordersTableColumns.map(({ key, label, width }) => (
                <TableCell
                  key={key}
                  sx={{
                    height: 48,
                    padding: "8px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    width
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>{renderOrdersBody(orders, setSelectedOrder)}</TableBody>
        </Table>
      </TableContainer>

      <ModalComponent open={Boolean(selectedOrder)} onClose={handleClose}>
        <div className="flex flex-col gap-5">
          {selectedOrder && <OrderInfo order={selectedOrder} />}
          <OrderDetailsTable
            items={selectedOrder?.details ?? []}
            highlightArticle={highlightArticle}
          />
        </div>
      </ModalComponent>
    </>
  );
};
