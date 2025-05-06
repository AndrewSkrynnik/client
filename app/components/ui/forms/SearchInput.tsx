"use client";

import { InputProps } from "@/components/ui/forms/types";

import styles from "./Input.module.css";

import classNames from "classnames";

export const SearchInput = (props: InputProps) => {
  const {
    name,
    value,
    placeholder = " ",
    defaultValue,
    onChange,
    onKeyDown,
    disabled = false,
    className
  } = props;

  return (
    <div className={styles.inputWrapper}>
      <input
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        className={classNames(styles.input, className, "max-w-full", {
          [styles["inputDisabled"]]: disabled
        })}
      />
    </div>
  );
};
