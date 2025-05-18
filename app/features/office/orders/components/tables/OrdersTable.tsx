import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import {
  orderStatusColors,
  ordersTableColumns
} from "@/features/office/orders/data/orders-table.data";
import type { OrdersTableProps } from "@/features/office/orders/types";

export const OrdersTable = ({ orders }: OrdersTableProps) => (
  <TableContainer
    component={Paper}
    sx={{
      maxHeight: 390,
      overflowY: "auto",
      boxShadow: "none",
      "@media (max-width: 1024px)": {
        maxHeight: 254
      }
    }}
  >
    <Table stickyHeader>
      <TableHead>
        <TableRow
          sx={{
            ".MuiTableCell-root": {
              height: "48px",
              padding: "8px",
              fontWeight: "bold",
              backgroundColor: "#f5f5f5",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "center"
            }
          }}
        >
          {ordersTableColumns.map(col => (
            <TableCell key={col.key} sx={{ width: col.width }}>
              {col.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {orders.map(order => (
          <TableRow key={order.id}>
            {ordersTableColumns.map(col => {
              const value = order[col.key as keyof typeof order];
              const isStatus = col.key === "status";
              const color = isStatus
                ? (orderStatusColors[value as string] ?? "#000")
                : "inherit";

              return (
                <TableCell
                  key={col.key}
                  sx={{
                    height: "48px",
                    padding: "8px",
                    backgroundColor: "#fff",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    color
                  }}
                >
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        {orders.length === 0 && (
          <TableRow>
            <TableCell colSpan={ordersTableColumns.length} align="center">
              Нет подходящих заказов
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);
