import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PopularAuthors from '../components/PopularAuthors/PopularAuthors';
import RecommendedBooks from '../components/RecommendedBooks/RecommendedBooks';

import { searchForExternalBooks } from '../services/bookService';

const Home = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para manejar la búsqueda
  const handleSearch = async (event) => {
    if (event.key === 'Enter' && query.trim()) {
      const results = await searchForExternalBooks(query);  // Llama al servicio de búsqueda
      setSearchResults(results);  // Actualiza el estado con los resultados
    }
  };

  // Función para manejar el click en los botones de hashtag
  const handleHashtagClick = async (category) => {
    try {
      setQuery(category);
      const results = await searchForExternalBooks(category);
      setSearchResults(results);
    } catch (error) {
      console.error('Error al buscar libros por categoría:', error);
    }
  };

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    setError('');
    try {
      const results = await searchForExternalBooks(searchQuery);
      if (results.length === 0) {
        setError('No se encontraron resultados para tu búsqueda.');
      }
      setSearchResults(results);
    } catch (err) {
      setError('Hubo un error al buscar los libros.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-body">
      <main className="home-main">
        {/* Hero Section */}
        <section className="hero">
          <h1>
            Bienvenido lector a <span className="highlight">BookAtMe</span>
          </h1>
          <p>Tu plataforma para gestionar tus libros y tareas.</p>

          <div className="search-section">
            <input
              type="text"
              placeholder="Prueba con un título, autor, género, ISBN, etc."
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}  // Llama a la función de búsqueda cuando presionan Enter
            />
          </div>

          <div className="hashtag-buttons">
            <button onClick={() => handleHashtagClick('Fantasía')}>#Fantasía</button>
            <button onClick={() => handleHashtagClick('Ciencia Ficción')}>#Ciencia Ficción</button>
            <button onClick={() => handleHashtagClick('Romance')}>#Romance</button>
            <button onClick={() => handleHashtagClick('Misterio')}>#Misterio</button>
            <button onClick={() => handleHashtagClick('Historia')}>#Historia</button>
          </div>
        </section>

        {/* Mostrar resultados de búsqueda */}
        <section className="search-results">
          {loading && <p>Cargando libros...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && searchResults.length > 0 && (
            <>
              <h2>Resultados de búsqueda</h2>
              <div className="results-container">
                {searchResults.map((book, idx) => (
                  <div className="book-card" key={idx}>
                    <img
                       src={book.cover ? book.cover : '/images/default-book-cover.jpg'}
                      alt={book.title}
                      className="book-cover"
                    />
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Autores Populares */}
        <PopularAuthors />

        {/* Libros recomendados */}
        <RecommendedBooks />
      </main>
    </div>
  );
};


export default Home;
