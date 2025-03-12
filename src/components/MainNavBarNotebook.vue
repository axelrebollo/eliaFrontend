<script setup>
  import { ref, onMounted } from "vue";
  import { getYears, addYear } from "@/services/yearService.js";
  import { getSubjects, addSubject } from "@/services/subjectService.js";
  import Modal from "@/components/ModalName.vue";

  const years = ref([]);
  const subjects = ref([]);
  const modalRef = ref(null);
  const modalConfig = ref({});
  
  const getYearsForDropdown = async () => {
    years.value = await getYears();
  }

  const getSubjectsForDropdown = async () => {
    subjects.value = await getSubjects();
  }

  onMounted(getYearsForDropdown);
  onMounted(getSubjectsForDropdown);

  const openModal = (type) => {
    if (type === "year") {
      modalConfig.value = {
        title: "Ingresar Nombre del Año",
        placeholder: "Nombre del Año",
        buttonText: "Agregar Año",
        submitHandler: handleAddYear
      };
    } else if (type === "subject") {
      modalConfig.value = {
        title: "Ingresar Nombre de la Asignatura",
        placeholder: "Nombre de la Asignatura",
        buttonText: "Agregar Asignatura",
        submitHandler: handleAddSubject
      };
    }
    modalRef.value.openModal();
  };
  
  const handleAddYear = async (yearName) => {
    if (yearName.trim() !== "") {
      const response = await addYear(yearName);
      if (response) {
        years.value.push(response.nameYear);
      }
    }
  }
  
  const handleAddSubject = async (subjectName) => {
    if (subjectName.trim() !== "") {
      const response = await addSubject(subjectName);
      if (response) {
        years.value.push(response.nameSubject);
      }
    }
  }
</script>

<template>
  <div class="navbar-container">
    <div class="dropdowns-container">
      <div class="dropdown">
        <label for="dropdownYear" class="text-white">Año</label>
        <div class="dropdownRow">
          <select id="dropdownYear" class="form-control">
            <option v-for="year in years" :key="year">{{ year }}</option>
          </select>
          <button class="btn btn-success" @click="openModal('year')">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="deleteYear">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <div class="dropdown">
        <label for="dropdownCourse" class="text-white">Curso</label>
        <div class="dropdownRow">
          <select id="dropdownCourse" class="form-control">
            <option>1ro</option>
            <option>2o</option>
            <option>3ro</option>
            <option>4ro</option>
            <option>Bachillerato</option>
          </select>
          <button class="btn btn-success" @click="addCourse">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="deleteCourse">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <div class="dropdown">
        <label for="dropdownGroup" class="text-white">Grupo</label>
        <div class="dropdownRow">
          <select id="dropdownGroup" class="form-control">
            <option>A</option>
            <option>B</option>
            <option>-</option>
          </select>
          <button class="btn btn-success" @click="addGroup">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @click="deleteGroup">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <div class="dropdown">
        <label for="dropdown4" class="text-white">Asignatura</label>
        <div class="dropdownRow">
          <select id="dropdown4" class="form-control">
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
      <button class="btn btn-secondary w-100 mt-3" @click="loadTable">
        <i class="bi bi-cloud-upload">&nbsp</i>Cargar tabla
      </button>
      <button class="btn btn-success w-100 mt-3" @click="createTable">
        <i class="bi bi-plus">&nbsp</i>Crear tabla
      </button> 
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
    max-width: 200px;
  }

  .form-control:focus {
    background-color: #343a40;
    border-color: #007bff;
    color: white;
  }

  .btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    padding: 5px 10px;
    font-size: 14px;
    height: 36px;
  }

  .btn-secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
  }

  .text-white {
    color: white;
  }
</style>
