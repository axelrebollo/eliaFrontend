import api from "./userApi.js";

//Get user profile (API interaction)
const getProfile = async () => {
  try {
    const response = await api.apiProfile.get("/getProfile");
    return response.data;
  } 
  catch (error) {
    console.error(
      "Error en el registro:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//update user profile (API interaction)
const updateProfile = async (updatedData) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return false;
  }

  try {
    const response = await api.apiProfile.post("/updateProfile", updatedData, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    return response.data;
  } 
  catch (error) {
    console.error("Error al actualizar perfil:", error.response?.data || error.message);
    throw error;
  }
};

export { getProfile, updateProfile };
