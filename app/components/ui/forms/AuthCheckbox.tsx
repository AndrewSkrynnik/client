"use client";

import { Controller, FieldValues, Path, PathValue } from "react-hook-form";

import { AuthCheckboxProps } from "@/features/auth/types";

import styles from "./Input.module.css";

export const AuthCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  required = false
}: AuthCheckboxProps<T>) => {
  console.log("");

  return (
    <div className={styles.checkboxContainer}>
      <Controller
        name={name}
        control={control}
        defaultValue={false as PathValue<T, Path<T>>}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              type="checkbox"
              id={name}
              checked={field.value || false}
              onChange={e => field.onChange(e.target.checked)}
              className={`${styles.checkboxInput} ${
                fieldState.error ? styles.errorBorder : styles.defaultBorder
              }`}
            />
            <label
              htmlFor={name}
              className={`${styles.checkboxLabel} ${
                fieldState.error ? styles.errorText : styles.defaultText
              }`}
            >
              {label}
              {required && <span className={styles.required}> *</span>}
            </label>
          </>
        )}
      />
    </div>
  );
};
