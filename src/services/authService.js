import apiClient from "./api.js";

const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/register", userData);
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

const loginUser = async (userData) => {
  try {
    const response = await apiClient.post("/login", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Error en la autenticación de usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export { loginUser };
