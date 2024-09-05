import React, { useState } from 'react';
import { Book } from '../types';

interface BookFormProps {
  book: Book;
  onSave: (book: Omit<Book, '_id'>) => void;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSave, onCancel }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publishedYear, setPublishedYear] = useState(book.published_year);
  const [genre, setGenre] = useState(book.genre);
  const [stock, setStock] = useState(book.stock);
  const [error, setError] = useState<string | null>(null);

  const validateBook = (): string | null => {
    if (!title.trim()) return "Il titolo è obbligatorio.";
    if (!author.trim()) return "L'autore è obbligatorio.";
    if (publishedYear > new Date().getFullYear()) return "L'anno di pubblicazione non può essere nel futuro (Riprova).";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateBook();
    if (validationError) {
      setError(validationError);
      return;
    }
    onSave({ title, author, published_year: publishedYear, genre, stock });
  };

  return (
    <div id="book-form">
      <h2>{book._id ? 'Modifica Libro' : 'Aggiungi Libro'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Titolo:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Autore:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Anno di Pubblicazione:
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(Number(e.target.value))}
          />
        </label>
        <label>
          Genere:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </label>
        <button type="submit">{book._id ? 'Salva Modifiche' : 'Aggiungi Libro'}</button>
        <button type="button" onClick={onCancel}>Annulla</button>
      </form>
    </div>
  );
};

export default BookForm;
