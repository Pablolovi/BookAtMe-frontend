import React from 'react';

const recommendedBooks = [
  {
    title: "El Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasía",
    cover: "https://covers.openlibrary.org/b/id/8228699-M.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Distopía",
    cover: "https://covers.openlibrary.org/b/id/7222246-M.jpg",
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    genre: "Realismo Mágico",
    cover: "https://covers.openlibrary.org/b/id/8294579-M.jpg",
  },
  {
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    genre: "Fantasía",
    cover: "https://covers.openlibrary.org/b/id/7984916-M.jpg",
  },
];

const RecommendedBooks = () => {
  return (
    <section className="recommended-books">
      <h2>Libros recomendados por usuarios</h2>
      <div className="books-container">
        {recommendedBooks.map((book, idx) => (
          <div className="book-card" key={idx}>
            <img src={book.cover} alt={book.title} className="book-cover" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <span className="book-genre">{book.genre}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedBooks;
