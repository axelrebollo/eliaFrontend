<script setup>
  import { onMounted, ref, computed } from "vue";
  import { useProfileStore } from "@/stores/profileStore";
  import { getNotesForStudent } from "@/services/classroomProfileService.js";

  //variables
  const profileStore = useProfileStore();
  const name = ref("");
  const surname1 = ref("");
  const surname2 = ref("");
  const classrooms = ref([]);

  //inizialices when opening notebook view
  onMounted(async () => {
    //get profile
    await profileStore.fetchProfile();

    //load variables to view
    name.value = profileStore.profile.name;
    surname1.value = profileStore.profile.surname1;
    surname2.value = profileStore.profile.surname2;

    loadNotesTable();
  });

  const loadNotesTable = async () =>{
    try{
      const response = await getNotesForStudent();
      classrooms.value = response.classrooms;
    }
    catch(error){
      console.log("Error al cargar la tabla: ", error);
    }
  };
</script>

<template>
  <div class="container vh-100 d-flex align-items-center">
    <div class="card p-4 shadow">
      <h3>Notas de: {{ name }} {{ surname1 }} {{ surname2}}</h3>
      <!--dynamic table for notes-->
      <table v-if="classrooms.length > 0" class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Código clase</th>
            <th>Asignatura</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="classroom in classrooms" :key="classroom.classCode">
            <td>{{ classroom.classCode }}</td>
            <td>{{ classroom.nameSubject }}</td>
            <td>
              <div class="notes-container">
                <div v-for="(note, task) in classroom.notes" :key="task" class="note-block">
                  {{ task }}
                  <div>
                    {{ note }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!--if not exist data then message-->
      <div v-else class="text-center text-light mt-4">
        No hay notas disponibles.
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: rgb(122, 122, 122);
    padding-top: 150px;
  }

  h3{
    text-align: center;
    color: white;
    padding-top: 0px;
  }

  .card {
    background-color: #343a40; 
  }

  /*table*/
  .table {
    border-color: #6c757d;
    margin-top: 10px;
  }

  .table th{
    text-align: center;
    padding: 10px;
  }

  .table td{
    padding: 10px;
  }

  .notes-container {
    display: flex;
    gap: 30px;
  }

  .note-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>