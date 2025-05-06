import Link from "next/link";

import styles from "@/styles/pages/dashboard/Dashboard.module.css";

export const DashboardTemplate = () => (
  <div className="container">
    <h1 className={styles.title}>Dashboard Page</h1>
    <Link href="/auth">Auth</Link>
    <Link href="/about">About</Link>
  </div>
);
