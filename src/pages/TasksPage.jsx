import React from 'react';
import Tasks from '../components/Tasks/Tasks';

const TasksPage = () => {
  return (
    <div className="tasks-page">
      <h1>Tareas</h1>
      {/* Aquí puedes agregar un formulario para crear o editar tareas */}
      <Tasks />
    </div>
  );
};

export default TasksPage;