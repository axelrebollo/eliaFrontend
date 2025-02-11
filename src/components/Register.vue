<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const role = ref("Profesor");

const register = () => {
  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden");
    return;
  }
  console.log("Usuario:", username.value, "Rol:", role.value);
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="width: 350px">
      <h3 class="text-center mb-3">Registro de Usuario</h3>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label">Nombre de Usuario</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            placeholder="Ingrese su nombre de usuario"
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
            <option value="Profesor">Profesor</option>
            <option value="Alumno">Alumno</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-100">Registrar</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
