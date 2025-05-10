"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/buttons/Button";

import { useAuth } from "@/hooks/useAuth";
import { useRoleChangeHandler } from "@/hooks/useRoleChangeHandler";

import { useAuthStore } from "@/store/useAuthStore";

export const ConfirmationTemplate = () => {
  const { logoutMutation } = useAuth();
  const { user } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/auth"); // Перенаправляем пользователя на страницу /auth
      }
    });
  };

  // Логика обработки смены роли
  useRoleChangeHandler();

  // Автоматический редирект при смене роли с "pending"
  useEffect(() => {
    if (user?.role !== "pending") {
      toast.success("Аккаунт подтвержден!");
      setTimeout(() => router.push("/"), 1500);
    }
  }, [user?.role, router]);

  return (
    <div className="container">
      <div className="mx-auto my-0 flex w-full max-w-[600px] flex-col items-center justify-center gap-y-3 text-center">
        <h1 className="text-2xl">Спасибо за регистрацию!</h1>
        <p>
          Мы проверяем Вашу заявку. Как только процесс завершится, вы сможете
          перейти на страницу авторизации и войти в свой аккаунт. Рады видеть
          вас среди наших пользователей!
        </p>
        <Button onClick={handleLogout}>Выйти</Button>
        <i className="text-sm">
          Если нажмете кнопку Выйти, вы будете перенаправлены на страницу
          авторизации, и не сможете сразу увидеть, что Ваш аккаунт авторизовали.{" "}
          <br />
          <b className="text-secondary">
            Рекомендуем оставаться на этой странице.
          </b>
        </i>
      </div>
    </div>
  );
};
