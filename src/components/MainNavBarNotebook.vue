<script setup>
  import { ref, onMounted, nextTick } from "vue";
  import { getYears, addYear, deleteYear, updateNameYear } from "@/services/yearService.js";
  import { getSubjects, addSubject, deleteSubject, updateNameSubject } from "@/services/subjectService.js";
  import { getCourses, addCourse, deleteCourse } from "@/services/courseService.js";
  import { getGroups, addGroup, deleteGroup } from "@/services/groupService.js";
  import { getTables, addTable, deleteTable } from "@/services/tableService.js";
  import Modal from "@/components/ModalName.vue";
  import { useNotebookStore } from '@/stores/notebookStore';

  //variables (reactive)
  const subjects = ref([]);
  const years = ref([]);
  const courses = ref([]);
  const groups = ref([]);
  const tables = ref([]);
  
  //selections in dropdowns
  const selectedYear = ref(null);
  const selectedCourse = ref(null);
  const selectedSubject = ref(null);
  const selectedGroup = ref(null);
  const selectedTable = ref(null);

  //modal variables
  const modalRef = ref(null);
  const modalConfig = ref({});

  //stores
  const store = useNotebookStore();
  
  //LOAD DROPDOWNS AREA

  //load dropdown years
  const getYearsForDropdown = async () => {
    years.value = await getYears();
  }

  //load dropdown subjects
  const getSubjectsForDropdown = async () => {
    subjects.value = await getSubjects();
  }

  //load courses dropdown when select year
  const getCoursesForDropdown = async () => {
    if(!selectedYear.value){
      courses.value = []; //clean courses if year not selected
      groups.value = [];  //clear groups if year not selected
      tables.value = []; //clear table if year not selected
      return;
    }
    courses.value = await getCourses(selectedYear.value);
    selectedCourse.value = null; //clean course selected
    groups.value = [];  //clean groups
    tables.value = []; //clean table
  }

  //load groups dropdown when select subject, year, course
  const getGroupsForDropdown = async () => {
    if(!selectedCourse.value || !selectedSubject.value || !selectedYear.value){
      groups.value = [];  //clear groups if year not selected
      tables.value = []; //clear table if year not selected
      return;
    }
    groups.value = await getGroups(selectedCourse.value, selectedSubject.value, selectedYear.value);
    selectedGroup.value = null; //clean group selected
    tables.value = []; //clean table
  }

  //load tables dropdown when select subject, year, course, group
  const getTablesForDropdown = async () => {
    if(!selectedSubject.value || !selectedYear.value || !selectedCourse.value || !selectedGroup.value){
      tables.value = []; //clear table if year not selected
      return;
    }
    tables.value = await getTables(selectedSubject.value, selectedYear.value, selectedCourse.value, selectedGroup.value);
    selectedTable.value = null; //clean table
  }

  //load table component
  const loadTableComponent = () => {
    if (!selectedGroup.value || !selectedTable.value) {
      //if table is deleted, clean table for view
      store.loadTable(null,null,null,null,null);
      return;
    }
    if(selectedSubject.value && selectedYear.value && selectedCourse.value && selectedGroup.value && selectedTable.value){
      store.loadTable(selectedSubject.value, selectedYear.value, selectedCourse.value, selectedGroup.value, selectedTable.value);
    }
  }

  //load dropdowns when open component
  onMounted(async () => {
    await getYearsForDropdown();
    await getSubjectsForDropdown();
  });

  //DYNAMIC MODAL AREA

  //open dynamic modal
  const openModal = (type) => {
    
    //ADD MODALS
    
    //type add year
    if (type === "year") {
      modalConfig.value = {
        title: "Ingresar Nombre del Año",
        placeholder: "Nombre del Año",
        buttonText: "Agregar Año",
        submitHandler: handleAddYear
      };
    } 
    //type add subject
    else if (type === "subject") {
      modalConfig.value = {
        title: "Ingresar Nombre de la Asignatura",
        placeholder: "Nombre de la Asignatura",
        buttonText: "Agregar Asignatura",
        submitHandler: handleAddSubject
      };
    } 
    //type add curso
    else if (type === "course") {
      modalConfig.value = {
        title: "Ingresar Nombre del Curso",
        placeholder: "Nombre del Curso",
        buttonText: "Agregar Curso",
        submitHandler: handleAddCourse
      };
    }
    //type add grupo
    else if (type === "group") {
      modalConfig.value = {
        title: "Ingresar Nombre del Grupo",
        placeholder: "Nombre del Grupo",
        buttonText: "Agregar Grupo",
        submitHandler: handleAddGroup
      };
    } 
    //type add table
    else if (type === "table") {
      modalConfig.value = {
        title: "Ingresar Nombre de la página(tabla)",
        placeholder: "Nombre de la página",
        buttonText: "Agregar página",
        submitHandler: handleAddTable
      };
    } 

    //UPDATE MODALS

    //type update name year
    if (type === "updateNameYear") {
      modalConfig.value = {
        title: "Ingresar el nuevo nombre del Año",
        placeholder: "Nombre del Año",
        buttonText: "Actualizar Año",
        submitHandler: handleUpdateNameYear
      };
    } 
    //type update name subject
    else if (type === "updateNameSubject") {
      modalConfig.value = {
        title: "Ingresar el nuevo nombre de la Asignatura",
        placeholder: "Nombre de la Asignatura",
        buttonText: "Actualizar Asignatura",
        submitHandler: handleUpdateNameSubject
      };
    } 
    //type update name course
    else if (type === "updateNameCourse") {
      modalConfig.value = {
        title: "Ingresar el nuevo nombre del Curso",
        placeholder: "Nombre del Curso",
        buttonText: "Actualizar Curso",
        submitHandler: handleUpdateNameCourse
      };
    }
    //type update name group
    else if (type === "updateNameGroup") {
      modalConfig.value = {
        title: "Ingresar el nuevo nombre del Grupo",
        placeholder: "Nombre del Grupo",
        buttonText: "Actualizar Grupo",
        submitHandler: handleUpdateNameGroup
      };
    } 
    //type update name table
    else if (type === "updateNameTable") {
      modalConfig.value = {
        title: "Ingresar el nuevo nombre de la página(tabla)",
        placeholder: "Nombre de la página",
        buttonText: "Actualizar página",
        submitHandler: handleUpdateNameTable
      };
    } 
    modalRef.value.openModal();
  };

  //ADD SECTION
  
  //add year
  const handleAddYear = async (yearName) => {
    if (yearName.trim() !== "") {
      //add year
      const response = await addYear(yearName);
      if (response) {
        //reload dropdown
        await getYearsForDropdown();
      }
    }
  }
  
  //add subject
  const handleAddSubject = async (subjectName) => {
    if (subjectName.trim() !== "") {
      //add year
      const response = await addSubject(subjectName);
      if (response) {
        //reload dropdown
        await getSubjectsForDropdown();
      }
    }
  }

  //add course
  const handleAddCourse = async (courseName) => {
    if (!selectedYear.value) {
      console.error("No se ha seleccionado un año.");
      alert("Debe seleccionar un año existente.");
      return;
    }
    
    if (courseName.trim() !== "") {
      //add course
      const response = await addCourse(courseName, selectedSubject.value, selectedYear.value);
      if (response) {
        //reload dropdown
        await getCoursesForDropdown();
      }
    }
  }

  //add group
  const handleAddGroup = async (groupName) => {
    if(!selectedYear.value || !selectedCourse.value || !selectedSubject.value){
      console.log("Falta por seleccionar algún parametro.(año, curso)");
      alert("Debe seleccionar un año y un curso.");
      return;
    }

    if (groupName.trim() !== "") {
      //add group
      const response = await addGroup(selectedCourse.value, selectedSubject.value, selectedYear.value, groupName);
      if (response) {
        //reload dropdown
        await getGroupsForDropdown();
      }
    }
  }

  //add table
  const handleAddTable = async (tableName) => {
    if(!selectedYear.value || !selectedCourse.value || !selectedSubject.value || !selectedGroup.value){
      console.log("Falta por seleccionar algún parametro.(año, curso, grupo, asignatura)");
      alert("Debe seleccionar una asignatura, año, curso, grupo.");
      return;
    }

    if (tableName.trim() !== "") {
      //add table
      const response = await addTable(selectedSubject.value, selectedYear.value, selectedCourse.value, selectedGroup.value, tableName);
      if (response) {
        //reload dropdown
        await getTablesForDropdown();
      }
    }
  }

  //DELETES SECTION

  //delete table
  const handleDeleteTable = async () => {
    if(store.classCode === ''){
      return;
    }

    //alert to confirm
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar la tabla y todos sus elementos?");
    if (!confirmDelete) {
      return;
    }

    const response = await deleteTable(store.classCode);
    if(response){
      //reload dropdown
      await getTablesForDropdown();
      //clean table
      loadTableComponent();
    }
  }

  //delete group
  const handleDeleteGroup = async () => {
    if(selectedCourse.value === '' || selectedSubject.value === '' || selectedYear.value === '' || selectedGroup.value === ''){
      return;
    }
    
    //alert to confirm
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar el grupo y todos sus elementos?");
    if (!confirmDelete) {
      return;
    }

    const response = await deleteGroup(selectedCourse.value, selectedSubject.value, selectedYear.value, selectedGroup.value);
    if(response){
      //reload dropdown
      await getGroupsForDropdown();
      await getTablesForDropdown();
      //clean table
      loadTableComponent();
    }
  }

  //delete course
  const handleDeleteCourse = async () => {
    if(selectedCourse.value === '' || selectedYear.value === ''){
      return;
    }

    //alert to confirm
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar el curso y todos sus elementos?");
    if (!confirmDelete) {
      return;
    }

    const response = await deleteCourse(selectedCourse.value, selectedYear.value);
    if(response){
      selectedCourse.value = null;
      selectedGroup.value = null;
      selectedTable.value = null;
      await nextTick(); //wait to update values after to execute function
      //reload dropdown
      await getCoursesForDropdown();
      await getGroupsForDropdown();
      await getTablesForDropdown();
      //clean table
      loadTableComponent();
    }
  }

  //delete year
  const handleDeleteYear = async () => {
    if(selectedYear.value === ''){
      return;
    }

    //alert to confirm
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar el año y todos sus elementos?");
    if (!confirmDelete) {
      return;
    }

    const response = await deleteYear(selectedYear.value);
    if(response){
      selectedYear.value = null;
      selectedCourse.value = null;
      selectedGroup.value = null;
      selectedTable.value = null;
      await nextTick(); //wait to update values after to execute function
      //reload dropdown
      await getYearsForDropdown();
      await getCoursesForDropdown();
      await getGroupsForDropdown();
      await getTablesForDropdown();
      //clean table
      loadTableComponent();
    }
  }

  //delete subject
  const handleDeleteSubject = async () => {
    if(selectedYear.value === ''){
      return;
    }

    //alert to confirm
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar la asignatura y todos sus elementos?");
    if (!confirmDelete) {
      return;
    }

    const response = await deleteSubject(selectedSubject.value);
    if(response){
      selectedSubject.value = null;
      selectedGroup.value = null;
      selectedTable.value = null;
      await nextTick(); //wait to update values after to execute function
      //reload dropdown
      await getSubjectsForDropdown();
      await getGroupsForDropdown();
      await getTablesForDropdown();
      //clean table
      loadTableComponent();
    }
  }

  //UPDATE SECCION AREA
  
  const handleUpdateNameYear = async (yearName) => {
    if(yearName === '' || selectedYear.value === ''){
      console.log("Falta por seleccionar algún parametro.");
      alert("Debe seleccionar un año o insertar un nuevo nombre.");
      return;
    }

    yearName = yearName.trim();

    if (yearName !== "") {
      //update name year
      const response = await updateNameYear(selectedYear.value, yearName);
      if (response) {
        //reload dropdown
        await getYearsForDropdown();
      }
    }
  }

  const handleUpdateNameSubject = async (subjectName) => {
    if(subjectName === '' || selectedSubject.value === ''){
      console.log("Falta por seleccionar algún parametro.");
      alert("Debe seleccionar una asignatura o insertar un nuevo nombre.");
      return;
    }

    subjectName = subjectName.trim();

    if (subjectName !== "") {
      //update name subject
      const response = await updateNameSubject(selectedSubject.value, subjectName);
      if (response) {
        //reload dropdown
        await getSubjectsForDropdown();
      }
    }
  }

  const handleUpdateNameCourse = async (courseName) => {
    if (courseName.trim() !== "") {
      console.log("ACTUALIZANDO ...CURSO: "+courseName);
      console.log("El curso seleccionado es: "+ selectedCourse.value);
      console.log("El año seleccionado es: "+ selectedYear.value);
    }
  }

  const handleUpdateNameGroup = async (groupName) => {
    if (groupName.trim() !== "") {
      console.log("ACTUALIZANDO ...GRUPO: "+groupName);
      console.log("El grupo seleccionado es: "+ selectedGroup.value);
      console.log("El curso seleccionado es: "+ selectedCourse.value);
      console.log("El año seleccionado es: "+ selectedYear.value);
      console.log("La asignatura seleccionada es: "+ selectedSubject.value);
    }
  }

  const handleUpdateNameTable = async (tableName) => {
    if (tableName.trim() !== "") {
      console.log("ACTUALIZANDO ...TABLA: "+tableName);
      console.log("La tabla seleccionada es: "+ selectedTable.value);
      console.log("El grupo seleccionado es: "+ selectedGroup.value);
      console.log("El curso seleccionado es: "+ selectedCourse.value);
      console.log("El año seleccionado es: "+ selectedYear.value);
      console.log("La asignatura seleccionada es: "+ selectedSubject.value);
    }
  }
