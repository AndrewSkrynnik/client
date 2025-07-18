import { Controller, FieldValues } from "react-hook-form";

import { StyledInput } from "@/components/styled/StyledInput";
import { FilterInputProps } from "@/components/ui/forms/inputs/filter/types";

export const FilterInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder = "",
  disabled = false,
  min,
  max,
  step,
  inputMode
}: FilterInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <StyledInput
        {...field}
        label={label}
        type={type}
        disabled={disabled}
        fullWidth
        placeholder={placeholder}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min, max, step, inputMode }}
      />
    )}
  />
);
