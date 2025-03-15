<script setup>
  import MainNavBarNotebook from "@/components/MainNavBarNotebook.vue";
  import Notebook from "@/components/Notebook.vue";
</script>

<template>
  <div>
    <h2>Libro de notas de: Èlia Serrán Villar</h2>
    <div class="containerNotebook">
      <MainNavBarNotebook/>
      <Notebook/>
    </div>
  </div>
</template>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: rgb(122, 122, 122);
  }

  h2 {
    text-align: center;
    color: white;
    padding-top: 50px;
  }

  .containerNotebook {
    display: flex;
    flex-direction: row;
    gap: 150px;
  }
</style>
