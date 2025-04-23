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

  //reactive variables to check components
  const isLoginPage = computed(() => router.currentRoute.value.path === "/auth/login");
  const isRegisterPage = computed(() => router.currentRoute.value.path === "/auth/register");
  const isProfileStudentPage = computed(() => router.currentRoute.value.path === "/profile/profileStudent");
  const isProfileTeacherPage = computed(() => router.currentRoute.value.path === "/profile/profileTeacher");
  const isNotebookPage = computed(() => router.currentRoute.value.path === "/notebook");
  const isClassroomPage = computed(() => router.currentRoute.value.path === "/classroomView");

  const goToProfile = () => {
    if(authStore.userRole === "TEACHER"){
      router.push("/profile/profileTeacher");
    }
    else{
      router.push("/profile/profileStudent");
    }
  };

  const goToNotebook = () => {
    router.push("/notebook");
  };

  const goToClassroom = () => {
    router.push("/classroomView");
  }

  const logout = () => {
    authStore.logout();
    router.push("/");
  };
</script>

<template>
  <nav class="navbar navbar-dark bg-dark">
    <ul class="menu_left">
      <!--home-->
      <li>
        <button type="button" class="btn btn-outline-custom" @click="goTohome">
          <a>Principal</a>
        </button>
      </li>
      <!--profile-->
      <li v-if="(isAutenticated && !isProfileStudentPage && userRole === 'STUDENT') ||
                (isAutenticated && !isProfileTeacherPage && userRole === 'TEACHER')">
        <button type="button" class="btn btn-outline-custom" @click="goToProfile">
          <a>Perfil de usuario</a>
        </button>
      </li>
      <!--notebook-->
      <li v-if="isAutenticated && userRole === 'TEACHER' && !isNotebookPage">
        <button type="button" class="btn btn-outline-custom" @click="goToNotebook">
          <a>Libro de notas</a>
        </button>
      </li>
      <!--classroomView-->
      <li v-if="isAutenticated && userRole === 'STUDENT' && !isClassroomPage">
        <button type="button" class="btn btn-outline-custom" @click="goToClassroom">
          <a>Notas</a>
        </button>
      </li>
    </ul>
    <ul class="menu_right">
      <template v-if="!isAutenticated">
        <!--login-->
        <li v-if="!isLoginPage">
          <button type="button" class="btn btn-outline-custom" @click="goToLogin">
            Inicio de sesión
          </button>
        </li>
        <!--register-->
        <li v-if="!isRegisterPage">
          <button type="button" class="btn btn-outline-custom" @click="goToRegister">
            Registrate
          </button>
        </li>
      </template>
      <template v-else>
        <!--email user-->
        <li>
          <span class="text-light">{{ userEmail }}</span>
        </li>
        <!--close session-->
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
