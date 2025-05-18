import { Skeleton } from "@mui/material";

import { HeaderBasket } from "@/components/layout/header/HeaderBasket";
import { HeaderUserMenu } from "@/components/layout/header/HeaderUserMenu";
import { CurrencyRates } from "@/components/ui/currency-rates/CurrencyRates";

import { useAuthStore } from "@/store/useAuthStore";

import styles from "@/styles/components/layout/header/Header.module.css";

export const HeaderBottom = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isAuthReady = useAuthStore(state => state.isAuthReady);

  if (!isAuthReady) {
    return (
      <div className={styles.headerBottom}>
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.headerBottomContainer}>
            <Skeleton variant="rounded" width={280} height={60} />
            <Skeleton variant="rounded" width={320} height={60} />
            <Skeleton variant="rounded" width={240} height={60} />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.headerBottom}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.headerBottomContainer}>
          <CurrencyRates />
          <HeaderBasket />
          <HeaderUserMenu />
        </div>
      </div>
    </div>
  );
};
