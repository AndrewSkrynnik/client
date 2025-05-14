import { Metadata } from "next";
import Link from "next/link";

import { AccordionComponent } from "@/components/ui/accordion/AccordionComponent";

import styles from "@/styles/pages/info/InfoPage.module.css";

export const metadata: Metadata = {
  title: "Гарантия и возвраты | Rotazap",
  description:
    "Страница 'Гарантия и возвраты' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

interface ListItem {
  id: string;
  text: string;
}

const listItems: ListItem[] = [
  {
    id: "1",
    text: "Товар приобретённый с удаленных (дополнительных, партнерских) складов"
  },
  {
    id: "2",
    text: "Электро - и электронно-содержащие детали и узлы, требующие для проверки специального оборудования"
  },
  { id: "3", text: "Масла и технологические жидкости" },
  { id: "4", text: "Кузовные детали, а также детали интерьера и экстерьер" },
  { id: "5", text: "Товар имеющий механические повреждения" },
  {
    id: "6",
    text: "Товар без упаковки или с ее нарушением (в том числе стикеры упаковки)"
  },
  {
    id: "7",
    text: "Товар со следами установки/эксплуатации"
  },
  {
    id: "8",
    text: "Уценённый товар"
  }
];

export default function WarrantyRefundPage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionWrapper}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>
              Гарантийные обязательства и возврат товара
            </h2>
            <div className={styles.titleDivider} />
            <p className={styles.subtitle}>
              Правила возврата и гарантийные условия для комфортной покупки
            </p>
          </div>
          <div className={styles.block}>
            <div className={styles.textBlock}>
              <p>
                Заявку на возврат товара по причине брака или другим основаниям
                можно создать самостоятельно в&nbsp;
                <Link className="link" href="/office/refunds">
                  личном кабинете
                </Link>
                . Срок рассмотрения заявок на возврат товара по всем типам не
                превышает 7 рабочих дней (в случае с бракованным товаром срок
                может быть увеличен). Условия гарантии ООО«РОТА»:
              </p>
            </div>
          </div>
          <div className={styles.accordionContainer}>
            <AccordionComponent title="Возврат качественного товара">
              <div className={styles.textBlockAccordion}>
                Возврат качественного товара возможен только в следующих
                случаях:
              </div>
              <ul className={styles.list}>
                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">
                    Полная сохранность товарного вида упаковки и её содержимого:
                  </p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">1.</span>
                      <p>Отсутствие следов установки и эксплуатации;</p>
                    </li>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">2.</span>
                      <p>Неповреждённая и полная упаковка;</p>
                    </li>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">3.</span>
                      <p>Сохранены все пломбы и заводская маркировка;</p>
                    </li>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">4.</span>
                      <p>Сохранена этикетка со штрих-кодом.</p>
                    </li>
                  </ul>
                </li>
                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">Недовложение:</p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      Отсутствует один или несколько товаров, указанных в
                      отгрузочных документах, либо фактическое количество меньше
                      указанного. Срок подачи заявки – до 3 рабочих дней с
                      момента получения товара.
                    </li>
                  </ul>
                </li>

                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">Пересорт:</p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      Получен товар, который не соответствует названию
                      производителя и/или артикулу, указанному в отгрузочных
                      документах, либо в количестве большем, чем указано. Срок
                      подачи заявки – до 3 рабочих дней с момента получения
                      товара.
                    </li>
                  </ul>
                </li>
                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">Полученный товар не понадобился:</p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      Срок подачи заявки – до 7 рабочих дней с даты отгрузки.
                    </li>
                  </ul>
                </li>
              </ul>
            </AccordionComponent>

            <AccordionComponent title="Возврату не подлежат">
              <ul className={styles.list}>
                {listItems.map(item => (
                  <li key={item.id} className={styles.listItem}>
                    <span className="!min-w-[20px]">{item.id}.</span>
                    <p>{item.text};</p>
                  </li>
                ))}
              </ul>
              <div
                className={`${styles.textBlockAccordionMono} mt-6 text-sm italic`}
              >
                * Список аналогов и заменителей на сайте компании является
                справочной информацией и не может служить причиной для возврата
                товара при ошибке в его подборе. Корректный подбор запасных
                частей рекомендуем осуществлять по каталогам производителей.
              </div>
            </AccordionComponent>

            <AccordionComponent title="Возврат некачественного товара">
              <div className={styles.textBlockAccordion}>
                Возврат некачественного товара возможен только в следующих
                случаях:
              </div>
              <ul className={styles.list}>
                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">
                    Полная сохранность товарного вида упаковки и её содержимого:
                  </p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">1.</span>
                      <p>Отсутствие следов установки и эксплуатации;</p>
                    </li>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">2.</span>
                      <p>Неповреждённая и полная упаковка;</p>
                    </li>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">3.</span>
                      <p>Сохранены все пломбы и заводская маркировка;</p>
                    </li>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">4.</span>
                      <p>Сохранена этикетка со штрих-кодом.</p>
                    </li>
                  </ul>
                </li>
                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">
                    Брак – видимый дефект товара (механические повреждения
                    товара):
                  </p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      отказ от товара, осуществляемый при доставке,
                      документируется актом повреждения при водителе. Если
                      клиент сразу не обнаружил механический брак, необходимо
                      предоставить фото повреждений детали со всех сторон и
                      упаковки со всеми стикерами. Сроки подачи заявки: до 3-х
                      рабочих дней с момента отгрузки товара по документам.
                    </li>
                  </ul>
                </li>
                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">Брак – скрытый дефект:</p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      при обнаружении в процессе установки (эксплуатации)
                      бракованного товара, необходимо приложить подробные
                      сведения об а/м и обязательный перечень документов
                      (заказ-наряд, платежный документ, акт дефектовки,
                      сертификат СТО). Срок подачи заявки: до 1 года с момента
                      отгрузки.
                    </li>
                  </ul>
                </li>
                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">Некомплектность:</p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      полученном товаре нарушена заводская комплектность
                      (вложение не соответствует спецификации производителя) –
                      отсутствует одна или более составляющих комплекта.
                    </li>
                  </ul>
                </li>
                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">Пересорт:</p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      Получен товар, который не соответствует названию
                      производителя и/или артикулу, указанному в отгрузочных
                      документах, либо в количестве большем, чем указано. Срок
                      подачи заявки – до 3 рабочих дней с момента получения
                      товара.
                    </li>
                  </ul>
                </li>

                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">Полученный товар не понадобился:</p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      Срок подачи заявки – до 7 рабочих дней с даты отгрузки.
                    </li>
                  </ul>
                </li>

                <li className={`${styles.listItem} flex-col`}>
                  <p className="font-bold">
                    Возврат товара возможен только при предоставлении следующей
                    информации:
                  </p>
                  <ul className={styles.sublist}>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">1.</span>
                      <p> описание недостающего элемента комплекта;</p>
                    </li>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">2.</span>
                      <p>фото упаковки со всеми имеющимися стикерами;</p>
                    </li>
                    <li className={styles.sublistItem}>
                      <span className="!min-w-[20px]">3.</span>
                      <p>фото содержимого в упаковке</p>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className={`${styles.textBlockAccordionMono} mt-6 italic`}>
                * Срок подачи заявки: до 7 рабочих дней с даты отгрузки
              </div>
            </AccordionComponent>
          </div>
        </div>
      </div>
    </section>
  );
}
