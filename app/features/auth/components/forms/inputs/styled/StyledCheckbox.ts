import styled from "@emotion/styled";
import { Checkbox } from "@mui/material";

export const StyledCheckbox = styled(Checkbox)({
  position: "relative",
  padding: "0",
  marginLeft: "10px",
  marginRight: "10px",

  "& .MuiSvgIcon-root": {
    fontSize: 24
  }
});
