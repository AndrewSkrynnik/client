import { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister
} from "react-hook-form";

export interface AuthLoginInputs {
  email: string;
  password: string;
}

export interface AuthRegisterInputs extends AuthLoginInputs {
  username: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  legalForm: string;
  activity: string;
  organizationName: string;
  consent: boolean;
  confirmation: boolean;
}

export interface AuthCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
}

/* Удалить */
export interface IInputProps<T extends FieldValues> {
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  label: string;
  type: string;
  name: Path<T>;
  autoComplete?: string;
  value?: string;
  select?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  disabled?: boolean;
}

/* MultiStepForm */

// Типы для CompanyForm
export type CompanyData = {
  organizationName: string;
  legalForm: string;
  activity: string;
};

export type CompanyFormProps = CompanyData & {
  updateFields: (fields: Partial<CompanyData>) => void;
  control: Control<AuthRegisterInputs>;
};

// Типы для AccountForm
export type AccountData = {
  username: string;
  email: string;
  password: string;
};

export type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
  control: Control<AuthRegisterInputs>;
};

// Типы для UserForm
export type UserData = {
  fullName: string;
  phoneNumber: string;
  address: string;
};

export type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
  control: Control<AuthRegisterInputs>;
};
