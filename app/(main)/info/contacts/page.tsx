import { Metadata } from "next";

import { AccordionComponent } from "@/components/ui/accordion/AccordionComponent";

import styles from "@/styles/pages/info/InfoPage.module.css";

export const metadata: Metadata = {
  title: "Контакты | Rotazap",
  description:
    "Страница 'Контакты' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

const listItems = [
  {
    title: "ИНН",
    text: "9715420842"
  },
  {
    title: "КПП",
    text: "771501001"
  },
  {
    title: "ОГРН",
    text: "1227700333673"
  },
  {
    title: "ОКВЭД",
    text: "45.31"
  },
  {
    title: "ОКПО",
    text: "54681502"
  }
];

const listItems2 = [
  {
    title: "Банк",
    text: "АО 'АЛЬФА-БАНК'"
  },
  {
    title: "БИК",
    text: "044525593"
  },
  {
    title: "К/с",
    text: "30101810200000000593 ГУ БАНКА РОССИИ ПО ЦФО"
  }
];

export default function ContactsPage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionWrapper}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Контактная информация и реквизиты</h2>
            <div className={styles.titleDivider} />
            <p className={styles.subtitle}>
              Все необходимые контакты и данные для сотрудничества с нами
            </p>
          </div>
          <div className="mt-[32px]">
            <div className={styles.accordionContainer}>
              <AccordionComponent title="Реквизиты компании и банка">
                <ul className={styles.list}>
                  {listItems.map(item => (
                    <li key={item.title} className={styles.listItem}>
                      <span>{item.title}</span>
                      <p>{item.text}</p>
                    </li>
                  ))}
                  <div className={styles.divider} />
                  {listItems2.map(item => (
                    <li key={item.title} className={styles.listItem}>
                      <span>{item.title}</span>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </AccordionComponent>

              <AccordionComponent title="Контакты, адрес и график работы">
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <span>Email</span>
                    <p>info@rotazap.ru</p>
                  </li>
                  <li className={styles.listItem}>
                    <span>№ тел.</span>
                    <p>+7-916-393-43-69</p>
                  </li>
                  <div className={styles.divider} />
                  <li className={styles.listItem}>
                    <span className="!min-w-[154px]">Фактический адрес:</span>
                    <p>
                      141068, М.О., г.Королев, мкр.Текстильщик, ул.Южная, д.3
                    </p>
                  </li>
                  <li className={styles.listItem}>
                    <span className="!min-w-[154px]">Юридический адрес:</span>
                    <p>
                      141068, М.О., г.Королев, мкр.Текстильщик, ул.Южная, д.3
                    </p>
                  </li>
                  <div className={styles.divider} />

                  <li className={styles.listItem}>
                    <span>ПН-ПТ</span>
                    <p>с 09:00 до 18:00 ч.</p>
                  </li>
                  <li className={styles.listItem}>
                    <span>СБ-ВС</span>
                    <p>выходные дни</p>
                  </li>
                </ul>
              </AccordionComponent>

              <AccordionComponent title="Руководство">
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <span>Генеральный директор</span>
                    <p>Костюшкин Юрий Владимирович</p>
                  </li>
                </ul>
              </AccordionComponent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
