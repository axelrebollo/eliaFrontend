import api from "./notebookApi.js";
import { useAuthStore } from "@/stores/authStore.js";

//getSubjects
const getSubjects = async () => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try {
    const response = await api.apiSubjects.get(`/getSubjects?token=${authStore.token}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    return response.data.subjects;
  } catch (error) {
    console.error("Error obteniendo los años:", error.response?.data || error.message);
    return [];
  }
};

//addSubjects
const addSubject = async (nameSubject) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return;
  }

  try {
    const response = await api.apiSubjects.post(
      `/addSubject?token=${authStore.token}&nameSubject=${nameSubject}`,
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
  getSubjects,
  addSubject
 };