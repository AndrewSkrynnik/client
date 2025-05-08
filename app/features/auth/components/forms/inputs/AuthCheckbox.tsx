import { FormControlLabel, FormGroup } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";

import { StyledCheckbox } from "@/features/auth/components/forms/inputs/styled/StyledCheckbox";
import { AuthCheckboxProps } from "@/features/auth/components/forms/inputs/types";

export const AuthCheckbox = <T extends FieldValues>({
  control,
  name,
  label,
  disabled = false
}: AuthCheckboxProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <FormGroup>
        <FormControlLabel
          control={
            <StyledCheckbox
              {...field}
              checked={field.value ?? false}
              disabled={disabled}
            />
          }
          label={label}
          sx={{
            "& .MuiFormControlLabel-label": {
              color: fieldState.error ? "#d32f2f" : "inherit" // 💥 если ошибка — красный текст
            }
          }}
        />
      </FormGroup>
    )}
  />
);
