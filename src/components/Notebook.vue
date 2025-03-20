<script setup>
  import { useNotebookStore } from '@/stores/notebookStore';
  import { watch } from 'vue';

  const store = useNotebookStore();

  //is executed always that change selectedTable
  //the selectedGroup not change if not select table is for this that is not monitorized
  watch(() => store.selectedTable, (newVal) => {
      if (newVal) {

      //console.log("Datos recibidos en Notebook:", store.selectedGroup, newVal);
      //alert(`Cargando tabla ${newVal} para el grupo ${store.selectedGroup}`);
      }
  });
</script>

<template>
  <div class="notebook-container">
    <div class="table-container">
      <h3 class="table-subtitle">Código de la materia: {{ tableCode }}</h3>
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
    background-color: #343a40;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 600px;
  }

  .table {
    width: 100%;
    text-align: center;
  }
</style>
