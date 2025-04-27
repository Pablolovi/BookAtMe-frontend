import api from './api.js';

// Función para hacer login
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  localStorage.setItem('token', response.data.token); 
  return response.data;
};

// Función para registrarse
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Función para obtener el perfil
export const getProfile = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token no encontrado');
  }

  const response = await api.get('/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Función para actualizar el perfil
export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token no encontrado');
  }

  const response = await api.put('/users/profile', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
