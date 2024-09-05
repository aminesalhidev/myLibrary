import React from 'react';

// Definisci il tipo per le props che accetta il componente SearchBar
interface SearchBarProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: string[];
  onSuggestionSelect: (suggestion: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearchChange, suggestions, onSuggestionSelect }) => {
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e);
    setShowSuggestions(true); // Mostra i suggerimenti mentre l'utente digita
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    setShowSuggestions(false); // Nascondi i suggerimenti dopo la selezione
  };

  return (
    <div className="search-bar" style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        name="search"
        id="search-box"
        placeholder="Cerca un libro da leggere"
        value={search}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)} // Mostra i suggerimenti quando l'input è in focus
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
