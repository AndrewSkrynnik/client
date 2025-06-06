import {
  AbcpResponse,
  CrossData,
  CrossReplacement,
  LocalOfferGroup
} from "@/features/search/types";

import axiosInstance from "@/libs/axios";

export const fetchCrossesData = async (
  number: string,
  brand: string,
  userId: number
): Promise<CrossData | null> => {
  if (!userId) {
    console.warn("User ID не найден, запрос не будет выполнен");
    return null;
  }

  try {
    const response = await axiosInstance.get<AbcpResponse>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/abcp/article-info`,
      {
        params: {
          number,
          brand,
          userId,
          format: "bnpchmti",
          locale: "ru_RU"
        }
      }
    );

    const data = response.data;

    if (!data || Object.keys(data).length === 0) {
      console.warn("Пустой ответ от API или ошибка в данных");
      return null;
    }

    const localOffers: LocalOfferGroup[] = (data as any).localOffers || [];

    const mapped: CrossData = {
      brand: data.brand || "Неизвестный бренд",
      number: data.number || number,
      outerNumber: data.outer_number || number,
      descr: data.descr || "Описание отсутствует",
      properties: data.properties || {},
      crosses: Array.isArray(data.crosses)
        ? (data.crosses as CrossReplacement[]).map(cross => ({
            ...cross,
            localOffers: localOffers.filter(
              offer =>
                offer.brand === cross.brand && offer.number === cross.number
            )
          }))
        : [],
      images: Array.isArray(data.images)
        ? data.images.map((img: any) => ({
            name: img.name,
            order: img.order ?? 0,
            url: img.url ?? `https://pubimg.nodacdn.net/images/${img.name}`
          }))
        : [],
      imagesCount: data.images_count || 0
    };

    return mapped;
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
