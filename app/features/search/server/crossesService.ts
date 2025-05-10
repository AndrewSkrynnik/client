import { Cross } from "@/features/search/types";

import axiosInstance from "@/libs/axios";

export const fetchCrossesData = async (
  number: string,
  brand: string
): Promise<Cross | null> => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/abcp/article-info`,
      {
        params: {
          number,
          brand,
          format: "bnpchmti",
          locale: "ru_RU"
        }
      }
    );

    const data = response.data;
    console.log("Ответ API:", data);

    // Проверяем, что API вернул не пустой объект и содержит хотя бы 1 кросс
    if (!data || Object.keys(data).length === 0) {
      console.warn("Пустой ответ от API или ошибка в данных");
      return null;
    }

    return {
      brand: data.brand || "Неизвестный бренд",
      number: data.number || number,
      outerNumber: data.outer_number || number,
      descr: data.descr || "Описание отсутствует",
      properties: data.properties || {},
      crosses: Array.isArray(data.crosses) ? data.crosses : [],
      images: Array.isArray(data.images) ? data.images : [],
      imagesCount: data.images_count || 0
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Ошибка при получении данных о кроссах:", error.message);
      throw new Error("Ошибка загрузки данных");
    } else {
      console.error("Непредвиденная ошибка:", error);
      throw new Error("Произошла непредвиденная ошибка");
    }
  }
};
