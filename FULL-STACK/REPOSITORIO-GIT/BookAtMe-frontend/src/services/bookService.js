import api from './api'; // Tu configuración de axios

// Función para obtener los libros del usuario
export const getUserBooks = async () => {
  try {
    const response = await api.get('/api/books');  // Cambia la ruta si es necesario
    return response.data;
  } catch (error) {
    console.error('Error al obtener los libros del usuario:', error);
    throw error;
  }
};


// Buscar libros externos (ya lo tienes)
export const searchForExternalBooks = async (query) => {
  try {
    const response = await api.get(`/api/books/search-external?query=${query}`);
    return response.data.map(book => ({
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Autor desconocido',
      year: book.first_publish_year || 'Año no disponible',
      cover: book.cover_url || 'https://via.placeholder.com/150',
      subjects: book.subjects || ['Sin categoría'],
      isbn: book.isbn || 'No disponible',
      totalPages: book.number_of_pages_median || 0,
    }));
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    return [];
  }
};

// Función para agregar un libro al usuario
export const addUserBook = async (bookData) => {
  try {
    const response = await api.post('/api/books', bookData);  // Asumiendo que la ruta es /api/users/books
    return response.data;
  } catch (error) {
    console.error('Error al agregar el libro:', error);
    throw error;  // Lanzamos el error para manejarlo en el componente
  }
};

// Nueva función para guardar un libro
export const saveBook = async (bookData) => {
  try {
    const response = await api.post('/api/books', bookData);
    return response.data;
  } catch (error) {
    console.error('Error al guardar el libro:', error);
    throw error;
  }
};


// Función para actualizar un libro
export const updateUserBook = async (id, bookData) => {
  try {
    const response = await api.put(`/api/books/${id}`, bookData); // Ruta de actualización
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el libro:', error);
    throw error;
  }
};

// Función para eliminar un libro
export const deleteUserBook = async (id) => {
  try {
    await api.delete(`/api/books/${id}`);  // Ruta de eliminación
  } catch (error) {
    console.error('Error al eliminar el libro:', error);
    throw error;
  }
};
