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
    alert("Ha ocurrido un error al obtener las asignaturas: "+error.response.data.mensaje);
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
    alert("Error agregando la asignatura: "+error.response.data.mensaje);
    return null;
  }
};

//delete subject and tables
const deleteSubject = async (nameSubject) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try{
    const response = await api.apiSubjects.delete(`/deleteSubject?token=${authStore.token}&nameSubject=${nameSubject}`,
      { headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  }
  catch(error){
    console.error("Error borrando la asignatura: ",
      error.response?.data || error.message
    );
    alert("Ha ocurrido un problema al eliminar la asignatura: "+error.response.data.mensaje);
  }
};

//update name subject
const updateNameSubject = async (nameSubject, newNameSubject) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try{
    const response = await api.apiSubjects.patch(`/updateNameSubject?token=${authStore.token}&nameSubject=${nameSubject}&newNameSubject=${newNameSubject}`,
      { headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  }
  catch(error){
    console.error("Error actualizando la asignatura: ",
      error.response?.data || error.message
    );
    alert("Ha ocurrido un error al actualizar la asignatura: "+error.response.data.mensaje);
  }
};

export { 
  getSubjects,
  addSubject,
  deleteSubject,
  updateNameSubject,
 };