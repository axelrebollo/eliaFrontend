<script setup>
  const getData = () => {

  };

  const addClass = () => {

  };

  const saveData = () => {

  };
</script>

<template>
  <div class="container vh-100 d-flex align-items-center">
    <div class="row w-100">
      <div class="col-md-5">
        <div class="card p-4 shadow" style="background-color: #343a40;">
          <h3 class="text-center mb-3 text-white">Perfil del estudiante</h3>
          <form @submit.prevent="guardarDatos">
            <div class="mb-3">
              <label for="nombre" class="form-label text-white">Nombre</label>
              <input v-model="nombre" type="text" class="form-control" id="nombre" placeholder="Juan" />
            </div>
            <div class="mb-3">
              <label for="apellidos" class="form-label text-white">Apellidos</label>
              <input v-model="apellidos" type="text" class="form-control" id="apellidos" placeholder="Pérez" />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label text-white">Email</label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="juanperez@email.com" disabled />
            </div>
            <div class="mb-3">
              <label for="role" class="form-label text-white">Rol</label>
              <input v-model="role" type="text" class="form-control" id="role" placeholder="Profesor" disabled />
            </div>
            <div class="mb-3">
              <label for="classCode" class="form-label text-white">Añadir código clase</label>
              <div class="addClass">
                <input v-model="classCode" type="text" class="form-control" id="classCode" placeholder="abcd1234" />
                <button type="button" class="btn btn-secondary" @click="addClass">
                  Añadir clase
                </button>
              </div>
            </div>

            <button type="submit" class="btn btn-secondary w-100">
              Guardar
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
              </tr>
            </thead>
            <tbody>
              <tr v-for="clase in clases" :key="clase.codigo">
                <td>{{ clase.codigo }}</td>
                <td>{{ clase.anio }}</td>
                <td>{{ clase.curso }}</td>
                <td>{{ clase.grupo }}</td>
                <td>{{ clase.asignatura }}</td>
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
