import api from "./notebookApi.js"
import { useAuthStore } from "@/stores/authStore.js";

//get groups
const getGroups = async (nameCourse, nameSubject, nameYear) => {
    const authStore = useAuthStore();
    if (!authStore.token) {
      console.error("No hay token disponible.");
      return [];
    }

    try {
      const response = await api.apiGroups.get(`/getGroup?token=${authStore.token}&nameCourse=${nameCourse}&nameSubject=${nameSubject}&nameYear=${nameYear}`,{
        headers: {Authorization: `Bearer ${authStore.token}`},
      });
      return response.data.groups;
    }
    catch(error){
      console.error("Error obteniendo los grupos:", error.response?.data || error.message);
      return [];
    }
};

//addGroup
const addGroup = async (nameCourse, nameSubject, nameYear, nameGroup) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return;
  }

  try {
    const response = await api.apiGroups.post(
      `/addGroup?token=${authStore.token}&nameCourse=${nameCourse}&nameSubject=${nameSubject}&nameYear=${nameYear}&nameGroup=${nameGroup}`,
      {},
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error agregando el grupo:", error.response?.data || error.message);
    alert("Error agregando el grupo: "+error.response.data.mensaje);
    return null;
  }
};

//delete group and tables
const deleteGroup = async (nameCourse, nameSubject, nameYear, nameGroup) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try{
    const response = await api.apiGroups.delete(`/deleteGroup?token=${authStore.token}&nameCourse=${nameCourse}&nameSubject=${nameSubject}&nameYear=${nameYear}&nameGroup=${nameGroup}`,
      { headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  }
  catch(error){
    console.error("Error borrando la columna de la tarea: ",
      error.response?.data || error.message
    );
    alert("Ha ocurrido un problema eliminar la tabla: "+error.response.data.mensaje);
  }
};

export{
    getGroups,
    addGroup,
    deleteGroup,
}