import React, { useState } from 'react';

function SearchBar({ onSearch, suggestions }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      {suggestions.length > 0 && (
        <div className="suggestions">
          <p>Recent:</p>
          {suggestions.map((item, index) => (
            <span key={index} onClick={() => onSearch(item)}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
