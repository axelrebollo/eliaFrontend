<script setup>
  import { onMounted, ref, watch } from "vue";
  import { useProfileStore } from "@/stores/profileStore";
  import { useAuthStore } from "@/stores/authStore";
  import { getTableProfile,enrollClassroom } from "@/services/classroomProfileService.js";

  //variables
  const profileStore = useProfileStore();
  const authStore = useAuthStore();
  const name = ref("");
  const surname1 = ref("");
  const surname2 = ref("");
  const email = ref(authStore.email);
  const role = ref("");
  const clases = ref("");
  const classCode = ref("");

  //inicializes when opening the profile
  onMounted(async ()=>{
    await profileStore.fetchProfile();

    name.value = profileStore.profile.name;
    surname1.value = profileStore.profile.surname1;
    surname2.value = profileStore.profile.surname2;

    //parse role
    if(authStore.role === "TEACHER"){
      role.value = "Profesor";
    }
    else if(authStore.role === "STUDENT"){
      role.value = "Estudiante";
    }
    else{
      role.value = "";
    }

    //get table classrooms
    try{
      const response = await getTableProfile();
      clases.value = response.rows.map(row => ({
        codigo: row.classCode,
        anio: row.nameYear,
        curso: row.nameCourse,
        grupo: row.nameGroup,
        asignatura: row.nameSubject,
        pagina: row.nameTable,
      }));
    }
    catch(error){
      console.log("Error al cargar la tabla: ", error);
    }
  });

  //observe and update variables
  watch([name, surname1, surname2], ([newName, newSurname1, newSurname2]) => {
    profileStore.profile.name = newName;
    profileStore.profile.surname1 = newSurname1;
    profileStore.profile.surname2 = newSurname2;
  });

  //update profile with a async function to not block UI
  const updateProfile = async () => {
    if(name.value === "" || name.value === null || 
        surname1.value === "" || surname1.value === null ||
        surname2.value === "" || surname2.value === null){
      alert("Existe algún campo vacío.");
    }
    
    try {
      //update profile
      const success = await profileStore.updateProfile({
        name: name.value,
        surname1: surname1.value,
        surname2: surname2.value
      });

      if(success){
        alert("Perfil actualizado con éxito");
      }
    } catch (error) {
      alert("Hubo un error al actualizar el perfil: "+error.response.data.mensaje);
      console.error("Error al actualizar el perfil:", error.response.data.Error);
    }
  };

  //insert an code to add student into class
  const enrollClass = async () => {
    if(classCode.value.trim() === ""){
      console.log("Falta por insertar el código clase.");
      alert("Debe insertar un código clase.");
      return;
    }
    
    const response = await enrollClassroom(classCode.value); 
    try {
      const updatedResponse = await getTableProfile();
      clases.value = updatedResponse.rows.map(row => ({
        codigo: row.classCode,
        anio: row.nameYear,
        curso: row.nameCourse,
        grupo: row.nameGroup,
        asignatura: row.nameSubject,
        pagina: row.nameTable,
      }));
    } catch (error) {
      console.log("Error al recargar la tabla: ", error);
    }
  };
</script>

<template>
  <div class="container vh-100 d-flex align-items-center">
    <div class="row w-100">
      <div class="col-md-5">
        <div class="card p-4 shadow" style="background-color: #343a40;">
          <h3 class="text-center mb-3 text-white">Perfil del estudiante</h3>
          <form @submit.prevent="updateProfile">
            <div class="mb-3">
              <label for="name" class="form-label text-white">Nombre</label>
              <input v-model="name" type="text" class="form-control" id="name" placeholder="Nombre" />
            </div>
            <div class="mb-3">
              <label for="surname1" class="form-label text-white">Apellido 1</label>
              <input v-model="surname1" type="text" class="form-control" id="surname1" placeholder="Apellido 1" />
            </div>
            <div class="mb-3">
              <label for="surname2" class="form-label text-white">Apellido 2</label>
              <input v-model="surname2" type="text" class="form-control" id="surname2" placeholder="Apellido 2" />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label text-white">Email</label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="email" disabled />
            </div>
            <div class="mb-3">
              <label for="role" class="form-label text-white">Rol</label>
              <input v-model="role" type="text" class="form-control" id="role" placeholder="Rol del usuario" disabled />
            </div>
            <div class="mb-3">
              <label for="classCode" class="form-label text-white">Añadir código clase</label>
              <div class="addClass">
                <input v-model="classCode" type="text" class="form-control" id="classCode" placeholder="Código clase" />
                <button type="button" class="btn btn-secondary" @click="enrollClass">
                  Añadir clase
                </button>
              </div>
            </div>
            <button type="submit" class="btn btn-secondary w-100">
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card p-4 shadow">
          <h3 class="text-center mb-3">Perteneces a las clases:</h3>
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Año</th>
                <th>Curso</th>
                <th>Grupo</th>
                <th>Asignatura</th>
                <th>Página</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="clase in clases" :key="clase.codigo">
                <td>{{ clase.codigo }}</td>
                <td>{{ clase.anio }}</td>
                <td>{{ clase.curso }}</td>
                <td>{{ clase.grupo }}</td>
                <td>{{ clase.asignatura }}</td>
                <td>{{ clase.pagina }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  button[disabled] {
    cursor: not-allowed;
    opacity: 0.7;
  }

  .form-control {
    background-color: #495057;
    color: white;
    border-color: #6c757d;
  }

  .form-control:focus {
    background-color: #343a40;
    border-color: #007bff;
    color: white;
  }

  .btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
  }

  .btn-secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
  }

  .addClass{
    display: flex;
    gap: 20px;
  }

  .addClass input{
    flex-grow: 1;
  }

  .addClass button {
    width: auto;
    white-space: nowrap;
  }

  .card {
    background-color: #343a40; 
    color: white; 
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  }

  .table {
    background-color: #495057;
    color: white;
    border-color: #6c757d;
  }

  .table thead {
    background-color: #6c757d;
  }

  .table tbody tr {
    border-color: #6c757d;
  }

  .table tbody tr:hover {
    background-color: #5a6268;
  }

  .table th, .table td {
    border-color: #6c757d;
    text-align: center;
  }
</style>
