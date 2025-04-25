import React from 'react';
import Profile from '../components/Profile';  // Asegúrate de que la ruta sea correcta

const profilePage = () => {
  return (
    <div>
      <h1>Mi Perfil</h1>
      <Profile />  {/* Aquí incluimos el componente Profile */}
    </div>
  );
};

export default profilePage;
