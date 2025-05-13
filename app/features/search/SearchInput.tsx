"use client";

import { SearchInputProps } from "@/features/search/types";

import { CloseIcon } from "@/components/icons";
import { StyledSearchInput } from "@/components/styled/StyledSearchInput";

export const SearchInput = ({
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onClear
}: SearchInputProps) => (
  <div className="relative w-full">
    <StyledSearchInput
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      fullWidth
    />
    {value && onClear && (
      <button
        type="button"
        className="absolute top-1/2 right-2 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={onClear}
      >
        <CloseIcon />
      </button>
    )}
  </div>
);
