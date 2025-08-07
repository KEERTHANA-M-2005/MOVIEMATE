import React, { useState } from 'react';
import SearchBar from './components/searchBar';
import MovieCard from './components/MovieCard';
import Favorites from './components/Favorites';
import { fetchMovies } from './services/omdbAPI';

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async (query) => {
    const data = await fetchMovies(query);
    setMovies(data.Search || []);
  };

  const handleAddFavorite = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div>
      <h1>MovieMate 🎮</h1>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onFavorite={handleAddFavorite}
          />
        ))}
      </div>
      <Favorites favorites={favorites} />
    </div>
  );
}

export default App;
