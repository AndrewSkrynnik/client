import axios from "axios";

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_URL}/users/profile`,
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка получения данных пользователя:", error);
    throw error;
  }
};
