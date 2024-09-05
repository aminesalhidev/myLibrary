import React, { useState } from 'react';
import { Book } from '../types';
import './BookList.css'; // Assicurati che il file esista e sia nel percorso corretto

interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Stato per gestire l'espansione

  return (
    <div className="book-list-wrapper">
      <div className="book-folder-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2>{isExpanded ? 'Mostra meno' : 'Disponibili'}</h2>
      </div>
      {isExpanded && (
        <div className="scroll-buttons-container">
          <button className="scroll-button scroll-button-left" onClick={() => document.querySelector('.book-list-horizontal')?.scrollBy(-200, 0)}>‹</button>
          <ul className="book-list-horizontal">
            {books.map(book => (
              <li className="book-list-item" key={book._id}>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-info">Author: {book.author}</p>
                <p className="book-info">Published Year: {book.published_year}</p>
                <p className="book-info">Genre: {book.genre}</p>
                <p className="book-info">Stock: {book.stock}</p>
                <button className="book-button" onClick={() => onEdit(book)}>Modifica</button>
                <button className="book-button" onClick={() => onDelete(book._id)}>Elimina</button>
              </li>
            ))}
          </ul>
          <button className="scroll-button scroll-button-right" onClick={() => document.querySelector('.book-list-horizontal')?.scrollBy(200, 0)}>›</button>
        </div>
      )}
    </div>
  );
};

export default BookList;
