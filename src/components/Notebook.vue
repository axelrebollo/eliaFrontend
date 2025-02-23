<script setup></script>

<template>
  <div class="notebook-container">


    <!-- Tabla -->
    <div class="table-container">
      <h2 class="table-title">Música</h2>
      <h3 class="table-subtitle">Código de la materia: 3xnUL245</h3>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Alumnos</th>
            <th>
              <button class="btn btn-success btn-sm">
                <i class="bi bi-plus"></i>Task
              </button>
            </th>
          </tr>
          <tr>
            <th>
              <!--Button add students-->
              <button class="btn btn-success btn-sm">
                <i class="bi bi-plus"></i>Student
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <!--Rows add dinamic load-->
        </tbody>
      </table>
    </div>

    
  </div>
</template>

<style scoped>
.notebook-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.table-title {
  text-align: center;
  color: white;
}

.table-subtitle {
  text-align: center;
  color: lightgray;
}

.table-container {
  background-color: #343a40;  /* Fondo oscuro */
  border-radius: 15px;        /* Bordes redondeados */
  padding: 20px;              /* Espaciado alrededor de la tabla */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);  /* Sombra suave */
  width: 100%;
  max-width: 600px;
}

.table {
  width: 100%;
  text-align: center;
}

.add-btn {
  margin-top: 10px;
  font-size: 20px;
  padding: 5px 15px;
  background-color: #6c757d;
  border: none;
  color: white;
  border-radius: 50%;
}

.add-btn:hover {
  background-color: #5a6268;
}
</style>
