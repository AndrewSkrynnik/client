"use client";

import { SearchInputProps } from "@/features/search/types";

import { StyledSearchInput } from "@/components/styled/StyledSearchInput";

export const SearchInput = ({
  name,
  placeholder,
  value,
  onChange,
  onKeyDown
}: SearchInputProps) => (
  <StyledSearchInput
    id={name}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    fullWidth
  />
);
