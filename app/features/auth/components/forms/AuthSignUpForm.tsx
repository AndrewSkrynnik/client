"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { signUpSchema } from "@/features/auth/common/schema";
import { MultiFormAccount } from "@/features/auth/components/forms/multistep-form/MultiFormAccount";
import { MultiFormCompany } from "@/features/auth/components/forms/multistep-form/MultiFormCompany";
import { MultiFormUser } from "@/features/auth/components/forms/multistep-form/MultiFormUser";
import { AuthRegisterInputs } from "@/features/auth/types";

import { Button } from "@/components/ui/buttons/Button";

import { useMultistepForm } from "@/hooks/useMultistepForm";

import axiosInstance from "@/libs/axios";

import { useAuthStore } from "@/store/useAuthStore";

import { showAuthError } from "@/common/showAuthError";

import styles from "@/styles/pages/auth/Auth.module.css";

export const AuthSignUpForm = () => {
  const setAuth = useAuthStore(state => state.setAuth);
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<AuthRegisterInputs>({
    username: "",
    password: "",
    email: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    organizationName: "",
    legalForm: "",
    activity: "",
    consent: false,
    confirmation: false
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = useForm<AuthRegisterInputs>({
    resolver: yupResolver(signUpSchema(currentStepIndex)) as any,
    mode: "onChange"
  });

  const updateFields = (fields: Partial<AuthRegisterInputs>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const { steps, step, isFirstStep, isLastStep, back, next } = useMultistepForm(
    [
      <MultiFormAccount
        {...data}
        control={control}
        key={0}
        updateFields={updateFields}
      />,
      <MultiFormUser
        {...data}
        control={control}
        key={1}
        updateFields={updateFields}
      />,
      <MultiFormCompany
        {...data}
        control={control}
        key={2}
        updateFields={updateFields}
      />
    ]
  );

  useEffect(() => {
    reset(data);
  }, [currentStepIndex, reset, data]);

  const onSubmit = async (formData: AuthRegisterInputs) => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
      next();
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", formData);
      setAuth(response.data.user);
      toast.success("Регистрация прошла успешно!");

      router.push("/dashboard");
    } catch (error) {
      showAuthError(error);
    }
  };

  return (
    <>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.counter}>
          Шаг {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div className={styles.buttonWrapper}>
          {!isFirstStep && (
            <Button
              variant="SecondaryOutline"
              type="button"
              onClick={() => {
                back();
                setCurrentStepIndex(prev => prev - 1);
              }}
            >
              Назад
            </Button>
          )}
          <Button variant="Primary" type="submit" isLoading={isSubmitting}>
            {isLastStep ? "Завершить" : "Далее"}
          </Button>
        </div>
      </form>
    </>
  );
};
