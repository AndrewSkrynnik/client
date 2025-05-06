/* import { DrawerComponent } from "@/components/ui/drawer/DrawerComponent"; */
import { HeaderBottom } from "@/components/layout/header/HeaderBottom";
import { HeaderTop } from "@/components/layout/header/HeaderTop";

import styles from "@/styles/components/layout/header/Header.module.css";

export const Header = () => (
  <header className={styles.header}>
    <HeaderTop />
    <HeaderBottom />
    {/* <DrawerComponent /> */}
  </header>
);
