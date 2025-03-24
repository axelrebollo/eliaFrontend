<script setup>
  import { ref, watch } from 'vue';
  import { useNotebookStore } from '@/stores/notebookStore';
  import { getCellsForTable } from '@/services/cellService.js';
  import { getTableProfile } from "@/services/classroomProfileService.js";

  //variables
  const store = useNotebookStore();  
  const headers = ref([]);
  const rawData = ref([]);
  const clases = ref("");
  const classCode = ref("");
  
  //is executed always that change selectedTable
  watch(() => store.selectedTable, (newSelectionTable) => {
    if (newSelectionTable) {
      //load classCode
      loadClassCode(newSelectionTable);
      //load table
      loadTableData(newSelectionTable);
    }
  });

  async function loadClassCode(newSelectionTable) {
    //get table classroom
    try{
      const response = await getTableProfile();
      clases.value = response.rows.map(row => ({
        codigo: row.classCode,
        pagina: row.nameTable,
      }));
      const filteredData = clases.value.filter(clase => clase.pagina === newSelectionTable);
      classCode.value = filteredData[0].codigo;
    }
    catch(error){
      console.log("Error al cargar la tabla: ", error);
    }
  };

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

  //CONTEXTUAL MENU SECTION

  //reactive contextual variables
  const showColumnMenu = ref(false);
  const menuColumnX = ref(0);
  const menuColumnY = ref(0);
  const selectedColumn = ref(null);  //index of selected column

  //open menu
  const openColumnMenu = (event, index) => {
    event.stopPropagation();  //prevent to propagate click to father in DOM
    showStudentMenu.value = false;  //desactivate student menu
    showColumnMenu.value = true;  //activate visivility for menu
    menuColumnX.value = event.pageX;  //save position x from click
    menuColumnY.value = event.pageY;  //save position y from click
    selectedColumn.value = index; //save selected column
  };

  //reactive contextual variables for contextual menu students
  const showStudentMenu = ref(false);
  const menuStudentX = ref(0);
  const menuStudentY = ref(0);
  const selectedStudent = ref(null);

  const openStudentMenu = (event, index) => {
    event.stopPropagation();
    showColumnMenu.value = false;
    showStudentMenu.value = true;
    menuStudentX.value = event.pageX;
    menuStudentY.value = event.pageY;
    selectedStudent.value = index;
  };

  //close menu
  const closeColumnMenu = () => {
    showColumnMenu.value = false;
    showStudentMenu.value = false;
    selectedColumn.value = null;
    selectedStudent.value = null;
  };

  //if user click out of menu area
  document.addEventListener('click', closeColumnMenu);

  function updateNameTask() {
    alert("Actualizando nombre de la tarea");
  }

  function moveLeftTask(){
    alert("Moviendo la tarea a la izquierda");
  }

  function moveRightTask(){
    alert("Moviendo la tarea a la izquierda");
  }

  
  function deleteTask(){
    alert("Eliminando la tarea");
  }

  function unenrollStudentClassroom(){
    alert("Quitando estudiante de la clase");
  }
</script>

<template>
  <div class="notebook-container">
    <div class="table-container">
      <h4 class="table-subtitle">Código de la clase: {{ classCode }}</h4>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Alumnos</th>
            <!--generates dinamicly headers columns-->
            <th v-for="(header, index) in headers" :key="index">
              {{ header }}
              <!--contextual menu TASKS-->
              <button class="menu-button" @click="openColumnMenu($event, index)">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
              <div v-if="showColumnMenu && selectedColumn === index" class="column-menu" 
                  :style="{ top: menuColumnY + 'px', left: menuColumnX + 'px' }">
                <ul>
                  <li @click="updateNameTask"><i class="bi bi-pencil"></i> Cambiar nombre</li>
                  <li @click="moveLeftTask"><i class="bi bi-arrow-left"></i> Mover izquierda</li>
                  <li @click="moveRightTask"><i class="bi bi-arrow-right"></i> Mover derecha</li>
                  <li @click="deleteTask"><i class="bi bi-trash"></i>Eliminar</li>
                </ul>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!--generates dinamicly student row with name-->
          <tr v-for="(row, rowIndex) in rawData" :key="rowIndex">
            <!--insert name student-->
            <td>
              {{ row.name }}
              <!--contextual menu STUDENT-->
              <button class="menu-button" @click="openStudentMenu($event, rowIndex)">
                <i class="bi bi-three-dots"></i>
              </button>
              <div v-if="showStudentMenu && selectedStudent === rowIndex" class="column-menu" 
                  :style="{ top: menuStudentY + 'px', left: menuStudentX + 'px' }">
                <ul>
                  <li @click="unenrollStudentClassroom"><i class="bi bi-trash"></i>Eliminar del aula</li>
                </ul>
              </div>
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

  .table-container {
    background-color: #343a40;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 600px;
  }

  .table-subtitle {
    text-align: center;
    color: lightgray;
  }

  .table {
    width: 100%;
    text-align: center;
  }

  /*CONTEXTUAL MENU*/
  .menu-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: white;
    transition: transform 0.2s ease;
  }

  .menu-button:hover {
    transform: scale(1.2);
    color: #f8f9fa;
  }

  .column-menu {
    position: absolute;
    background: #343a40;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    padding: 8px 0;
    min-width: 150px;
    z-index: 1050;
    animation: fadeIn 0.2s ease-in-out;
  }

  .column-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .column-menu li {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
  }

  .column-menu li:hover {
    background: #007bff;
    color: white;
  }

  /*Animation when apear menu*/
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
