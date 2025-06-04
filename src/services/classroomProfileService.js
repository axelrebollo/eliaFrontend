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
    alert("Ha ocurrido un error al obtener la tabla para el perfil del profesor: "+error.response.data.mensaje);
    throw error;
  }
};

//enrollClassroom
const enrollClassroom = async (classCode) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return;
  }

  try {
    const response = await api.apiClassroomProfile.put(
      `/enrollClassroom?token=${authStore.token}&classCode=${classCode}`,
      {},
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en la inscripción del alumno en la clase:", error.response?.data || error.message);
    alert("Ha ocurrido un error al insertar el alumno en la clase: "+error.response.data.mensaje);
    return null;
  }
};

//Get table for student profile
const getNotesForStudent = async () => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return [];
  }

  try {
    const response = await api.apiClassroomProfile.get(`/getNotesForStudent?token=${authStore.token}`,{
      headers: {Authorization: `Bearer ${authStore.token}`},
    });
    return response.data;
  } 
  catch (error) {
    console.error(
      "Error en el registro:",
      error.response?.data || error.message
    );
    alert("Ha ocurrido un error al obtener la tabla para mostrar las notas del estudiante: "+error.response.data.mensaje);
    throw error;
  }
};

export { 
  getTableProfile,
  enrollClassroom,
  getNotesForStudent,
 };
