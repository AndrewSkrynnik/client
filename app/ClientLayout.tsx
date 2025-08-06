"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

import { DrawerComponent } from "@/components/ui/drawer/DrawerComponent";
import { ToastComponent } from "@/components/ui/toast/ToastComponent";

import { useAppInitialization } from "@/hooks/useAppInitialization";

import { setupAxiosInterceptors } from "@/libs/axios-interceptors";

import { useAuthStore } from "@/store/useAuthStore";

import { BasketSyncInitializer } from "@/BasketSyncInitializer";
import { DynamicFavicon } from "@/DynamicFavicon";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const isAuthReady = useAuthStore(state => state.isAuthReady);

  useAppInitialization();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("react-scan").then(({ scan }) => scan());
    }

    setupAxiosInterceptors();
  }, []);

  if (!isAuthReady) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <DynamicFavicon />
      <BasketSyncInitializer />
      {children}
      <ToastComponent />
      <DrawerComponent />
    </QueryClientProvider>
  );
}
