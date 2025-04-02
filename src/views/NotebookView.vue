<script setup>
  import MainNavBarNotebook from "@/components/MainNavBarNotebook.vue";
  import Notebook from "@/components/Notebook.vue";
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
    <!--dynamic load for name and surnames about user-->
    <h2>Libro de notas</h2>
    <h3>{{ name }} {{ surname1 }} {{ surname2}}</h3>
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

  h2{
    text-align: center;
    color: white;
    padding-top: 50px;
  }

  h3{
    text-align: center;
    color: white;
    padding-top: 0px;
    margin-bottom: 50px;
  }

  .containerNotebook {
    display: flex;
    flex-direction: row;
    gap: 150px;
    margin-left: 50px;
  }
</style>
