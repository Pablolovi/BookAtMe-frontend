import React from 'react';
import Profile from '../components/Profile';  // Asegúrate de que la ruta sea correcta
import MyBooks from '../components/MyBooks';

const profilePage = () => {
  return (
    <div>
      <h1>Mi Perfil</h1>
      <Profile />  {/* Aquí incluimos el componente Profile */}
      <MyBooks />  {/* Aquí incluimos el componente MyBooks */}
    </div>
  );
};

export default profilePage;
