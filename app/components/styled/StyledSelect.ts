import styled from "@emotion/styled";
import { Select } from "@mui/material";

export const StyledSelect = styled(Select)({
  "& .MuiOutlinedInput-input": {
    padding: "12.5px 16px",
    backgroundColor: "white",
    borderRadius: "6px",

    "@media (max-width: 1024px)": {
      padding: "12.5px"
    },
    "@media (max-width: 768px)": {
      padding: "8.5px"
    }
  }
});
