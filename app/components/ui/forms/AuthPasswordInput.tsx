"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";

import { AuthPasswordInputProps } from "@/components/ui/forms/types";

import styles from "./Input.module.css";

import classNames from "classnames";

const calculatePasswordStrength = (password: string) => {
  const rules = [
    /[a-z]/.test(password), // Lowercase letter
    /[A-Z]/.test(password), // Uppercase letter
    /\d/.test(password), // Digit
    /[@$!%*?&]/.test(password), // Special character
    password.length >= 5 // Minimum length
  ];

  const passedRules = rules.filter(Boolean).length;
  const allRulesPassed = passedRules === rules.length;
  return { strength: passedRules * 20, allRulesPassed };
};

export const AuthPasswordInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = " ",
  defaultValue = "" as PathValue<T, Path<T>>,
  autoComplete = "off",
  disabled = false,
  onChange
}: AuthPasswordInputProps<T>) => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const { strength, allRulesPassed } = calculatePasswordStrength(value);
    setStrength(strength);
    setShowValidation(!allRulesPassed || value === ""); // Показываем подсказку, если пароль пуст или правила не выполнены
    onChange?.(value);
  };

  const handleFocus = () => {
    setShowValidation(password === "" || strength < 100);
  };

  const handleBlur = () => {
    if (password !== "" && strength === 100) {
      setShowValidation(false);
    }
  };

  // Закрытие подсказки при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowValidation(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => {
        const inputClass = classNames(styles.input, {
          [styles.inputError]: fieldState.error,
          [styles["inputDisabled"]]: disabled
        });

        return (
          <div className={styles.inputWrapper} ref={wrapperRef}>
            <input
              id={name}
              {...field}
              type="password"
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              className={inputClass}
              onFocus={handleFocus}
              onChange={e => {
                field.onChange(e);
                handlePasswordChange(e.target.value);
              }}
              onBlur={handleBlur}
            />
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
            {showValidation && (
              <div className={styles.validationPopup}>
                <div
                  className={styles.strengthBar}
                  style={{ width: `${strength}%` }}
                />
                <ul className={styles.requirements}>
                  <li className={password.match(/[a-z]/) ? styles.met : ""}>
                    Минимум одна строчная буква
                  </li>
                  <li className={password.match(/[A-Z]/) ? styles.met : ""}>
                    Минимум одна заглавная буква
                  </li>
                  <li className={password.match(/\d/) ? styles.met : ""}>
                    Минимум одна цифра
                  </li>
                  <li className={password.match(/[@$!%*?&]/) ? styles.met : ""}>
                    Минимум один специальный символ
                  </li>
                  <li className={password.length >= 8 ? styles.met : ""}>
                    Минимум 5 символов
                  </li>
                </ul>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
