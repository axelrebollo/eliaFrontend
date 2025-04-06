import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", () => {
  //load data into localStorage
  const token = ref(localStorage.getItem("token") || null);
  const role = ref(localStorage.getItem("role")|| null);
  const email = ref(localStorage.getItem("email")|| null);

  //update localStorage with data
  function setUserData(userToken) {
    token.value = userToken;
    localStorage.setItem("token", userToken);

    try{
      const decoded = jwtDecode(userToken);
      role.value = decoded.role || null;
      email.value = decoded.email || null;

      localStorage.setItem("role",role.value);
      localStorage.setItem("email",email.value);
    } 
    catch(error){
      console.error("Error decodificando el token:", error);
      alert("Ha ocurrido un error al decodificar el token de acceso: "+error.response.data.mensaje);
      logout();
    }
  }

  //close session 
  function logout() {
    token.value = null;
    role.value = null;
    email.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
  }

  //check if user is autenticated
  const isAuthenticated = computed(() => {
    if (!token.value) return false;
    try {
      const { exp } = jwtDecode(token.value);
      return Date.now() < exp * 1000;
    } catch {
      logout();
      return false;
    }
  });

  //reactive variables
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
