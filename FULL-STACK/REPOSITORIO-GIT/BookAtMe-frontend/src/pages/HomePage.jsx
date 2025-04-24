import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PopularAuthors from '../components/PopularAuthors';
import RecommendedBooks from '../components/RecommendedBooks';
import { searchForExternalBooks } from '../services/bookService';

const Home = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Función para manejar la búsqueda
  const handleSearch = async (event) => {
    if (event.key === 'Enter' && query.trim()) {
      const results = await searchForExternalBooks(query);  // Llama al servicio de búsqueda
      setSearchResults(results);  // Actualiza el estado con los resultados
    }
  };

  return (
    <div className="home-body">
      <Navbar />
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
            <button>#Fantasía</button>
            <button>#CienciaFicción</button>
            <button>#Romance</button>
            <button>#Misterio</button>
            <button>#Historia</button>
          </div>

          <Link to="/books" className="books-link">
            Ver Libros
          </Link>
        </section>

        {/* Mostrar resultados de búsqueda */}
        {searchResults.length > 0 && (
          <section className="search-results">
            <h2>Resultados de búsqueda</h2>
            <div className="results-container">
              {searchResults.map((book, idx) => (
                <div className="book-card" key={idx}>
                  <img src={book.cover} alt={book.title} className="book-cover" />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <span className="book-genre">{book.subjects.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Autores Populares */}
        <PopularAuthors />

        {/* Libros recomendados */}
        <RecommendedBooks />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
