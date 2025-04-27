import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateUserProfile } from '../../services/authService';
import './Profile.css';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    favoriteGenres: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  console.log(formData.favoriteGenres);
  // Cargar datos del usuario cuando se monta el componente
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        favoriteGenres: user.favoriteGenres || [''],
      });
    }
  }, [user]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Manejar el cambio de estado de edición
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Manejar el envío del formulario para actualizar los datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData); // Asegúrate de tener la función para actualizar el perfil
      setIsEditing(false);  // Deshabilitar la edición después de guardar
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  // Si el usuario no está autenticado, mostrar mensaje
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
    <div className="profile-container">
      <h1>Perfil de {user.name}</h1>
      <div className="profile-info">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Correo electrónico:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Biografía:
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </label>
            <label>
              Avatar (URL):
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
              />
            </label>
            <label>
              Géneros favoritos:
              <input
                type="text"
                name="favoriteGenres"
                value={formData.favoriteGenres.join(', ')}
                onChange={(e) => {
                  const genres = e.target.value.split(',').map(genre => genre.trim());
                  setFormData({ ...formData, favoriteGenres: genres });
                }}
              />
            </label>

            <button type="submit">Actualizar Perfil</button>
          </form>
        ) : (
          <div>
            <img
              src={user.avatar || 'https://via.placeholder.com/150'}
              alt="Avatar"
              className="profile-avatar"
            />
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo electrónico:</strong> {user.email}</p>
            <p><strong>Biografía:</strong> {user.bio}</p>
            <p><strong>Géneros favoritos:</strong> {user?.favoriteGenres?.join(', ') ||'Fantasy'}</p>
            <button onClick={toggleEdit}>Editar Perfil</button> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
