<script setup>
  import { RouterView } from "vue-router";
  import MainNavbar from "./components/MainNavbar.vue";
</script>

<template>
  <!--top menu-->
  <MainNavbar />
  <!--router general view-->
  <RouterView />
</template>

<style scoped></style>
