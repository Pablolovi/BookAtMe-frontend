// services/bookService.js
import api from './api'; // Tu configuración de axios

// ✅ Función para obtener los libros del usuario
export const getUserBooks = async () => {
  try {
    const response = await api.get('/api/books');  // Ruta protegida
    console.log('📚 Libros del usuario:', response.data);

    // ✅ Verificamos que la respuesta sea un array
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("❌ La respuesta no es un array:", response.data);
      return [];  // Previene errores en el frontend
    }
  } catch (error) {
    console.error('❌ Error al obtener los libros del usuario:', error.response?.status || error.message);
    return [];  // ✅ Siempre devolvemos un array
  }
  
};

// ✅ Buscar libros externos (OpenLibrary)
export const searchForExternalBooks = async (query) => {
  try {
    const response = await api.get(`/api/books/search-external?query=${query}`);
    return response.data.map(book => ({
      title: book.title,
      author_name: book.author_name ? book.author_name[0] : 'Autor desconocido',
      year: book.first_publish_year || 'Año no disponible',
      cover: book.cover_url || 'https://via.placeholder.com/150',
      subjects: book.subjects || ['Sin categoría'],
      isbn: book.isbn || 'No disponible',
      totalPages: book.number_of_pages_median || 0,
    }));
  } catch (error) {
    console.error('❌ Error al buscar libros externos:', error);
    return [];  // ✅ Siempre devolvemos un array seguro
  }
};

// ✅ Función para agregar un libro al usuario
export const addUserBook = async (bookData) => {
  try {
    // ✅ Convertimos author_name a array si no lo es
    const payload = {
      ...bookData,
      author_name: Array.isArray(bookData.author_name)
        ? bookData.author_name
        : [bookData.author_name],
    };

    const response = await api.post('/api/books', payload);
    return response.data;
  } catch (error) {
    console.error('❌ Error al agregar el libro:', error);
    throw error;  // Permite que el componente lo maneje
  }
};

// ✅ (Opción redundante con addUserBook)
export const saveBook = async (bookData) => {
  try {
    const response = await api.post('/api/books', bookData);
    return response.data;
  } catch (error) {
    console.error('❌ Error al guardar el libro:', error);
    throw error;
  }
};

// ✅ Función para actualizar un libro
export const updateUserBook = async (id, bookData) => {
  try {
    // ✅ Aseguramos formato correcto al actualizar
    const payload = {
      ...bookData,
      author_name: Array.isArray(bookData.author_name)
        ? bookData.author_name
        : [bookData.author_name],
    };

    const response = await api.put(`/api/books/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('❌ Error al actualizar el libro:', error);
    throw error;
  }
};

// ✅ Función para eliminar un libro
export const deleteUserBook = async (id) => {
  try {
    await api.delete(`/api/books/${id}`);
  } catch (error) {
    console.error('❌ Error al eliminar el libro:', error);
    throw error;
  }
};
