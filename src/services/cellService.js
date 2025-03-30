import api from "./notebookApi.js";
import { useAuthStore } from "@/stores/authStore.js";

//Get table cells for teacher profile
const getCellsForTable = async (nameSubject, nameYear, nameCourse, nameGroup, nameTable) => {
  const authStore = useAuthStore();
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
    const response = await api.apiCells.post(`/addTask?token=${authStore.token}&classCode=${classCode}&nameNewTask=${nameNewTask}&nameReferenceTask=${nameReferenceTask}&nameSubject=${nameSubject}&nameYear=${nameYear}&nameCourse=${nameCourse}&nameGroup=${nameGroup}`,
      { headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  }
  catch(error){
    console.error("Error creando la tarea: ",
      error.response?.data || error.message
    );
    alert("Ha ocurrido un error al añadir la tabla: "+error.response.data.mensaje);
  }
};

//update note into table with student and task
const updateNote = async (classCode, nameStudent, nameTask, newNote) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try{
    const response = await api.apiCells.patch(`/updateNote?token=${authStore.token}&classCode=${classCode}&student=${nameStudent}&task=${nameTask}&note=${newNote}`,
      { headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  }
  catch(error){
    console.error("Error creando la tarea: ",
      error.response?.data || error.message
    );
    alert("Ha ocurrido un error al añadir la nota: "+error.response.data.mensaje);
  }
};

//delete column task into table
const deleteTask = async (classCode, columnIndex) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try{
    const response = await api.apiCells.delete(`/deleteTaskColumn?token=${authStore.token}&classCode=${classCode}&positionTaskColumn=${columnIndex}`,
      { headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  }
  catch(error){
    console.error("Error borrando la columna de la tarea: ",
      error.response?.data || error.message
    );
  }
};

export { 
    getCellsForTable,
    addTask,
    updateNote,
    deleteTask,
 };