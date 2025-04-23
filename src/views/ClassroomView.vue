<script setup>
  import { onMounted, ref, watch } from "vue";
  import { useProfileStore } from "@/stores/profileStore";

  //variables
  const profileStore = useProfileStore();
  const name = ref("");
  const surname1 = ref("");
  const surname2 = ref("");

  //inizialices when opening notebook view
  onMounted(async () => {
    //get profile
    await profileStore.fetchProfile();

    //load variables to view
    name.value = profileStore.profile.name;
    surname1.value = profileStore.profile.surname1;
    surname2.value = profileStore.profile.surname2;
  });
</script>

<template>
    <div>
        <h2>Notas del alumno/a : {{ name }} {{ surname1 }} {{ surname2}}</h2>
        <h3>Tabla dinámica que muestre las notas de las clases del estudiante</h3>
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

  h2{
    text-align: center;
    color: white;
    padding-top: 50px;
  }
</style>