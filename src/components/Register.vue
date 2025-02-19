<script setup>
import { ref } from "vue";
import { registerUser } from "@/services/authService.js";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const role = ref("");
const router = useRouter();

const register = async () => {
  const userData = {
    email: email.value,
    password: password.value,
    role: role.value,
  };

  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  if (email.value == "" || password.value === "" || role.value === "") {
    alert("Hay algún campo vacío");
    return;
  }

  try {
    const response = await registerUser(userData);
    alert("El registro se ha realizado con éxito");
    console.log(response);
    router.push("login");
  } catch {
    alert("Se ha producido un error en el registro");
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="width: 350px">
      <h3 class="text-center mb-3">Registro de Usuario</h3>
      <form @submit.prevent="register">
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
        <div class="mb-3">
          <label class="form-label">Vuelva a escribir la contraseña</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="form-control"
            placeholder="Repita su contraseña"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Rol</label>
          <select v-model="role" class="form-select">
            <option value="TEACHER">Profesor</option>
            <option value="STUDENT">Alumno</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-100">Registrar</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
