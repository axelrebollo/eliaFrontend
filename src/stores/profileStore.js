import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./authStore";
import api from "@/services/api.js";

export const useProfileStore = defineStore("profile", () => {
  const profile = ref({
    name: "",
    surname1: "",
    surname2: "",
  });

  async function fetchProfile() {
    const authStore = useAuthStore();
    if (!authStore.token) return;

    try {
      const response = await api.apiProfile.get(`/getProfile`, 
        { params: { token: authStore.token }, });
      profile.value = {
        name: response.data.name || "",
        surname1: response.data.surname1 || "",
        surname2: response.data.surname2 || "",
      };
    } catch (error) {
      console.error("Error al recuperar el perfil:", error.response?.data || error.message);
    }
  }

  return { profile, fetchProfile };
});