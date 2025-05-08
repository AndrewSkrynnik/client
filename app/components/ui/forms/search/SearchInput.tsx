"use client";

import clsx from "clsx";
import { ChangeEvent, KeyboardEventHandler } from "react";
import { Control, FieldValues, Path, PathValue } from "react-hook-form";

import styles from "./Input.module.css";

interface BaseInputProps<T extends FieldValues = FieldValues> {
  control?: Control<T>; // Опциональный Control для react-hook-form
  name: Path<T> | string; // Поддержка как строк, так и путей react-hook-form
  placeholder?: string; // Текст подсказки
  defaultValue?: string | PathValue<T, Path<T>>; // Значение по умолчанию
  disabled?: boolean; // Заблокированное состояние
}

// Интерфейс для текстовых инпутов
export interface InputProps extends BaseInputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // Стандартный обработчик изменения
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>; // Обработчик нажатия клавиш
  className?: string;
}

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
        className={clsx(styles.input, className, "max-w-full", {
          [styles["inputDisabled"]]: disabled
        })}
      />
    </div>
  );
};
