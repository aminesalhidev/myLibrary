// src/components/BookForm.tsx
import React, { useState, useEffect } from 'react';
import { Book } from '../types';

interface BookFormProps {
  book: Book | null;
  onSave: (book: Omit<Book, '_id'>) => Promise<void>;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSave, onCancel }) => {
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [publishedYear, setPublishedYear] = useState<number>(book?.published_year || 0);
  const [genre, setGenre] = useState(book?.genre || '');
  const [stock, setStock] = useState<number>(book?.stock || 0);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setPublishedYear(book.published_year);
      setGenre(book.genre);
      setStock(book.stock);
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      published_year: publishedYear,
      genre,
      stock,
    };
    await onSave(newBook);
    onCancel();
  };
  

  /* Input che aggiungiamo mente inseriamo i nuovi dati nel sistema di gestione mongodb.*/ 

  return (
    
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titolo"
        required
      />

      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Autore"
        required
      />

      <input
        type="number"
        value={publishedYear}
        onChange={(e) => setPublishedYear(parseInt(e.target.value))}
        placeholder="Anno di pubblicazioner"
        required
      />

      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genere"
        required
      />

      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(parseInt(e.target.value))}
        placeholder="Stock"
        required
      />

      <button type="submit">Aggiungi</button>
      <button type="button" onClick={onCancel}>Cancella</button>
    </form>
  );
};

export default BookForm;
