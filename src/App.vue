<script setup>
  import { RouterView } from "vue-router";
  import MainNavbar from "./components/MainNavbar.vue";
</script>

<template>
  <!--top menu-->
  <MainNavbar />
  <!--router general view-->
  <div class="app-background">
    <RouterView />
  </div>
</template>

<style scoped>
  .app-background {
    background-color: rgb(122, 122, 122);
    min-height: 100vh;
  }
</style>
