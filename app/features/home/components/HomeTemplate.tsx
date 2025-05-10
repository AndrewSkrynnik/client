import { SearchForm } from "@/features/search/SearchForm";

import { SettingsIcon } from "@/components/icons";

import styles from "@/styles/pages/home/Home.module.css";

export const HomeTemplate = () => (
  <section className={styles.main}>
    <div className="container">
      <div className={styles.homeContainer}>
        <h1 className={styles.title}>
          <span className="text-peach">ROTAZAP</span> — умный поиск
          автозапчастей
          <SettingsIcon
            className={`${styles.rotateIcon} text-blue-dark`}
            fontSize="large"
          />
        </h1>
        <SearchForm />
        <p className="text-black-light mt-[-10px] text-center text-sm">
          Быстрый поиск оригинальных и аналоговых автозапчастей по артикулу.
          Пример артикула: <span className="font-bold">6R0615301</span>
        </p>
      </div>
    </div>
  </section>
);
