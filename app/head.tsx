// app/head.tsx
export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Иконки для светлой и тёмной темы */}
      <link
        rel="icon"
        href="/favicon-light.ico"
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        href="/favicon-dark.ico"
        media="(prefers-color-scheme: dark)"
      />

      {/* Обязательный общий fallback */}
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
