import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import { HighlightMatch } from "@/features/office/orders/components/HighlightMatch";
import { orderDetailsColumns } from "@/features/office/orders/data/order-details.columns";
import { formatOrderDetailsValue } from "@/features/office/orders/data/order-details.format";
import { OrderDetailsItem } from "@/features/office/orders/types";

export const OrderDetailsTable = ({
  items = [],
  highlightArticle = ""
}: {
  items?: OrderDetailsItem[];
  highlightArticle?: string;
}) => (
  <TableContainer
    component={Paper}
    sx={{
      boxShadow: "none",
      maxHeight: 400,
      overflowY: "auto"
    }}
  >
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {orderDetailsColumns.map(({ key, label, width }) => (
            <TableCell
              key={key}
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                whiteSpace: "nowrap",
                width
              }}
            >
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, idx) => (
          <TableRow key={idx}>
            {orderDetailsColumns.map(({ key }) => (
              <TableCell key={key} align="center">
                {key === "article"
                  ? HighlightMatch(item[key], highlightArticle)
                  : formatOrderDetailsValue(key, item[key])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
