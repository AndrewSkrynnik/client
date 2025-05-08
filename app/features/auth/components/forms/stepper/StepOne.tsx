"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { stepOneSchema } from "@/features/auth/common/schema";
import { AuthInput } from "@/features/auth/components/forms/inputs/AuthInput";
import { AuthPasswordInput } from "@/features/auth/components/forms/inputs/AuthPasswordInput";
import { AuthRegisterInputs } from "@/features/auth/types";

import { Button } from "@/components/ui/buttons/Button";

import { useStepFormStore } from "@/store/useStepFormStore";

export const StepOne = () => {
  const { data, setData, setStep } = useStepFormStore();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = useForm<Pick<AuthRegisterInputs, "username" | "email" | "password">>({
    defaultValues: {
      username: data.username || "",
      email: data.email || "",
      password: data.password || ""
    },
    resolver: yupResolver(stepOneSchema),
    mode: "onChange"
  });

  const onSubmit = (
    values: Pick<AuthRegisterInputs, "username" | "email" | "password">
  ) => {
    setData(values);
    setStep(2);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <AuthInput
        control={control}
        name="username"
        label="Имя пользователя"
        type="text"
      />
      <AuthInput control={control} name="email" label="Email" type="email" />
      <AuthPasswordInput
        control={control}
        name="password"
        label="Пароль"
        type="tel"
      />

      <Button
        variant="Primary"
        type="submit"
        isDisabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
      >
        Далее
      </Button>
    </form>
  );
};
