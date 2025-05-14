import { Metadata } from "next";
import Link from "next/link";

import { AccordionComponent } from "@/components/ui/accordion/AccordionComponent";

import styles from "@/styles/pages/info/InfoPage.module.css";

export const metadata: Metadata = {
  title: "Поставщикам | Rotazap",
  description:
    "Страница 'Поставщикам' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

const listItems1 = [
  { id: 1, text: "Юридическое лицо является плательщиком НДС" },
  { id: 2, text: "Возможность возврата товара" },
  { id: 3, text: "Наличие сертификатов ЕАС на предлагаемую продукцию" },
  { id: 4, text: "Гарантийный срок не менее 12 месяцев" },
  { id: 5, text: "Гибкая система скидок" },
  { id: 6, text: "Широкий ассортимент складского наличия" },
  { id: 7, text: "Регулярное обновление информации об остатках на складах" }
];

const listItems2 = [
  {
    id: 1,
    text: "Выписка из ЮГРЮЛ, выданная налоговым орг. не позднее 30 дн. с даты подписания договора"
  },
  { id: 2, text: "Устав организации (1-3 страницы + последняя страница)" },
  {
    id: 3,
    text: "Свидетельство о государственной регистрации юридического лица (ОГРН/ОГРНИП)"
  },
  {
    id: 4,
    text: "Свидетельство о постановке организации на учет в налоговом органе (ИНН)"
  },
  { id: 5, text: "Приказ о назначении руководителя организации" },
  {
    id: 6,
    text: "Копия бухгалтерской отчётности — первый лист с отметкой налогового органа"
  },
  {
    id: 7,
    text: "Копия паспорта РФ директора (или лица, выступающего по доверенности)"
  },
  { id: 8, text: "Договор аренды помещения" },
  {
    id: 9,
    text: "Копия доверенности сотрудников на право подписи первичных отгрузочных документов и счетов-фактур за руководителя и гл. бухгалтера"
  },
  {
    id: 10,
    text: "Копия декларации по НДС — первый лист налоговой декларации по налогу на добавленную стоимость за последний отчётный период, с отметкой налогового органа о принятии декларации"
  }
];

export default function ProviderPage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionWrapper}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Информация для поставщиков</h2>
            <div className={styles.titleDivider} />
            <p className={styles.subtitle}>
              Ключевые условия для успешного и взаимовыгодного сотрудничества
            </p>
          </div>
          <div className={styles.block}>
            <div className={styles.textBlock}>
              <p>
                <b>Для того, чтобы стать нашим поставщиком необходимо:</b>
              </p>
              <div className="ml-6">
                <p>&#9675; Соответствовать нижеуказанным требованиям;</p>
                <p>
                  &#9675; Направить на адрес электронной почты&nbsp;
                  <Link className="link" href="mailto:info@rotazap.ru">
                    info@rotazap.ru
                  </Link>
                  &nbsp;прайс-лист и пакет документов, указанный ниже.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.accordionContainer}>
            <AccordionComponent title="Требования к поставщикам">
              <ul className={styles.list}>
                {listItems1.map(item => (
                  <li key={item.id} className={styles.listItem}>
                    <span className="!min-w-[20px]">{item.id}.</span>
                    <p>{item.text};</p>
                  </li>
                ))}
              </ul>
            </AccordionComponent>

            <AccordionComponent title="Пакет документов">
              <ul className={styles.list}>
                {listItems2.map(item => (
                  <li key={item.id} className={styles.listItem}>
                    <span className="!min-w-[20px]">{item.id}.</span>
                    <p>{item.text};</p>
                  </li>
                ))}
              </ul>
              <p className="color-black-light mt-4 text-sm italic">
                * Копии документов, в обязательном порядке должны быть заверены
                оригиналом печати и подписью директора организации
              </p>
            </AccordionComponent>
          </div>

          <div className={styles.block}>
            <p className="text-center">
              После рассмотрения предложения с Вами свяжется наш специалист для
              обсуждения деталей сотрудничества!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
