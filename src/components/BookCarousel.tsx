
import React, { useState, useRef } from 'react';
import { Book } from '../types';
import './BookCarousel.css';
interface BookCarouselProps {
  books: Book[];
}

const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handlePrev = () => {
    setOffset(prevOffset => Math.min(prevOffset + 220, 0));
  };

  const handleNext = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const maxOffset = -((books.length * 220) - containerWidth);
      setOffset(prevOffset => Math.max(prevOffset - 220, maxOffset));
    }
  };

  return (
    <div className="book-carousel">
      <button className="carousel-button left" onClick={handlePrev}>←</button>
      <div className="book-list" style={{ transform: `translateX(${offset}px)` }} ref={containerRef}>
        {books.map(book => (
          <div className="book-item" key={book._id}>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Published Year:</strong> {book.published_year}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Stock:</strong> {book.stock}</p>
          </div>
        ))}
      </div>
      <button className="carousel-button right" onClick={handleNext}>→</button>
    </div>
  );
};

export default BookCarousel;
