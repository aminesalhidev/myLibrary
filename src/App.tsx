import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import AllBooks from './pages/AllBooks';
import { Book } from './types';
import { API_URL } from './config';
import './App.css';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>(`${API_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async (book: Omit<Book, '_id'>) => {
    try {
      await axios.post(`${API_URL}/books`, book);
      fetchBooks(); // Ricarica la lista dei libri
      setIsModalOpen(false); // Chiudi la modale
      alert('Libro aggiunto con successo!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Errore nell\'aggiungere il libro.');
    }
  };

  const handleUpdateBook = async (book: Omit<Book, '_id'>) => {
    if (editingBook) {
      try {
        const updatedBook = { ...book, _id: editingBook._id };
        await axios.put(`${API_URL}/books/${editingBook._id}`, updatedBook);
        fetchBooks(); // Ricarica la lista dei libri
        setEditingBook(null);
        setIsModalOpen(false); // Chiudi la modale
      } catch (error) {
        console.error('Error updating book:', error);
      }
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      fetchBooks(); // Ricarica la lista dei libri
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Router>
      <div id="wrapper">
        <div id="header">
          <ul>
            <li id="user">User</li>
            <li><a href="/all-books">Visualizza Tutti i Libri</a></li>
            <li><a href="#">Non navigabile</a></li>
            <li id="apps"></li>
            <li id="notifications"></li>
            <li id="user-menu">
              <div id="user-initial">R</div>
            </li>
          </ul>
        </div>
        <div id="content">
          <Routes>
            <Route path="/" element={
              <>
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
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div id="button-container">
                      <button type="button" onClick={() => setIsModalOpen(true)}>
                        Aggiungi Libro
                      </button>
                      <button type="button" style={{ backgroundColor: 'rgb(0, 191, 255)' }}>
                        My library ;)
                      </button>
                    </div>
                  </center>
                </form>
                {isModalOpen && (
                  <div id="modal">
                    <div id="modal-content">
                      <BookForm
                        book={editingBook || { _id: '', title: '', author: '', published_year: new Date().getFullYear(), genre: '', stock: 0 }}
                        onSave={editingBook ? handleUpdateBook : handleAddBook}
                        onCancel={() => setIsModalOpen(false)}
                      />
                    </div>
                  </div>
                )}
                    <BookList books={filteredBooks} onDelete={handleDeleteBook} onEdit={setEditingBook} />
              </>
            } />    
            <Route path="/all-books" element={<AllBooks />} />
          </Routes>
        </div>
        <div id="footer">
          <div id="footer-left">
            <ul>
              <li><a href="#">Footer Link 1</a></li>
              <li><a href="#">Footer Link 2</a></li>
              <li><a href="#">Footer Link 3</a></li>
            </ul>
          </div>
          <div id="footer-right">
            <ul>
              <li><a href="#">Footer Link 4</a></li>
              <li><a href="#">Footer Link 5</a></li>
              <li><a href="#">Footer Link 6</a></li>
              <li><a href="#">Footer Link 7</a></li>
            </ul>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
