<template>
  <nav class="navbar navbar-dark bg-dark">
    <ul class="menu_left">
      <li>
        <button type="button" class="btn btn-outline-custom" @click="goTohome">
          <a>Principal</a>
        </button>
      </li>
      <li>
        <button
          type="button"
          class="btn btn-outline-custom"
          @click="goToProfile"
        >
          Perfil de usuario
        </button>
      </li>
      <li>
        <button
          type="button"
          class="btn btn-outline-custom"
          @click="goToNotebook"
        >
          Libro de notas
        </button>
      </li>
    </ul>
    <ul class="menu_right">
      <li>
        <button type="button" class="btn btn-outline-custom" @click="goToLogin">
          Inicio de sesión
        </button>
      </li>
      <li>
        <button
          type="button"
          class="btn btn-outline-custom"
          @click="goToRegister"
        >
          Registrate
        </button>
      </li>
      <li>
        <button type="button" class="btn btn-outline-custom" @click="goTohome">
          Cerrar sesión
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goTohome = () => {
  router.push("/");
};

const goToRegister = () => {
  router.push("/auth/register");
};

const goToLogin = () => {
  router.push("/auth/login");
};

const goToProfile = () => {
  router.push("/profile");
};

const goToNotebook = () => {
  router.push("/notebook");
};
</script>

<style scoped>
.btn-outline-custom {
  color: #ffcc00;
  border-color: #ffcc00;
}

.btn-outline-custom:hover {
  background-color: #ffcc00;
  color: black;
}
.menu_right,
.menu_left {
  display: flex;
  gap: 20px;
}
ul {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
