<script setup>
  import { ref } from "vue";
  import { loginUser } from "@/services/authService.js";
  import { useAuthStore } from "@/stores/authStore.js";
  import { useRouter } from "vue-router";

  const email = ref("");
  const password = ref("");
  const loading = ref(false);
  const role = ref("");
  const router = useRouter();
  const authStore = useAuthStore();

  const login = async () => {
    if(email.value === "" || password.value === ""){
      alert("Hay algún campo vacío");
      return;
    }

    const userData = {
      email: email.value,
      password: password.value,
      role: role.value,
    };

    try{
      role.value = "";
      loading.value = true;
      const response = await loginUser(userData);

      //deserialize token and save data
      if(!response && !response.token){
        alert("Error en la autenticación.");
        console.log("Token no recibido");
        return;
      }

      authStore.setUserData(response.token);
      router.push("/");
    } 
    catch (error){
      alert("Se ha producido un error en la autenticación: "+ error.response.data.Error);
      console.error("Error en login:", error);
    } 
    finally{
      loading.value = false;
    }
  };
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 custom-bg">
    <div class="card p-4 shadow" style="width: 350px; background-color: #343a40;">
      <h3 class="text-center mb-3 text-white">Iniciar Sesión</h3>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label text-white">Email</label>
          <input v-model="email" type="email" class="form-control" placeholder="Ingrese su email"/>
        </div>
        <div class="mb-3">
          <label class="form-label text-white">Contraseña</label>
          <input v-model="password" type="password" class="form-control" placeholder="Ingrese su contraseña" required/>
        </div>
        <button type="submit" class="btn btn-secondary w-100" :disabled="loading">
          {{ loading ? "ingresando..." : "Ingresar" }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  button[disabled] {
    cursor: not-allowed;
    opacity: 0.7;
  }

  .custom-bg {
    background-color: rgb(122, 122, 122);
  }
</style>
