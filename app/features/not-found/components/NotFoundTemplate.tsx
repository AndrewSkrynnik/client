"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/buttons/Button";

import styles from "@/styles/pages/not-found/NotFound.module.css";

export const NotFoundTemplate = () => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>ОШИБКА 404</h1>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>
            Страница <span className="text-accent">{pathname}</span> не найдена
          </p>
          <p className={styles.description}>
            Возможно, она была удалена или перемещена.
          </p>
        </div>
      </div>
      <Link href="/">
        <Button variant="Primary" size="Large">
          На главную
        </Button>
      </Link>
    </div>
  );
};
