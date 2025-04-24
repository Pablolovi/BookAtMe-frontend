import React, { useState, useEffect } from 'react';
import {
  getUserBooks,
  addUserBook,
  updateUserBook,
  deleteUserBook,
} from '../services/bookService';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    totalPages: '',
    status: 'pendiente',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await getUserBooks();
    setBooks(data);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      author_name: book.author_name,
      totalPages: book.totalPages,
      status: book.status,
    });
    setEditingId(book._id);
  };

  const handleDelete = async (id) => {
    await deleteUserBook(id);
    loadBooks();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Mis Libros</h1>

      {/* Formulario para agregar o editar libros */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-2">
          <input
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <input
            name="author_name"
            placeholder="Autor"
            value={formData.author_name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <input
            name="totalPages"
            type="number"
            placeholder="Páginas totales"
            value={formData.totalPages}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="pendiente">Pendiente</option>
            <option value="leyendo">Leyendo</option>
            <option value="terminado">Terminado</option>
            <option value="relectura">Relectura</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Actualizar' : 'Agregar'}
        </button>
      </form>

      {/* Mostrar lista de libros */}
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book._id} className="flex justify-between items-center py-2">
              <div>
                <strong>{book.title}</strong> - {book.author_name[0]} ({book.status})
              </div>
              <div>
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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
