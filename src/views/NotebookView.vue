<script setup>
import MainNavBarNotebook from "@/components/MainNavBarNotebook.vue";
import Notebook from "@/components/Notebook.vue";
</script>

<template>
  <div class="d-flex flex-column align-items-center vh-100 custom-bg">
    <h2>Libro de notas de: Èlia Serrán Villar</h2>
    <div class="containerNotebook d-flex flex-row gap-3">
      <MainNavBarNotebook/>
      <Notebook/>
    </div>
  </div>
</template>

<style scoped>
  h2 {
    text-align: center;
    color: white;
    padding-top: 50px;
  }

  .custom-bg {
    background-color: rgb(122, 122, 122);
  }
</style>