</script>

<template>
  <div class="navbar-container">
    <div class="dropdowns-container">
      <!--dorpdown subject-->
      <div class="dropdown">
        <label for="dropdown4" class="text-white">Asignatura</label>
        <div class="dropdownRow">
          <select id="dropdown4" class="form-control" v-model="selectedSubject" @change="getGroupsForDropdown">
            <option v-for="subject in subjects" :key="subject">{{ subject }}</option>
          </select>
          <button class="btn btn-primary" @click="openModal('updateNameSubject')">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-success" @click="openModal('subject')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="handleDeleteSubject">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <!--dorpdown year-->
      <div class="dropdown">
        <label for="dropdownYear" class="text-white">Año</label>
        <div class="dropdownRow">
          <!--if year selected then load courses-->
          <select id="dropdownYear" class="form-control" v-model="selectedYear" @change="getCoursesForDropdown">
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
          <button class="btn btn-primary" @click="openModal('updateNameYear')">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-success" @click="openModal('year')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="handleDeleteYear">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <!--dorpdown course-->
      <div class="dropdown">
        <label for="dropdownCourse" class="text-white">Curso</label>
        <div class="dropdownRow">
          <!--if course selected then load groups-->
          <select id="dropdownCourse" class="form-control" v-model="selectedCourse" @change="getGroupsForDropdown">
            <option v-for="course in courses" :key="course">{{ course }}</option>
          </select>
          <button class="btn btn-primary" @click="openModal('updateNameCourse')">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-success" @click="openModal('course')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="handleDeleteCourse">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <!--dorpdown group-->
      <div class="dropdown">
        <label for="dropdownGroup" class="text-white">Grupo</label>
        <div class="dropdownRow">
          <select id="dropdownGroup" class="form-control" v-model="selectedGroup" @change="getTablesForDropdown">
            <option v-for="group in groups" :key="group">{{ group }}</option>
          </select>
          <button class="btn btn-primary" @click="openModal('updateNameGroup')">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-success" @click="openModal('group')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="handleDeleteGroup">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <!--dropdown table-->
      <div class="dropdown">
        <label for="dropdownTable" class="text-white">Página</label>
        <div class="dropdownRow">
          <select id="dropdownTable" class="form-control" v-model="selectedTable" @change="loadTableComponent">
            <option v-for="table in tables" :key="table">{{ table }}</option>
          </select>
          <button class="btn btn-primary" @click="openModal('updateNameTable')">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-success" @click="openModal('table')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="handleDeleteTable">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div> 
    </div>
    <!--Dynamic modal to add something name-->
    <Modal
      ref="modalRef"
      :title="modalConfig.title"
      :placeholder="modalConfig.placeholder"
      :buttonText="modalConfig.buttonText"
      @submit="modalConfig.submitHandler"
      @close="() => {}"
    />
  </div>
</template>

<style scoped> 
  .navbar-container {
    align-items: center;
  }

  .dropdowns-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 300px;
  }

  .dropdown {
    display: flex;
    flex-direction: column;
  }

  .dropdownRow{
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    width: 100%;
  }

  .form-control {
    background-color: #495057;
    color: white;
    border-color: #6c757d;
    width: 100%;
    max-width: 300px;
    min-width: 250px; /*min with for dropdowns fixed*/
  }
</style>
