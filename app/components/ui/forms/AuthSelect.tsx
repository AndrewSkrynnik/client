"use client";

import { ChangeEvent } from "react";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";

import { AuthInputProps } from "@/components/ui/forms/types";

import styles from "./Input.module.css";

import classNames from "classnames";

export const AuthSelect = <T extends FieldValues>(props: AuthInputProps<T>) => {
  const {
    control,
    name,
    label,
    options = [], // По умолчанию пустой массив строк
    defaultValue = "" as PathValue<T, Path<T>>,
    disabled = false,
    onChange
  } = props;

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => {
        const selectClass = classNames(styles.select, {
          [styles["selectError"]]: fieldState.error,
          [styles["select--disabled"]]: disabled
        });

        const hasValue = field.value && field.value !== "";

        const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
          field.onChange(e);
          if (onChange) {
            onChange(e);
          }
        };

        return (
          <div className={styles.selectWrapper}>
            <select
              id={name}
              {...field}
              onChange={handleChange}
              disabled={disabled}
              className={selectClass}
            >
              <option value="" disabled>
                Выберите...
              </option>
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label
              htmlFor={name}
              className={classNames(styles.label, {
                [styles["label--active"]]: hasValue
              })}
            >
              {label}
            </label>
            <span className={styles.arrow} />
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
