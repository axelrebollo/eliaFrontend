import api from "./notebookApi.js";
import { useAuthStore } from "@/stores/authStore.js";

//Get table for teacher profile
const getTableProfile = async () => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try {
    const response = await api.apiClassroomProfile.get(`/getClassroomsData?token=${authStore.token}`,{
      headers: {Authorization: `Bearer ${authStore.token}`},
    });
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

export { getTableProfile };
