"use client";

import { ChangeEvent } from "react";

import styles from "./Input.module.css";

import classNames from "classnames";

export interface InputProps {
  name: string;
  label: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  options?: string[];
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const Input = (props: InputProps) => {
  const {
    name,
    label,
    type = "text",
    value,
    defaultValue,
    placeholder = " ",
    autoComplete = "off",
    disabled = false,
    onChange,
    className
  } = props;

  const inputClass = classNames(styles.input, className, {
    [styles["input--disabled"]]: disabled
  });

  return (
    <div className={styles.inputWrapper}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={inputClass}
        onChange={onChange}
      />
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
    </div>
  );
};
