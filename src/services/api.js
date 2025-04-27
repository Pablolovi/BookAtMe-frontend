import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// Agregar el token al encabezado de cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Recuperamos el token del localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Incluir el token en el header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
