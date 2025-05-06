import { ChangeEvent, KeyboardEventHandler } from "react";
import { Control, FieldValues, Path, PathValue } from "react-hook-form";

// Базовый интерфейс для всех инпутов
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

// Интерфейс для инпутов с авторизацией
export interface AuthInputProps<T extends FieldValues>
  extends BaseInputProps<T> {
  label: string; // Метка для поля
  type?: string; // Тип инпута (password, email и т.д.)
  autoComplete?: string; // Атрибут автозаполнения
  options?: string[]; // Список опций (если это select)
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Обработчик изменения
}

// Интерфейс для телефонного инпута
export interface PhoneInputProps<T extends FieldValues>
  extends Omit<BaseInputProps<T>, "onChange" | "name" | "defaultValue"> {
  name: Path<T>;
  defaultValue?: PathValue<T, Path<T>>;
  label: string;
  onChange?: (value: string) => void;
}

// Интерфейс для инпута пароля
export interface AuthPasswordInputProps<T extends FieldValues>
  extends Omit<BaseInputProps<T>, "onChange"> {
  label: string; // Метка для поля
  placeholder?: string; // Текст подсказки
  autoComplete?: string; // Атрибут автозаполнения
  onChange?: (value: string) => void; // Специфичный обработчик изменения
}
