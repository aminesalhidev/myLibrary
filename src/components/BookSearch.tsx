import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { Book, Suggestion } from '../types/index'; // Importa le interfacce dal file types.ts
const BookSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>('http://localhost:3000/books', {
          params: { title: searchTerm }
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    if (searchTerm.length > 2) { // Fetch books only if searchTerm is more than 2 characters
      fetchBooks();
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get<Suggestion[]>('http://localhost:3000/books/suggestions', {
          params: { query: searchTerm }
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    if (searchTerm.length > 2) { // Fetch suggestions only if searchTerm is more than 2 characters
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchTerm(suggestion);
  };

  return (
    <div>
      <SearchBar
        search={searchTerm}
        onSearchChange={handleSearchChange}
        suggestions={suggestions.map(s => s.title)} // Assuming suggestions have a 'title' field
        onSuggestionSelect={handleSuggestionSelect}
      />
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.published_year}</p>
            <p>{book.genre}</p>
            <p>Stock: {book.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
