<script setup>
  import { ref } from "vue";

  const props = defineProps({
    //text 
    title: {
      type: String, 
      default: '',
    },
    //input
    placeholder: {
      type: String, 
      default: '',
    },
    //text button
    buttonText: {
      type: String, 
      default: 'Aceptar',
    },
    //columns from table
    extraFields: {
      type: Object,
      default: () => ({})
    },
  });

  const emit = defineEmits(["close", "submit"]);
  const inputValue = ref("");
  const isVisible = ref(false);
  const selectedOptions = ref([]);

  //open modal
  const openModal = () => {
    isVisible.value = true;
  };

  //close modal
  const closeModal = () => {
    isVisible.value = false;
    inputValue.value = "";
    selectedOptions.value = [];
    emit("close");
  };

  //set name o average task
  const submit = () => {
    const isAverageTask = props.extraFields && props.extraFields.columnsToAverage;

    if (isAverageTask) {
      if (inputValue.value.trim() === "") {
        alert(`Por favor, ingresa ${props.placeholder.toLowerCase()}.`);
        return;
      }
      const selectedIndexes = selectedOptions.value;
      if (selectedIndexes.length === 0) {
        alert("Por favor, selecciona al menos una columna.");
        return;
      }
      emit("submit", { newTaskName: inputValue.value, selectedColumnIndexes: selectedIndexes});
      closeModal();
    } 
    else {
      if (inputValue.value.trim() === "") {
        alert(`Por favor, ingresa ${props.placeholder.toLowerCase()}.`);
        return;
      }
      emit("submit", inputValue.value);
      closeModal();
    }
  };

  defineExpose({
    openModal,
    closeModal,
  });
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!--text dynamic-->
      <h3>{{ title }}</h3>
      <!--input dynamic-->
      <input v-model="inputValue" type="text" :placeholder="placeholder"/>
      <!--columns checkbox to mean arithmetic-->
      <div v-if="extraFields && extraFields.columnsToAverage">
        <label v-for="(column, index) in extraFields.columnsToAverage" :key="index">
          <input type="checkbox" :value="column.index" v-model="selectedOptions" />{{ column.name }}
        </label>
      </div>
      <div class="modal-buttons">
        <!--button add name dynamic-->
        <button @click="submit">{{ buttonText }}</button>
        <!--button cancel-->
        <button @click="closeModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    }

    .modal-content {
    background-color: #343a40;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    }

    .modal-buttons button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    }

    .modal-buttons button:hover {
    background-color: #0056b3;
    }

    input {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #495057;
    border: 1px solid #6c757d;
    border-radius: 5px;
    color: white;
    }

    input::placeholder {
    color: #adb5bd;
    }

    input:focus {
    background-color: #343a40;
    border-color: #007bff;
    outline: none;
    }
</style>
