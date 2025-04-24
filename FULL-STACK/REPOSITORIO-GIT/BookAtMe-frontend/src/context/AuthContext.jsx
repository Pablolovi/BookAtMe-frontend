import { createContext, useState, useEffect, useContext } from 'react';
import { getProfile } from '../services/authService';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userData = await getProfile();
      setUser(userData);
    } catch (error) {
      setUser(null); // No hay sesión activa
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión (logout)
  const logout = () => {
    setUser(null); // Limpiar el estado del usuario
    // Aquí podrías agregar lógica para limpiar el almacenamiento local (localStorage, sessionStorage)
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
