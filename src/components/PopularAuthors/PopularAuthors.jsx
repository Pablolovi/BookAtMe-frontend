import React, { useState } from 'react';
import './PopularAuthors.css';

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
    name: "Brandon Sanderson",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Brandon_Sanderson_at_River_Con_2016.jpg/800px-Brandon_Sanderson_at_River_Con_2016.jpg", // Imagen desde un CDN confiable
    description: "Autor de la serie 'El Archivo de las Tormentas', conocido por su creatividad en mundos fantásticos y sistemas de magia complejos.",
    saga: "El Archivo de las Tormentas",
    books: [
      "https://covers.openlibrary.org/b/id/8329251-M.jpg",
      "https://covers.openlibrary.org/b/id/8425247-M.jpg",
      "https://covers.openlibrary.org/b/id/8486421-M.jpg",
      "https://covers.openlibrary.org/b/id/8486422-M.jpg"
    ]
  }
];

const PopularAuthors = () => {
  return (
    <section className="popular-authors">
      <h2>Autores Populares</h2>
      <div className="authors-container">
        {authors.map((author, idx) => (
          <AuthorCard key={idx} author={author} />
        ))}
      </div>
    </section>
  );
};

const AuthorCard = ({ author }) => {
  // Estado para manejar el error de carga de la imagen
  const [imageError, setImageError] = useState(false);

  // Función que se llama cuando ocurre un error de carga en la imagen
  const handleImageError = () => {
    setImageError(true); // Cambia el estado para indicar que hubo un error
  };

  return (
    <div className="author-card">
      {/* Si hay error, se carga la imagen de reemplazo */}
      <img 
        src={imageError ? "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png" : author.image}  
        alt={author.name} 
        className="author-photo" 
        onError={handleImageError} 
      />
      <h3>{author.name}</h3>
      <p>{author.description}</p>
      <strong>Saga destacada: {author.saga}</strong>
      <div className="book-covers">
        {author.books.map((cover, i) => (
          <img src={cover} alt={`Libro ${i + 1}`} key={i} />
        ))}
      </div>
    </div>
  );
};

export default PopularAuthors;
