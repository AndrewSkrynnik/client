"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { signInSchema } from "@/features/auth/common/schema";
import { showAuthError } from "@/features/auth/common/showAuthError";
import { AuthInput } from "@/features/auth/components/forms/inputs/AuthInput";
import { AuthPasswordInput } from "@/features/auth/components/forms/inputs/AuthPasswordInput";
import { AuthLoginInputs } from "@/features/auth/types";

import { Button } from "@/components/ui/buttons/Button";

import axiosInstance from "@/libs/axios";

import { useAuthStore } from "@/store/useAuthStore";

import styles from "@/styles/pages/auth/Auth.module.css";

export const AuthSignInForm = () => {
  const setAuth = useAuthStore(state => state.setAuth);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<AuthLoginInputs>({
    resolver: yupResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange"
  });

  const onSubmit = async (data: AuthLoginInputs) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      const { user } = response.data;

      setAuth(user);
      toast.success("Вход выполнен!");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        showAuthError(error);
      }
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <AuthInput control={control} name="email" label="Email" type="email" />
      <AuthPasswordInput
        control={control}
        name="password"
        label="Пароль"
        type="password"
      />
      <Button variant="Primary" type="submit" isLoading={isSubmitting}>
        {isSubmitting ? null : "Вход"}
      </Button>
    </form>
  );
};
