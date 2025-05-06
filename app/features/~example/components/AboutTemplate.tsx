import Link from "next/link";

import styles from "@/styles/pages/example/Example.module.css";

export const ExampleTemplate = () => (
  <div className="container">
    <h1 className={styles.about}>About Page</h1>
    <Link href="/">Dashboard</Link>
  </div>
);
