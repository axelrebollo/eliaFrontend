import api from "./notebookApi.js";
import { useAuthStore } from "@/stores/authStore.js";

//getYears
const getYears = async () => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try {
    const response = await api.apiYears.get(`/getYears?token=${authStore.token}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    return response.data.years;
  } catch (error) {
    console.error("Error obteniendo los años:", error.response?.data || error.message);
    return [];
  }
};

//addYears
const addYear = async (nameYear) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return;
  }

  try {
    const response = await api.apiYears.post(
      `/addYear?token=${authStore.token}&nameYear=${nameYear}`,
      {},
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error agregando el año:", error.response?.data || error.message);
    return null;
  }
};

export { 
  getYears,
  addYear
 };