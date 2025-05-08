"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { ToastComponent } from "@/components/ui/toast/ToastComponent";

import { useAppInitialization } from "@/hooks/useAppInitialization";

import { setupAxiosInterceptors } from "@/libs/axios-interceptors";

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  useAppInitialization();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("react-scan").then(({ scan }) => scan());
    }
    /* TODO: сделать редирект с задержкой после авторизации */

    setupAxiosInterceptors();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastComponent />
    </QueryClientProvider>
  );
}
