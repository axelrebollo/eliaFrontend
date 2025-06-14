<script setup>
  import { ref, watch } from 'vue';
  import { useNotebookStore } from '@/stores/notebookStore';
  import { getCellsForTable, addTask, updateNote, deleteTask, deleteStudent, updateNameTask, moveLeftColumn, moveRightColumn } from '@/services/cellService.js';
  import { getTableProfile } from "@/services/classroomProfileService.js";
  import Modal from "@/components/ModalName.vue";
  import { onMounted } from 'vue';

  //variables
  const store = useNotebookStore();  
  const headers = ref([]);
  const rawData = ref([]);
  const clases = ref("");
  const classCode = ref("");

  //modal variables
  const modalRef = ref(null);
  const modalConfig = ref({});
  
  //is executed always that exist some change in selectedTable
  watch(
    [() => store.selectedTable, () => store.selectedGroup],
  ([newSelectionTable, newGroup]) => {
      //if table not selected, clean table in view
      if (!newSelectionTable) {
      headers.value = [];
      rawData.value = [];
      classCode.value = "";
      return;
    }
    //load classCode
    loadClassCode(newSelectionTable, newGroup);
    //load table
    loadTableData(newSelectionTable);
    }
  );

  //save the table status if change component 
  onMounted(() => {
    if (store.selectedTable) {
      const prevTable = store.selectedTable;
      store.selectedTable = "";
      setTimeout(() => {
        store.selectedTable = prevTable;
      }, 10);
    }
  });

  async function loadClassCode(newSelectionTable, selectedGroup) {
    //get table classroom
    try{
      const response = await getTableProfile();
      clases.value = response.rows.map(row => ({
        codigo: row.classCode,
        pagina: row.nameTable,
        grupo: row.nameGroup,
      }));
      const filteredData = clases.value.filter(clase => clase.pagina === newSelectionTable && clase.grupo === selectedGroup);
      classCode.value = filteredData[0].codigo;
      store.setClassCode(classCode.value);
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
    selectedColumnName.value = headers.value[index];  //save the column selected
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

  //FUNCTIONALITIES FOR CONTEX MENU

  //reactive variables
  const selectedColumnName = ref(""); 

  //open dynamic modal
  const openModal = (type) => {
    //type add task to right another task
    if (type === "addTask") {
      modalConfig.value = {
        title: "Agregar tarea",
        placeholder: "Nombre de la tarea",
        buttonText: "Agregar Tarea",
        submitHandler: (nameNewTask) => handleAddTask(nameNewTask, selectedColumnName.value)
      };
    } 
    //type update name task
    else if (type === "updateNameTask") {
      const columnIndex = selectedColumn.value;   //is needed save actual status because is reactive variable and change value to null
      modalConfig.value = {
        title: "Cambiar el nombre de la tarea",
        placeholder: "Nuevo nombre de la tarea",
        buttonText: "Actualizar nombre",
        submitHandler: (newTaskName) => handleUpdateNameTask(newTaskName, columnIndex)
      };
    } 
    //create column average or aritmetic mean
    else if (type === "averageTask") {
      modalConfig.value = {
        title: "Crear tarea con media aritmética",
        placeholder: "Nombre de la nueva tarea",
        buttonText: "Isertar Media",
        extraFields: {
          columnsToAverage: headers.value.map((header, idx) => ({
              name: header,
              selected: false,
              index: idx
            })
          )
        },
        submitHandler: ({ newTaskName, selectedColumnIndexes }) => { 
          handleAverageTask(newTaskName, selectedColumnIndexes);
        }
      };
    }
    modalRef.value.openModal();
  };

  //add task right to reference task option
  const handleAddTask = async (nameNewTask, nameReferenceTask) => {
    if(nameNewTask === "" || classCode.value === "" ||
      store.selectedSubject === "" || store.selectedYear === "" || store.selectedCourse === "" ||
      store.selectedGroup === ""){
        alert("Error seleccionando los datos.");
        return;
    }
    
    const response = await addTask(
      classCode.value, nameNewTask, nameReferenceTask,
      store.selectedSubject, store.selectedYear, store.selectedCourse, store.selectedGroup
    );
    if(response){
      //reload table
      store.selectedTable = store.selectedTable;
      await loadTableData(store.selectedTable);
    }
  }
  
  //update name task selected option
  const handleUpdateNameTask = async (newTaskName, columnIndex) => {
    if(newTaskName === '' || columnIndex === null || columnIndex < 0){
      alert("Error seleccionando los datos");
      return;
    }
    
    const response = await updateNameTask(classCode.value, columnIndex+1, newTaskName);
    if(response){
      //reload table
      store.selectedTable = store.selectedTable;
      await loadTableData(store.selectedTable);
    }
  }

  //delete task option
  const handleDeleteTask = async () => {
    if(selectedColumn.value === null || classCode.value === ''){
      return;
    }

    //alert to confirm
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta tarea y todas las notas de la columna?");
    if (!confirmDelete) {
      return;
    }

    const response = await deleteTask(classCode.value, selectedColumn.value+1);
    if(response){
      //reload table
      store.selectedTable = store.selectedTable;
      await loadTableData(store.selectedTable);
    }
  }

  //delete to classroom student option
  const handleDeleteStudent = async () => {
    if(selectedStudent.value === null || classCode.value === ''){
      return;
    }
    const studentName = rawData.value[selectedStudent.value].name;

    //alert to confirm
    const confirmDelete = window.confirm("¿Estás seguro de que deseas quitar el estudiante del aula y eliminar todas las notas de la fila?");
    if (!confirmDelete) {
      return;
    }

    const response = await deleteStudent(classCode.value, studentName);
    if(response){
      //reload table
      store.selectedTable = store.selectedTable;
      await loadTableData(store.selectedTable);
    }
  }

  //move left task column option
  const handleMoveLeftTask = async () => {
    if(classCode.value === '' || selectedColumn.value+1 <= 0){
      return;
    }
    const columnIndex = selectedColumn.value+1;
    const response = await moveLeftColumn(classCode.value, columnIndex);
    if(response){
      //reload table
      store.selectedTable = store.selectedTable;
      await loadTableData(store.selectedTable);
    }
  }

  //move right task column option
  const handleMoveRightTask = async () => {
    if(classCode.value === '' || selectedColumn.value+1 <= 0){
      return;
    }
    const columnIndex = selectedColumn.value+1;
    const response = await moveRightColumn(classCode.value, columnIndex);
    if(response){
      //reload table
      store.selectedTable = store.selectedTable;
      await loadTableData(store.selectedTable);
    }
  }

  //add arithmetic mean task column option
  const handleAverageTask = async (newTaskName, selectedIndexes) => {
    if (!newTaskName || selectedIndexes.length === 0 || classCode.value === "") {
      alert("Debes introducir un nombre y seleccionar al menos una tarea.");
      return;
    }

    //insert task right to reference
    const referenceTaskName = headers.value[selectedColumn.value];  

    //add task column
    const addTaskResponse = await addTask(
      classCode.value, 
      newTaskName, 
      referenceTaskName, 
      store.selectedSubject, 
      store.selectedYear, 
      store.selectedCourse, 
      store.selectedGroup,
    );

    if (!addTaskResponse) {
      alert("Error al crear la tarea.");
      return;
    }

    //load table to wait creation new column task
    await loadTableData(store.selectedTable);

    //Calc and update to all rows
    for (const student of rawData.value) {
      const notes = selectedIndexes.map(idx => parseFloat(student.notes[idx])).filter(n => !isNaN(n));

      if (notes.length === 0) continue;

      const average = (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(2);

      await updateNote(
        classCode.value,
        student.name,
        newTaskName,
        average
      );
    }

    //refresh table
    await loadTableData(store.selectedTable);
  }

  //UPDATE NOTE
  
  const showMessage = ref(false);
  const originalNote = ref(""); //save initial note

  const handleUpdateNote = async (rowIndex, noteIndex, event) => {
    const newNote = event.target.innerText.trim();  //capture new note
    const currentNote = rawData.value[rowIndex].notes[noteIndex];  //actual note after edition

    if(newNote == currentNote || newNote === '') return;

    //get name student and task
    const nameStudent = rawData.value[rowIndex].name;
    const nameTask = headers.value[noteIndex];

    //check data
    if (!nameStudent || !nameTask) {
      console.error("Error: No se encontró el nombre del estudiante o la tarea.");
      return;
    }

    //check if new note is a float number
    const validNumberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;  //regex to check "number.number"
    if (!validNumberRegex.test(newNote)) {
      alert("Por favor, ingrese una nota válida.");
      console.error("Error: La nota ingresada no es un número válido.");
      event.target.innerText = currentNote;  //restore old note
      return;
    }

    try{
      const response = await updateNote(
        classCode.value,
        nameStudent,
        nameTask,
        newNote,
      );  
      if(response){
        //reload table
        store.selectedTable = store.selectedTable;
        await loadTableData(store.selectedTable);
        showMessage.value = true;
        setTimeout(() => { 
            showMessage.value = false; 
          }, 
          3000
        );
      }
    }
    catch(error){
      console.error("Error al actualizar la nota: ", error);
      alert("Hubo un error al actualizar la nota.");
    }
  };

  //focus into cell
  const handleFocus = (event) => {
    originalNote.value = event.target.innerText.trim(); //save original note
    event.target.innerText = ""; //delete cell when user click
  };


  const handleBlur = (event, rowIndex, noteIndex) => {
    const newNote = event.target.innerText.trim();
    if (newNote === "") {
      event.target.innerText = originalNote.value; //if not write, restore original note
    } else {
      rawData.value[rowIndex].notes[noteIndex] = newNote; //update note into cell
    }
  };
</script>

<template>
  <div class="notebook-container">
    <div v-if="showMessage" class="update-message">
      ¡Nota actualizada!
    </div>
    <div class="table-container">
      <h4 class="table-subtitle">Código de la clase: {{ classCode }}</h4>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Alumnos</th>
            <!--appear button + when exist table selected-->
            <button class="btn btn-success" @click="openModal('addTask')" v-if="headers.length === 0 && classCode != ''">
              <i class="bi bi-plus"></i>
            </button>
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
                  <li @click="openModal('addTask')"><i class="bi bi-plus"></i> Añadir tarea</li>
                  <li @click="openModal('averageTask')"><i class="bi bi-calculator"></i> Añadir media aritmética</li>
                  <li @click="openModal('updateNameTask')"><i class="bi bi-pencil"></i> Cambiar nombre</li>
                  <li @click="handleMoveLeftTask"><i class="bi bi-arrow-left"></i> Mover izquierda</li>
                  <li @click="handleMoveRightTask"><i class="bi bi-arrow-right"></i> Mover derecha</li>
                  <li @click="handleDeleteTask"><i class="bi bi-trash"></i>Eliminar</li>
                </ul>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!--generates dinamicly student row with name-->
          <tr v-for="(row, rowIndex) in rawData" :key="rowIndex">
            <!--insert name student and apear button + when exist one student-->
            <td v-if="row.name">
              {{ row.name }}
              <!--contextual menu STUDENT-->
              <button class="menu-button" @click="openStudentMenu($event, rowIndex)">
                <i class="bi bi-three-dots"></i>
              </button>
              <div v-if="showStudentMenu && selectedStudent === rowIndex" class="column-menu" 
                  :style="{ top: menuStudentY + 'px', left: menuStudentX + 'px' }">
                <ul>
                  <li @click="handleDeleteStudent"><i class="bi bi-trash"></i>Eliminar del aula</li>
                </ul>
              </div>
            </td>
            <!--insert notes from this student-->
            <td v-for="(note, noteIndex) in row.notes" 
                :key="noteIndex" 
                contenteditable="true"
                @focus="handleFocus($event)"
                @blur="handleBlur($event, rowIndex, noteIndex)"
                @keydown.enter.prevent="handleUpdateNote(rowIndex, noteIndex, $event)">
              {{ note !== -1 ? note : '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--Dynamic modal to add something name-->
    <Modal
      ref="modalRef"
      :title="modalConfig.title"
      :placeholder="modalConfig.placeholder"
      :buttonText="modalConfig.buttonText"
      :extraFields="modalConfig.extraFields"
      @submit="modalConfig.submitHandler"
      @close="() => {}"
    />
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
    overflow-x: auto;
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

  .update-message{
    color: rgb(143, 14, 14);
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
