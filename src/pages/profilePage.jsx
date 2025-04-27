import React from 'react';
import Profile from '../components/Profile/Profile';  // Asegúrate de que la ruta sea correcta
import MyBooks from '../components/MyBooks/MyBooks';

const profilePage = () => {
  return (
    <div>
      <Profile />  {/* Aquí incluimos el componente Profile */}
      <MyBooks />  {/* Aquí incluimos el componente MyBooks */}
    </div>
  );
};

export default profilePage;
