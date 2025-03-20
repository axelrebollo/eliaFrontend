import api from "./notebookApi.js"
import { useAuthStore } from "@/stores/authStore.js";

//get courses
const getCourses = async (nameYear) => {
    const authStore = useAuthStore();
    if (!authStore.token) {
        console.error("No hay token disponible.");
        return [];
    }

    try {
        const response = await api.apiCourses.get(`/getCourses?token=${authStore.token}&nameYear=${nameYear}`,{
        headers: {Authorization: `Bearer ${authStore.token}`},
        });
        return response.data.courses;
    }
    catch(error){
        console.error("Error obteniendo los cursos:", error.response?.data || error.message);
    return [];
    }
};

//addCourse
const addCourse = async (nameCourse, nameSubject, nameYear) => {
  const authStore = useAuthStore();
  if (!authStore.token) {
    console.error("No hay token disponible.");
    return;
  }

  try {
    const response = await api.apiCourses.post(
      `/addCourse?token=${authStore.token}&nameCourse=${nameCourse}&nameSubject=${nameSubject}&nameYear=${nameYear}`,
      {},
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error agregando el curso:", error.response?.data || error.message);
    alert("Error agregando el curso: "+error.response.data.mensaje);
    return null;
  }
};

export{
    getCourses,
    addCourse
}