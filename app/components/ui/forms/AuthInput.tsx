"use client";

import { Controller, FieldValues, Path, PathValue } from "react-hook-form";

import { AuthInputProps } from "@/components/ui/forms/types";

import styles from "./Input.module.css";

import classNames from "classnames";

export const AuthInput = <T extends FieldValues>(props: AuthInputProps<T>) => {
  const {
    control,
    name,
    label,
    type = "text",
    placeholder = " ",
    defaultValue = "" as PathValue<T, Path<T>>,
    autoComplete = "off",
    disabled = false,
    onChange
  } = props;

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => {
        const inputClass = classNames(styles.input, {
          [styles["inputError"]]: Boolean(fieldState.error),
          [styles["inputDisabled"]]: disabled
        });

        return (
          <div className={styles.inputWrapper}>
            <input
              id={name}
              {...field}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              className={inputClass}
              onChange={e => {
                field.onChange(e);
                onChange?.(e);
              }}
            />
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
            {fieldState.error && (
              <span className={styles.errorMessage}>
                {fieldState.error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
