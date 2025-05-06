"use client";

import { useAuthStore } from "@/store/useAuthStore";

import styles from "@/styles/components/ui/user/User.module.css";

export const UserInfo = () => {
  const user = useAuthStore(state => state.user);

  return (
    <li className={styles.userInfo}>
      <p className={styles.title}>{user?.username}</p>
      <p className={styles.subtitle}>{user?.email}</p>
    </li>
  );
};
