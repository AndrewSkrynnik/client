"use client";

import { InputMask } from "@react-input/mask";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";

import { PhoneInputProps } from "@/components/ui/forms/types";

import styles from "./Input.module.css";

import classNames from "classnames";

export const AuthPhoneInput = <T extends FieldValues>({
  control,
  name,
  label,
  defaultValue = "+7" as PathValue<T, Path<T>>,
  disabled = false,
  onChange
}: PhoneInputProps<T>) => {
  console.log("");

  return (
    <Controller
      /* TODO: вопрос с типами */
      name={name as Path<T>}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => {
        const inputClass = classNames(styles.input, {
          [styles["inputError"]]: fieldState.error,
          [styles["inputDisabled"]]: disabled
        });

        return (
          <div className={styles.inputWrapper}>
            <InputMask
              mask="+7-___-___-__-__"
              replacement={{ _: /\d/ }}
              showMask
              {...field}
              onChange={e => {
                field.onChange(e.target.value);
                onChange?.(e.target.value);
              }}
              className={inputClass}
              disabled={disabled}
              type="tel"
            />
            <label
              htmlFor={name}
              className={classNames(styles.label, {
                [styles["labelActive"]]: field.value && field.value !== "+7"
              })}
            >
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
