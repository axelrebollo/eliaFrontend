<script setup>
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/authStore.js";
  import { computed } from "vue";
  const router = useRouter();
  const authStore = useAuthStore();
  const isAutenticated = computed(() => authStore.isAuthenticated);
  const userEmail = computed(() => authStore.userEmail);
  const userRole = computed(() => authStore.userRole);

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
    if(authStore.userRole === "TEACHER"){ //POR ARREGLAR
      router.push("/profile/profileTeacher"); //dependiendo del role
    }
    else{
      router.push("/profile/profileStudent"); //dependiendo del role
    }
  };

  const goToNotebook = () => {
    router.push("/notebook");
  };

  const logout = () => {
    authStore.logout();
    router.push("/");
  };
</script>

<template>
  <nav class="navbar navbar-dark bg-dark">
    <ul class="menu_left">
      <li>
        <button type="button" class="btn btn-outline-custom" @click="goTohome">
          <a>Principal</a>
        </button>
      </li>
      <li v-if="isAutenticated">
        <button type="button" class="btn btn-outline-custom" @click="goToProfile">
          <a>Perfil de usuario</a>
        </button>
      </li>
      <li v-if="isAutenticated && userRole === 'TEACHER'">
        <button type="button" class="btn btn-outline-custom" @click="goToNotebook">
          <a>Libro de notas</a>
        </button>
      </li>
    </ul>
    <ul class="menu_right">
      <template v-if="!isAutenticated">
        <li>
          <button type="button" class="btn btn-outline-custom" @click="goToLogin">
            Inicio de sesión
          </button>
        </li>
        <li>
          <button type="button" class="btn btn-outline-custom" @click="goToRegister">
            Registrate
          </button>
        </li>
      </template>
      <template v-else>
        <li>
          <span class="text-light">{{ userEmail }}</span>
        </li>
        <li>
          <button type="button" class="btn btn-outline-custom" @click="logout">
            Cerrar sesión
          </button>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped>
  .btn-outline-custom{
    color: #ffcc00;
    border-color: #ffcc00;
  }

  .btn-outline-custom:hover{
    background-color: #ffcc00;
    color: black;
  }

  .menu_right,
  .menu_left{
    display: flex;
    gap: 20px;
  }

  ul{
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
</style>
