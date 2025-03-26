<script setup>
  import { ref, onMounted } from "vue";
  import { getYears, addYear } from "@/services/yearService.js";
  import { getSubjects, addSubject } from "@/services/subjectService.js";
  import { getCourses, addCourse } from "@/services/courseService.js";
  import { getGroups, addGroup } from "@/services/groupService.js";
  import { getTables, addTable } from "@/services/tableService.js";
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

  const store = useNotebookStore();

  const loadTableComponent = () => {
    if (!selectedGroup.value || !selectedTable.value) {
      alert("Debe seleccionar una tabla.");
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

  //open dynamic modal
  const openModal = (type) => {
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
    modalRef.value.openModal();
  };
  
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
          <button class="btn btn-success" @click="openModal('subject')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="deleteSubject">
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
          <button class="btn btn-success" @click="openModal('year')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="deleteYear">
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
          <button class="btn btn-success" @click="openModal('course')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="deleteCourse">
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
          <button class="btn btn-success" @click="openModal('group')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="deleteGroup">
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
          <button class="btn btn-success" @click="openModal('table')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="deleteTable">
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
