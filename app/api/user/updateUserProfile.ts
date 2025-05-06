import { User } from "@/store/types";

import axios from "axios";

export const updateUserProfile = async (userData: Partial<User>) => {
  try {
    const response = await axios.put(
      `${process.env.SERVER_URL}/users/profile`,
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
    throw error;
  }
};
