import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const role = ref(null);
  const email = ref(null);

  function setUserData(userToken) {
    token.value = userToken;

    try {
      const decoded = JSON.parse(atob(userToken.split(".")[1]));
      role.value = decoded.role;
      email.value = decoded.email;
    } catch (error) {
      console.error("Error decodificando el token:", error);
    }
  }

  function logout() {
    token.value = null;
    role.value = null;
    email.value = null;
  }

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => role.value);
  const userEmail = computed(() => email.value);

  return {
    token,
    role,
    email,
    setUserData,
    logout,
    isAuthenticated,
    userRole,
    userEmail,
  };
});
