/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rotazap.ru", // 🔁 Замени на свой основной домен без слэша
  generateRobotsTxt: true, // Автоматически создаёт robots.txt
  exclude: ["/admin", "/office"], // Страницы, исключаемые из sitemap.xml

  sitemapSize: 5000,
  changefreq: "weekly", // Рекомендация поисковикам: обновляется еженедельно
  priority: 0.7, // Приоритет страниц

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/office"] // Исключить эти страницы из индексации
      }
    ],
    additionalSitemaps: [
      "https://rotazap.ru/sitemap-0.xml" // Подключение дополнительных sitemap
    ],
    additionalRobotsTxt: `
# Дополнительные указания для поисковых систем
Host: https://rotazap.ru
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content&ref /
    `.trim()
  }
};
