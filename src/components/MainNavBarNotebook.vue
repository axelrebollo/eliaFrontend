<script setup>
  import { ref, onMounted } from "vue";
  import { getYears } from "@/services/yearService.js";

  const years = ref([]);
  const newYear = ref("");
  
  const loadTable = () => {

  }

  const createTable = () => {
    
  }

  const getYearsForDropdown = async () => {
    years.value = await getYears();
  }

  onMounted(getYearsForDropdown);

  const addNewYear = async () => {
    if (newYear.value.trim() !== "") {
      const response = await addYear(newYear.value);
      if (response) {
        years.value.push(response.nameYear);
        newYear.value = "";
      }
    } else {
      console.error("El nombre del año no puede estar vacío");
    }
  }

  const deleteYear = () => {

  }

  const addCourse = () => {

  }

  const deleteCourse = () => {

  }
  
  const addGroup = () => {

  }

  const deleteGroup = () => {

  }

  const addSubject = () => {

  }

  const deleteSubject = () => {

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
          <button class="btn btn-success" @click="addNewYear">
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
          <button class="btn btn-success" @Click="addCourse">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @Click="deleteCourse">
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
          <button class="btn btn-success" @Click="addGroup">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @Click="deleteGroup">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <div class="dropdown">
        <label for="dropdown4" class="text-white">Asignatura</label>
        <div class="dropdownRow">
          <select id="dropdown4" class="form-control">
            <option>Música</option>
            <option>Optativa: Gusto por la lectura</option>
            <option>Matemáticas</option>
          </select>
          <button class="btn btn-success" @Click="addSubject">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-danger" @Click="deleteSubject">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <button class="btn btn-secondary w-100 mt-3" @Click="loadTable">
        <i class="bi bi-cloud-upload">&nbsp</i>Cargar materia
      </button>
      <button class="btn btn-success w-100 mt-3" @Click="createTable">
        <i class="bi bi-plus">&nbsp</i>Crear matéria
      </button> 
    </div>
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
