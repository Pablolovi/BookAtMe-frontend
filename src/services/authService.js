import api from './api.js';

// Función para actualizar los datos del perfil del usuario
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/users/profile', userData);  // La ruta puede cambiar según tu API
    return response.data;  // Devuelve los datos actualizados del perfil
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    throw error;  // Lanza el error para que pueda ser manejado por el componente
  }
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const getProfile = async () => {
    try {
      const response = await api.get('/users/profile');  // Llamada a la API para obtener los datos del perfil del usuario
      return response.data;  // Retorna los datos del perfil
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      throw error;  // Lanzamos el error para que pueda ser manejado en el contexto
    }
  };