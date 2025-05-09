import { ChangeEvent, KeyboardEventHandler } from "react";

/* Search Input Props */
export interface SearchInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}
