import { memo } from "react";

import { StyledTableCellBody } from "@/components/styled/tables/StylesTables";

export const MemoTableCellBody = memo(StyledTableCellBody, () => true);
MemoTableCellBody.displayName = "MemoTableCellBody";
