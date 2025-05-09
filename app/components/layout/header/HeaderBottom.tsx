import { HeaderBasket } from "@/components/layout/header/HeaderBasket";
import { HeaderUserMenu } from "@/components/layout/header/HeaderUserMenu";

//import { useAuthStore } from "@/store/useAuthStore";

import styles from "@/styles/components/layout/header/Header.module.css";

export const HeaderBottom = () => (
  /* const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isAuthReady = useAuthStore(state => state.isAuthReady);

  if (!isAuthReady) {
    return (
      <div
        style={{
          height: "80px",
          width: "100%",
          backgroundColor: "#F5F5F5",
          zIndex: 9999
        }}
      />
    );
  }

  if (!isAuthenticated) {
    return null;
  } */

  <div className={styles.headerBottom}>
    <div className={`container ${styles.headerContainer}`}>
      <div className={styles.headerBottomContainer}>
        <HeaderBasket />
        <HeaderUserMenu />
      </div>
    </div>
  </div>
);
