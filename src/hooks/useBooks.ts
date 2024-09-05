// src/hooks/useBooks.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from '../types';
import { API_URL } from '../config';

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Book[]>(`${API_URL}/books`);
        setBooks(response.data);
      } catch (error) {
        setError('Error fetching books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const addBook = async (book: Omit<Book, '_id'>) => {
    try {
      await axios.post(`${API_URL}/books`, book);
      setBooks(prevBooks => [...prevBooks, book as Book]);
    } catch (error) {
      setError('Error adding book');
    }
  };

  const updateBook = async (book: Book) => {
    try {
      await axios.put(`${API_URL}/books/${book._id}`, book);
      setBooks(prevBooks =>
        prevBooks.map(b => (b._id === book._id ? book : b))
      );
    } catch (error) {
      setError('Error updating book');
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      setBooks(prevBooks => prevBooks.filter(b => b._id !== id));
    } catch (error) {
      setError('Error deleting book');
    }
  };

  return { books, addBook, updateBook, deleteBook, loading, error };
};

export default useBooks;
