// src/components/BookList.tsx
import React from 'react';
import { Book } from '../types';

interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete, onEdit }) => {
  return (
    <ul>
      {books.map(book => (
        <li key={book._id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Published Year: {book.published_year}</p>
          <p>Genre: {book.genre}</p>
          <p>Stock: {book.stock}</p>


          <button
  onClick={() => onEdit(book)}
  
>
  Modifica Film
</button>
<button
  onClick={() => onDelete(book._id)}
 
>
  Elimina Film
</button>



         </li>
      ))}
    </ul>
  );
};

export default BookList;
