import api from "./api.js";

const getProfile = async () => {
  try {
    const response = await api.apiProfile.get("/getProfile");
    return response.data;
  } catch (error) {
    console.error(
      "Error en el registro:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export { getProfile };
