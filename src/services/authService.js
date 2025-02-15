import apiClient from "./api.js";

const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Error en el registro:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export { registerUser };
