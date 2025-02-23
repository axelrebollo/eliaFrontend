<template>
  <MainNavbar />
  <RouterView />
</template>

<script setup>
  import { RouterView } from "vue-router";
  import MainNavbar from "./components/MainNavbar.vue";
</script>

<style scoped></style>
