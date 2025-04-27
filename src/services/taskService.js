// src/services/taskService.js
import axios from 'axios';

const API_URL = 'api/tasks';

// Obtener todas las tareas
export const getUserTasks = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

// Crear una nueva tarea
export const addUserTask = async (taskData) => {
    const res = await axios.post(API_URL, taskData);
    return res.data;
}

// Actualizar una tarea
export const updateUserTask = async (Id, taskData) => {
    const res = await axios.put(`${API_URL}/${Id}`, taskData);
    return res.data;
}

// Eliminar una tarea
export const deleteUserTask = async (Id) => {
    const res = await axios.delete(`${API_URL}/${Id}`);
    return res.data;
}
