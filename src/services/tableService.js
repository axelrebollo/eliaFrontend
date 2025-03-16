import api from "./notebookApi.js"
import { useAuthStore } from "@/stores/authStore.js";

//get tables
const getTables = async (nameSubject, nameYear, nameCourse, nameGroup) => {
    const authStore = useAuthStore();
    if (!authStore.token) {
        console.error("No hay token disponible.");
        return [];
    }

    try {
      const response = await api.apiTables.get(`/getTables?token=${authStore.token}&nameGroup=${nameGroup}&nameCourse=${nameCourse}&nameSubject=${nameSubject}&nameYear=${nameYear}`,{
      headers: {Authorization: `Bearer ${authStore.token}`},
      });
      return response.data.tables;
    }
    catch(error){
        console.error("Error obteniendo las páginas(tablas):", error.response?.data || error.message);
    return [];
    }
};

//addTable
const addTable = async (nameSubject, nameYear, nameCourse, nameGroup, nameTable) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return;
  }

  try {
    const response = await api.apiTables.post(
      `/addTable?token=${authStore.token}&nameTable=${nameTable}&nameGroup=${nameGroup}&nameCourse=${nameCourse}&nameSubject=${nameSubject}&nameYear=${nameYear}`,
      {},
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error agregando la tabla:", error.response?.data || error.message);
    return null;
  }
};

export{
    getTables,
    addTable,
}