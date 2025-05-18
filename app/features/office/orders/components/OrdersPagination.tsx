import { Pagination } from "@mui/material";

import { OrdersPaginationProps } from "@/features/office/orders/types";

export const OrdersPagination = ({
  totalItems,
  rowsPerPage,
  currentPage,
  onChange
}: OrdersPaginationProps) => {
  if (totalItems <= rowsPerPage) return null;

  return (
    <Pagination
      count={Math.ceil(totalItems / rowsPerPage)}
      page={currentPage}
      showFirstButton
      showLastButton
      onChange={(_, value) => onChange(value)}
      sx={{ display: "flex", justifyContent: "center", marginTop: "-10px" }}
    />
  );
};
