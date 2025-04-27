import { createContext, useState, useEffect, useContext } from 'react';
import { getProfile, login } from '../services/authService';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userData = await getProfile();  // Obtén el perfil del usuario usando el token
      setUser(userData);  // Almacena el perfil del usuario
    } catch (error) {
      setUser(null);  // No hay sesión activa si hay un error (sin token o token inválido)
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión (logout)
  const logout = () => {
    setUser(null);  // Limpiar el estado del usuario
    localStorage.removeItem('token');  // Eliminar el token de localStorage
  };

  useEffect(() => {
    fetchUser();  // Recupera el perfil del usuario cuando se monta el componente
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

