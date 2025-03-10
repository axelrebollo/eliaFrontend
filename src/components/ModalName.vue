<script setup>
    import { ref } from "vue";

    const emit = defineEmits(['close', 'submit']);
    const yearName = ref("");
    const isVisible = ref(false);

    const openModal = () => {
        isVisible.value = true;
    }

    const closeModal = () => {
        isVisible.value = false;
        yearName.value = "";
        emit('close');
    }

    const submit = () => {
        if (yearName.value.trim() !== "") {
            emit('submit', yearName.value);
            closeModal();
        } else {
            alert("Por favor, ingresa un nombre para el año.");
        }
    }

    //Expose modal control methods to parent
    defineExpose({
        openModal,
        closeModal,
    });
</script>

<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <h3>Ingresar Nombre del Año</h3>
            <input v-model="yearName" type="text" placeholder="Nombre del Año" />
            <div class="modal-buttons">
                <button @click="submit">Agregar Año</button>
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
        background-color: rgba(0, 0, 0, 0.75); /* Darker background */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .modal-content {
        background-color: #343a40; /* Dark background for modal */
        padding: 20px;
        border-radius: 8px;
        width: 300px;
        text-align: center;
        color: white; /* Text color for dark theme */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal-content h3 {
        font-size: 1.2em;
        margin-bottom: 15px;
    }

    .modal-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
    }

    .modal-buttons button {
        padding: 10px;
        background-color: #007bff; /* Bootstrap primary button color */
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease;
    }

    .modal-buttons button:hover {
        background-color: #0056b3; /* Darker shade for hover */
    }

    input {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        background-color: #495057; /* Dark input background */
        border: 1px solid #6c757d; /* Input border color */
        border-radius: 5px;
        color: white; /* Text color inside input */
    }

    input::placeholder {
        color: #adb5bd; /* Light gray placeholder text */
    }

    input:focus {
        background-color: #343a40; /* Focused input color */
        border-color: #007bff; /* Border color on focus */
        outline: none;
    }
</style>
