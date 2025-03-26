import api from "./notebookApi.js";
import { useNotebookStore } from "@/stores/notebookStore.js";
import { useAuthStore } from "@/stores/authStore.js";

//Get table cells for teacher profile
const getCellsForTable = async (nameSubject, nameYear, nameCourse, nameGroup, nameTable) => {
  const authStore = useAuthStore();
  const notebookStore = useNotebookStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try {
    const response = await api.apiCells.get(`/getTable?token=${authStore.token}&nameSubject=${nameSubject}&nameYear=${nameYear}&nameCourse=${nameCourse}&nameGroup=${nameGroup}&nameTable=${nameTable}`,{
      headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  } 
  catch (error) {
    console.error(
      "Error obteniendo las celdas de la tabla:",
      error.response?.data || error.message
    );
    throw error;
  }
};

//add task in right of position reference
const addTask = async (classCode, nameNewTask, nameReferenceTask,
  nameSubject, nameYear, nameCourse, nameGroup) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try{
    const response = await api.apiCells.put(`/addTask?token=${authStore.token}&classCode=${classCode}&nameNewTask=${nameNewTask}&nameReferenceTask=${nameReferenceTask}&nameSubject=${nameSubject}&nameYear=${nameYear}&nameCourse=${nameCourse}&nameGroup=${nameGroup}`,
      { headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  }
  catch(error){
    console.error("Error creando la tarea: ",
      error.response?.data || error.message
    );
  }
};

export { 
    getCellsForTable,
    addTask,
 };