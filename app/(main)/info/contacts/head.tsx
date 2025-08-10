export default function Head() {
  const og = "https://rotazap.ru/opengraph-image?v=4"; // новая версия для сброса кэша TG
  return (
    <>
      <title>Контакты | rotazap.ru</title>
      <meta
        name="description"
        content="Контактная информация интернет-магазина rotazap.ru: адрес, телефон, электронная почта и форма обратной связи"
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Контакты | rotazap.ru" />
      <meta
        property="og:description"
        content="Контактная информация интернет-магазина rotazap.ru: адрес, телефон, электронная почта и форма обратной связи"
      />
      <meta property="og:url" content="https://rotazap.ru/info/contacts" />
      <meta property="og:image" content={og} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Контакты | rotazap.ru" />
      <meta
        name="twitter:description"
        content="Контактная информация интернет-магазина rotazap.ru: адрес, телефон, электронная почта и форма обратной связи"
      />
      <meta name="twitter:image" content={og} />
    </>
  );
}
