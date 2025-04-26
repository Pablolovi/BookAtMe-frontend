import React, { useState, useEffect } from 'react';
import { searchForExternalBooks, saveBook } from '../services/bookService';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      if (query) {
        setLoading(true);
        const data = await searchForExternalBooks(query);
        setBooks(data);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  const handleSaveBook = async (book) => {
    try {
      // Adaptar los campos al formato que tu backend espera
      await saveBook({
        title: book.title,
        author_name: book.author_name,
        totalPages: book.totalPages,
        status: 'pendiente', // Puedes hacer esto dinámico si lo deseas
      });
      setSuccessMessage(`"${book.title}" guardado en tu colección.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error al guardar el libro:', error);
    }
  };

  return (
    <div>
      <h1>Buscar Libros</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar libros..."
      />
      {loading && <p>Cargando...</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <div>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.isbn}>
                <img src={book.cover} alt={book.title} />
                <h3>{book.title}</h3>
                <p>Autor: {book.author_name}</p>
                <p>Año: {book.year}</p>
                <p>Géneros: {book.subjects.join(', ')}</p>
                <button onClick={() => handleSaveBook(book)}>Guardar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </div>
    </div>
  );
};

export default Books;
