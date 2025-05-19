export const generateRandomAddress = (): string => {
  const cities = [
    "Москва",
    "Санкт-Петербург",
    "Казань",
    "Омск",
    "Екатеринбург"
  ];
  const streets = ["Ленина", "Мира", "Пушкина", "Советская", "Гагарина"];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const house = Math.floor(Math.random() * 100) + 1;

  return `г.${city}, ул. ${street}, д.${house}`;
};
