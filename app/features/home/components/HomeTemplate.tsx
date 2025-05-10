import { SearchForm } from "@/features/search/SearchForm";

import styles from "@/styles/pages/home/Home.module.css";

export const HomeTemplate = () => (
  <div className="mx-auto mt-[140px] flex max-w-[768px] flex-col items-center gap-y-[20px]">
    <h1 className={styles.title}>ROTAZAP — умный поиск автозапчастей</h1>
    <SearchForm />
    <p>Пример артикула: 6R0615301</p>
  </div>
);
