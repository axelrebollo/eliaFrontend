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

export{
    getGroups,
}