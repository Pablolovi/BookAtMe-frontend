import React, { useState, useEffect } from 'react';
import { searchForExternalBooks } from '../../services/bookService';
import { useFetcher } from 'react-router';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchBooks = async () => {
        if (query) {
          setLoading(true);
          const data = await searchForExternalBooks(query);  // Llamada a la API para obtener libros externos
          setBooks(data);
          setLoading(false);
        }
      };
  
      fetchBooks();
    }, [query]);
  
    return (
      <div className={Styles.container}>
        <h1>Libros</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar libros..."
        />
        {loading && <p className={Styles.loading}>Cargando...</p>}
  
        {/* Mostrar resultados de búsqueda */}
        <div>
          {books.length > 0 ? (
            <ul className={styles.bookList}>
              {books.map((book) => (
                <li key={book.isbn} className={styles.bookItem}>
                  <img src={book.cover} alt={book.title} />
                  <div className={styles.bookInfo}>
                    <h3>{book.title}</h3>
                    <p>Autor: {book.author}</p>
                    <p>Año: {book.year}</p>
                    <p>Géneros: {book.subjects.join(', ')}</p>
                    <button className={styles.button} onClick={() => handleSaveBook(book)}>Guardar</button>
                  </div>
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