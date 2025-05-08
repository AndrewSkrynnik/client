import { Controller, FieldValues } from "react-hook-form";

import { StyledInput } from "@/features/auth/components/forms/inputs/styled/StyledInput";
import { AuthInputProps } from "@/features/auth/components/forms/inputs/types";

export const AuthInput = <T extends FieldValues>({
  control,
  name,
  label,
  type,
  autoComplete = "off",
  disabled = false
}: AuthInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <StyledInput
        {...field}
        type={type}
        label={label}
        autoComplete={autoComplete}
        disabled={disabled}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    )}
  />
);
