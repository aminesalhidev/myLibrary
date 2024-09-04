import React, { useEffect, useState } from 'react';
import axios from 'axios';

//i componenti che ho aggiunto riguardante inserimento dei dati dentro le tabelle
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { Book } from './types';
import { API_URL } from './config'; // Importa l'URL di base
import './App.css'


const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>(`${API_URL}/books`); // Utilizza l'URL di base
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddBook = async (book: Omit<Book, '_id'>) => {
    try {
      await axios.post(`${API_URL}/books`, book); // Utilizza l'URL di base
      fetchBooks(); // Refresh the list after adding a book
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateBook = async (book: Omit<Book, '_id'>) => {
    try {
      if (editingBook) {
        const updatedBook = { ...book, _id: editingBook._id };
        await axios.put(`${API_URL}/books/${editingBook._id}`, updatedBook); // Utilizza l'URL di base
        fetchBooks();
        setEditingBook(null);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`); // Utilizza l'URL di base
      fetchBooks(); // Refresh the list after deleting a book
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="wrapper">
      <div id="header">
        <ul>
          <li id="user">User</li>
          <li><a href="#">Visualizza Tutti i Libri </a></li>
          <li><a href="#"></a></li>
          <li id="apps"></li> {/* Apps */}
          <li id="notifications"></li> {/* Notifications */}
          <li id="user-menu">
            <div id="user-initial">User</div>
          </li>
        </ul>
      </div>

      <div id="content">
        <center>
          <div id="logo">
            <span id="country">Trovati un libro da leggere :)</span>
          </div>
        </center>

        <form id="search-form" onSubmit={(e) => e.preventDefault()}>
          <center>
            <input
              type="text"
              name="search"
              id="search-box"
              placeholder="Cercati un libro da leggere"
              value={search}
              onChange={handleSearchChange}
            />

 {/* da migliore il csss rendendolo ok */}

            <div id="button-container">
              <input
                type="submit"
                value="Aggiungi Libro"
                onClick={() => setEditingBook({ _id: '', title: '', author: '', published_year: new Date().getFullYear(), genre: '', stock: 0 })}
              />
              <input
                type="submit"
                value="Ciao ;)"
                style={{ backgroundColor: 'rgb(0, 191, 255)' }}
              />
            </div>
          </center>
        </form>

        {editingBook && (
          <BookForm
            book={editingBook}
            onSave={handleUpdateBook}
            onCancel={() => setEditingBook(null)}
          />
        )}

        <BookList books={filteredBooks} onDelete={handleDeleteBook} onEdit={setEditingBook} />
      </div>

      <div id="footer">
        <div id="footer-left">
          <ul>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
          </ul>
        </div>
        <div id="footer-right">
          <ul>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;