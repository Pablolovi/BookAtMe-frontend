import React, { useState, useEffect } from 'react';
import {
  getUserBooks,
  addUserBook,
  updateUserBook,
  deleteUserBook,
  searchForExternalBooks
} from '../../services/bookService';
import './MyBooks.css';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    totalPages: '',
    status: 'pendiente',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await getUserBooks();
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        console.error("❌ Respuesta no válida de libros:", data);
        setBooks([]);
      }
    } catch (error) {
      console.error("❌ Error al cargar los libros:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      const results = await searchForExternalBooks(searchQuery);
      setSearchResults(results);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.totalPages || isNaN(formData.totalPages) || formData.totalPages <= 0) {
      alert('Por favor, ingrese un número de páginas válido.');
      return;
    }
  
    if (editingId) {
      await updateUserBook(editingId, formData);
    } else {
      await addUserBook(formData);
    }
    setFormData({ title: '', author_name: '', totalPages: '', status: 'pendiente' });
    setEditingId(null);
    loadBooks();
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author_name: book.author_name[0] || '',
      totalPages: book.totalPages,
      status: book.status,
    });
    setEditingId(book._id);
  };

  const handleDelete = async (id) => {
    await deleteUserBook(id);
    loadBooks();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveSearchBook = async (book) => {
    try {
      await addUserBook({
        title: book.title,
        author_name: book.author_name || 'Autor desconocido',
        totalPages: book.totalPages || 0,
        status: 'pendiente',
      });
      loadBooks();
    } catch (error) {
      console.error('❌ Error al guardar el libro:', error);
    }
  };

  if (loading) {
    return <div>Cargando libros...</div>;
  }

  return (
    <div>
      {/* Formulario para agregar o editar libros */}
      <form onSubmit={handleSubmit} className="form-container mb-6">
        <div className="form-group">
          <input
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            name="author_name"
            placeholder="Autor"
            value={formData.author_name}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            name="totalPages"
            type="number"
            placeholder="Páginas totales"
            value={formData.totalPages}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select-field"
          >
            <option value="pendiente">Pendiente</option>
            <option value="leyendo">Leyendo</option>
            <option value="terminado">Terminado</option>
            <option value="relectura">Relectura</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          {editingId ? 'Actualizar' : 'Agregar'}
        </button>
      </form>

      {/* Buscar libros */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar libros..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* Mostrar resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Resultados de búsqueda</h2>
          <ul>
            {searchResults.map((book, idx) => (
              <li key={idx} className="book-card">
                <h3>{book.title}</h3>
                <p>{book.author_name}</p>
                <button onClick={() => handleSaveSearchBook(book)} className="submit-button">
                  Guardar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mostrar lista de libros */}
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book._id} className="book-card">
              <div>
                <strong>{book.title}</strong> - {book.author_name[0]} ({book.status})
              </div>
              <div>
                <button
                  onClick={() => handleEdit(book)}
                  className="submit-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="submit-button"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No tienes libros en tu colección.</p>
        )}
      </ul>
    </div>
  );
};

export default MyBooks;
