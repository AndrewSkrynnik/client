import { TableCell, TableHead, TableRow } from "@mui/material";

import { ORDERS_DETAILS_TABLE_HEAD } from "@/data/table-header.data";

export const OrderDetailsTableHead = () => (
  <TableHead>
    <TableRow>
      {ORDERS_DETAILS_TABLE_HEAD.map(({ key, label, width }) => (
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
);
