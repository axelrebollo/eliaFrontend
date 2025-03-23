<script setup>
  import { ref, watch } from 'vue';
  import { useNotebookStore } from '@/stores/notebookStore';
  import { getCellsForTable } from '@/services/cellService.js';

  //variables
  const store = useNotebookStore();  
  const headers = ref([]);
  const rawData = ref([]);
  
  //is executed always that change selectedTable
  watch(() => store.selectedTable, (newSelectionTable) => {
    if (newSelectionTable) {
      loadTableData(newSelectionTable);
    }
  });

  async function loadTableData(newSelectionTable) {
    try {
      //call service
      const cells = await getCellsForTable(
        store.selectedSubject,
        store.selectedYear,
        store.selectedCourse,
        store.selectedGroup,
        newSelectionTable,
      );

      //if in this table not exist data
      if (!cells.tableCells || cells.tableCells.length === 0) {
        headers.value = [];
        rawData.value = [{ }];
        return;
      }
    
      //build data table
      if (cells.tableCells.length > 0) {
        //extract headers that exist into first row with position row 0 and save nameTask
        headers.value = cells.tableCells
          .flatMap(row => row.rowNotebook)  //transform row array into individual cells list
          .filter(cell => cell.positionRow === 0) //if positionRow is 0, header task
          .sort((a, b) => a.positionCol - b.positionCol)  //order tasks for position column, use sort algorithm
          .map(cell => cell.name);  //extract task names (result is an array of strings)

        //extract students that exist into next rows
        const students = cells.tableCells
          .flatMap(row => row.rowNotebook)  //transform row array into individual cells list
          .filter(cell => cell.positionCol === 0 && cell.positionRow > 0) //if position column is 0 and position row is not 0, is student
          .sort((a, b) => a.positionRow - b.positionRow); //order students for position row, use sort algorithm

        //extract notes that exist into rows
        rawData.value = students.map(student => {
          const studentNotes = cells.tableCells
            .flatMap(row => row.rowNotebook)  //transform row array into individual cells list
            .filter(cell => cell.positionRow === student.positionRow && cell.name === "NOTE") //if position row is the same that student and name is NOTE, is note for student
            .sort((a, b) => a.positionCol - b.positionCol)  //order students for position column, use sort algorithm
            .map(cell => cell.note);  //extract note number (result is an array of student with notes)

          return { name: student.name, notes: studentNotes };
        });

        //clean table for new selection
        store.selectedTable = null;
      }
    } 
    catch (error) {
      console.error("Error al obtener las celdas:", error);
    }
  };
</script>

<template>
  <div class="notebook-container">
    <div class="table-container">
      <h3 class="table-subtitle">Código de la materia: {{ tableCode }}</h3>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Alumnos</th>
            <!--generates dinamicly headers columns-->
            <th v-for="(header, index) in headers" :key="index">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!--generates dinamicly student row with name-->
          <tr v-for="(row, rowIndex) in rawData" :key="rowIndex">
            <!--insert name student-->
            <td>
              {{ row.name }}
            </td>
            <!--insert notes from this student-->
            <td v-for="(note, noteIndex) in row.notes" :key="noteIndex">
              {{ note }}
            </td>
          </tr>
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
