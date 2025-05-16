import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

export const OrdersTable = () => (
  <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
    <Table>
      <TableHead>
        <TableRow
          sx={{
            ".MuiTableCell-root": {
              height: "48px",
              padding: "10px 16px",
              fontWeight: "bold",
              backgroundColor: "#f5f5f5"
            }
          }}
        >
          <TableCell>Деталь</TableCell>
          <TableCell>Откуда</TableCell>
          <TableCell>Дата</TableCell>
          <TableCell>Цена(руб.)</TableCell>
          <TableCell>Кол-во</TableCell>
          <TableCell>Сумма(руб.)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
          <TableCell>123</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);
