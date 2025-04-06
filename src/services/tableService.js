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
        alert("Ha ocurrido un error al obtener las tablas: "+error.response.data.mensaje);
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
    alert("Error agregando la tabla: "+error.response.data.mensaje);
    return null;
  }
};

//delete table and all cells into table
const deleteTable = async (classCode) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try{
    const response = await api.apiTables.delete(`/deleteTable?token=${authStore.token}&classCode=${classCode}`,
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

//update name group
const updateNameTable = async (nameSubject, nameYear, nameCourse, nameGroup, nameTable, newNameTable) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try{
    const response = await api.apiTables.patch(`/updateNameTable?token=${authStore.token}&nameSubject=${nameSubject}&nameYear=${nameYear}&nameCourse=${nameCourse}&nameGroup=${nameGroup}&nameTable=${nameTable}&newNameTable=${newNameTable}`,
      { headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  }
  catch(error){
    console.error("Error actualizando la tabla: ",
      error.response?.data || error.message
    );
    alert("Ha ocurrido un error al actualizar la tabla: "+error.response.data.mensaje);
  }
};

export{
    getTables,
    addTable,
    deleteTable,
    updateNameTable,
}