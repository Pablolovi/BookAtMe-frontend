import React, { useState, useEffect } from 'react';
import { getUserTasks, addUserTask, updateUserTask, deleteUserTask } from '../../services/taskService';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false,
  });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getUserTasks();
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("❌ Respuesta no válida de tareas:", data);
        setTasks([]);
      }
    } catch (error) {
      console.error("❌ Error al cargar las tareas:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      alert('Por favor, ingresa un título para la tarea.');
      return;
    }

    if (formData._id) {
      await updateUserTask(formData._id, formData);
    } else {
      await addUserTask(formData);
    }

    setFormData({
      title: '',
      description: '',
      dueDate: '',
      completed: false,
    });
    loadTasks();
  };

  const handleEdit = (task) => {
    setFormData({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '',
    });
  };

  const handleDelete = async (id) => {
    await deleteUserTask(id);
    loadTasks();
  };

  const handleCheckboxChange = async (id, completed) => {
    await updateUserTask(id, { completed });
    loadTasks();
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // all
  });

  if (loading) {
    return <div>Cargando tareas...</div>;
  }

  return (
    <div className='tasks-container'>
      <div className="task-counter">
        ✅ {filteredTasks.filter(task => task.completed).length} completadas / 📋 {filteredTasks.length} en total
      </div>

      <div className='filter-select'>
        <select value={filter} onChange={handleFilterChange}>
          <option value={'all'}>Todas</option>
          <option value={'completed'}>Completadas</option>
          <option value={'pending'}>Pendientes</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className='task-form'>
        <div>
          <input
            name='title'
            placeholder='Título'
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <textarea
            name='description'
            placeholder='Descripción'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div>
          <input
            type='date'
            name='dueDate'
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
        <button type='submit'>
          {formData._id ? 'Actualizar' : 'Agregar'} Tarea
        </button>
      </form>

      {filteredTasks.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul className='task-list'>
          {filteredTasks.map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-info">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task._id, !task.completed)}
                />
                <strong>{task.title}</strong> - {task.completed ? 'Completada' : 'Pendiente'} - {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sin fecha'}
              </div>
              <div>
                <button onClick={() => handleEdit(task)} className="edit-btn">
                  Editar
                </button>
                <button onClick={() => handleDelete(task._id)} className="delete-btn">
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
