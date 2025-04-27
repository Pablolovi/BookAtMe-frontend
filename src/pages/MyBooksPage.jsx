import React from 'react';
import MyBooks from '../components/MyBooks/MyBooks';

const MyBooksPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Libros</h1>
      <MyBooks />
    </div>
  );
};

export default MyBooksPage;
