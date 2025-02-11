<script setup></script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="width: 350px">
      <h3 class="text-center mb-3">Iniciar Sesión</h3>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            placeholder="Ingrese su usuario"
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
