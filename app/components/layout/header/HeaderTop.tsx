import { HeaderLogo } from "@/components/layout/header/HeaderLogo";

import styles from "@/styles/components/layout/header/Header.module.css";

export const HeaderTop = () => (
  <div className={styles.headerTop}>
    <div className={`container ${styles.headerContainer}`}>
      <HeaderLogo />
    </div>
  </div>
);
