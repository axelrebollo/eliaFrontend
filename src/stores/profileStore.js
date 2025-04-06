import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";
import api from "@/services/userApi.js";

export const useProfileStore = defineStore("profile", () => {
  //Save user data profile
  const profile = ref({
    name: "",
    surname1: "",
    surname2: "",
  });

  //get profile and update localStorage
  async function fetchProfile() {
    const authStore = useAuthStore();
    if (!authStore.token) return;

    try {
      const response = await api.apiProfile.get(`/getProfile`, 
        { params: { token: authStore.token }, 
      });

      profile.value = {
        name: response.data.name || "",
        surname1: response.data.surname1 || "",
        surname2: response.data.surname2 || "",
      };

      //update localStorage
      localStorage.setItem("name", profile.value.name);
      localStorage.setItem("surname1", profile.value.surname1);
      localStorage.setItem("surname2", profile.value.surname2);
    } 
    catch (error) {
      console.error("Error al recuperar el perfil:", error.response?.data || error.message);
      alert("Ha ocurrido un error al obtener el perfil: "+error.response.data.mensaje);
    }
  }

  //update profile and update localStorage
  async function updateProfile(updatedData) {
    const authStore = useAuthStore();
    if (!authStore.token) {
      console.error("No hay token de autenticación.");
      return false;
    }

    try {
      const response = await api.apiProfile.post(`/updateProfile`, null, {
        params: { 
          token: authStore.token, 
          name: updatedData.name,
          surname1: updatedData.surname1,
          surname2: updatedData.surname2,
        },
      });

      //update localStorage
      localStorage.setItem("name", profile.value.name);
      localStorage.setItem("surname1", profile.value.surname1);
      localStorage.setItem("surname2", profile.value.surname2);
      
      return true;
    } 
    catch (error) {
      console.error("Error al actualizar el perfil:", error.response?.data || error.message);
      alert("Ha ocurrido un error al actualizar el perfil: "+error.response.data.mensaje);
      return false;
    }
  }

  return { 
    profile, 
    fetchProfile, 
    updateProfile 
  };
});