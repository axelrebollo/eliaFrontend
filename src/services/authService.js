import api from "./userApi.js";

//register user (API interaction)
const registerUser = async (userData) => {
  try {
    const response = await api.apiClient.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Error en el registro:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//login user (API interaction)
export { registerUser };

const loginUser = async (userData) => {
  try {
    const response = await api.apiClient.post("/login", userData);
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
