import React from 'react';

const authors = [
  {
    name: "J.K. Rowling",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg",
    description: "Autora de la saga de Harry Potter, una historia mágica que marcó generaciones.",
    saga: "Harry Potter",
    books: [
      "https://covers.openlibrary.org/b/id/7984916-M.jpg",
      "https://covers.openlibrary.org/b/id/8231991-M.jpg",
      "https://covers.openlibrary.org/b/id/7984914-M.jpg",
      "https://covers.openlibrary.org/b/id/7984912-M.jpg"
    ]
  },
  {
    name: "George R.R. Martin",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/George_R._R._Martin_by_Gage_Skidmore_2.jpg",
    description: "Creador del universo de Canción de Hielo y Fuego, conocido por su intriga y profundidad.",
    saga: "Juego de Tronos",
    books: [
      "https://covers.openlibrary.org/b/id/8306661-M.jpg",
      "https://covers.openlibrary.org/b/id/8311832-M.jpg",
      "https://covers.openlibrary.org/b/id/8306659-M.jpg",
      "https://covers.openlibrary.org/b/id/8306658-M.jpg"
    ]
  }
];

const PopularAuthors = () => {
  return (
    <section className="popular-authors">
      <h2>Autores Populares</h2>
      <div className="authors-container">
        {authors.map((author, idx) => (
          <div className="author-card" key={idx}>
            <img src={author.image} alt={author.name} className="author-photo" />
            <h3>{author.name}</h3>
            <p>{author.description}</p>
            <strong>Saga destacada: {author.saga}</strong>
            <div className="book-covers">
              {author.books.map((cover, i) => (
                <img src={cover} alt={`Libro ${i + 1}`} key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularAuthors;
