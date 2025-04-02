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
  } 
  catch (error) {
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
    alert("Error agregando el año: "+error.response.data.mensaje);
    return null;
  }
};

//delete year and tables
const deleteYear = async (nameYear) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try{
    const response = await api.apiYears.delete(`/deleteYear?token=${authStore.token}&nameYear=${nameYear}`,
      { headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  }
  catch(error){
    console.error("Error borrando el año: ",
      error.response?.data || error.message
    );
    alert("Ha ocurrido un problema al eliminar el año: "+error.response.data.mensaje);
  }
};

//update name year
const updateNameYear = async (nameYear, newNameYear) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try{
    const response = await api.apiYears.patch(`/updateNameYear?token=${authStore.token}&nameYear=${nameYear}&newNameYear=${newNameYear}`,
      { headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  }
  catch(error){
    console.error("Error actualizando el año: ",
      error.response?.data || error.message
    );
    alert("Ha ocurrido un error al actualizar el año: "+error.response.data.mensaje);
  }
};

export { 
  getYears,
  addYear,
  deleteYear,
  updateNameYear,
 };