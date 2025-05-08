import { InputMask } from "@react-input/mask";
import { Controller, FieldValues } from "react-hook-form";

import { StyledInput } from "@/features/auth/components/forms/inputs/styled/StyledInput";
import { AuthInputProps } from "@/features/auth/components/forms/inputs/types";

export const AuthPhoneInput = <T extends FieldValues>({
  control,
  name,
  label,
  autoComplete = "off",
  disabled = false
}: AuthInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <StyledInput
        {...field}
        value={field.value ?? "+7-___-___-__-__"}
        label={label}
        autoComplete={autoComplete}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        fullWidth
        disabled={disabled}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputComponent: InputMask as any,
          inputProps: {
            mask: "+7-___-___-__-__",
            replacement: { _: /\d/ },
            showMask: true
          }
        }}
      />
    )}
  />
);
