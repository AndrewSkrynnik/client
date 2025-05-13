"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

import { DrawerComponent } from "@/components/ui/drawer/DrawerComponent";
import { ToastComponent } from "@/components/ui/toast/ToastComponent";

import { useAppInitialization } from "@/hooks/useAppInitialization";

import { setupAxiosInterceptors } from "@/libs/axios-interceptors";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  useAppInitialization();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("react-scan").then(({ scan }) => scan());
    }

    setupAxiosInterceptors();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastComponent />
      <DrawerComponent />
    </QueryClientProvider>
  );
}
