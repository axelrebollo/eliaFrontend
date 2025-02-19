<script setup>
import { ref } from "vue";
import { loginUser } from "@/services/authService.js";
//import { useAuthStore } from "@/stores/authStore.js";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const role = ref("");
const router = useRouter();
//const authStore = useAuthStore();

const login = async () => {
  if (email.value === "" || password.value === "") {
    alert("Hay algún campo vacío");
    return;
  }

  const userData = {
    email: email.value,
    password: password.value,
    role: role.value,
  };

  try {
    role.value = "";
    const response = await loginUser(userData);
    //authStore.setUserData(response);
    router.push("/");
    alert("La autenticación de usuario es correcta");
    console.log(response);
  } catch {
    alert("Se ha producido un error en la autenticación");
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="width: 350px">
      <h3 class="text-center mb-3">Iniciar Sesión</h3>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model="email"
            type="text"
            class="form-control"
            placeholder="Ingrese su email"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
