import Link from "next/link";

import styles from "@/styles/pages/about/About.module.css";

export const AboutTemplate = () => (
  <div className="container">
    <h1 className={styles.about}>About Page</h1>
    <Link href="/">AboutTemplate</Link>
  </div>
);
