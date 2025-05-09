import { FormControlLabel, FormGroup } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";

import { AuthCheckboxProps } from "@/features/auth/types";

import { StyledCheckbox } from "@/components/styled/StyledCheckbox";

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
