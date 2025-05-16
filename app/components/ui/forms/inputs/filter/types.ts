import { Control, FieldValues, Path } from "react-hook-form";

export interface FilterInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface FilterSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
}
