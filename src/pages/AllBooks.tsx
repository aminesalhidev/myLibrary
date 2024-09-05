import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from '../types';
import { API_URL } from '../config';
import './AllBooks.css';

const AllBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null); // Gestisce il libro in fase di modifica
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);

  useEffect(() => {
    fetchBooks();
  }, [token]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>(`${API_URL}/books`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book); // Mostra il modulo di modifica
  };

  const handleSaveBook = async (book: Book) => {
    if (!book.title || !book.author || !book.published_year || !book.genre || book.stock === undefined) {
      alert('Tutti i campi devono essere compilati.');
      return;
    }

    try {
      await axios.put(`${API_URL}/books/${book._id}`, book, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingBook(null); // Nascondi il modulo di modifica
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingBook) {
      setEditingBook({
        ...editingBook,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <div id="all-books">
      <h1>All Books</h1>
      {editingBook ? (
        <div className="book-edit-form">
          <h2>Modifica Libro</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveBook(editingBook); }}>
            <label>
              Titolo:
              <input type="text" name="title" value={editingBook.title} onChange={handleInputChange} />
            </label>
            <label>
              Autore:
              <input type="text" name="author" value={editingBook.author} onChange={handleInputChange} />
            </label>
            <label>
              Anno di Pubblicazione:
              <input type="number" name="published_year" value={editingBook.published_year} onChange={handleInputChange} />
            </label>
            <label>
              Genere:
              <input type="text" name="genre" value={editingBook.genre} onChange={handleInputChange} />
            </label>
            <label>
              Stock:
              <input type="number" name="stock" value={editingBook.stock} onChange={handleInputChange} />
            </label>
            <button type="submit">Salva</button>
            <button type="button" onClick={() => setEditingBook(null)}>Annulla</button>
          </form>
        </div>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div key={book._id} className="book-item">
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Published Year: {book.published_year}</p>
              <p>Genre: {book.genre}</p>
              <p>Stock: {book.stock}</p>
              <button onClick={() => handleEditBook(book)}>Modifica</button>
              <button onClick={() => handleDeleteBook(book._id)}>Elimina</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
