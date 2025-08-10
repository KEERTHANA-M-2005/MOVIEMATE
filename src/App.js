import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/searchBar';
import MovieCard from './components/MovieCard';
import Favorites from './components/Favorites';
import Spinner from './components/Spinner';
import { fetchMovies } from './services/omdbAPI';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setMovies([]);

    if (query.trim() !== '') {
      setRecentSearches((prev) =>
        [...new Set([query, ...prev])].slice(0, 5)
      );
    }

    try {
      const data = await fetchMovies(query);
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch {
      setError('Something went wrong while fetching data.');
    }

    setLoading(false);
  };

  const handleAddFavorite = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
      toast.success(`${movie.Title} added to favorites!`);
    }
  };

  return (
    <div className={`app ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="container">
        <SearchBar onSearch={handleSearch} suggestions={recentSearches} />

        {loading && <Spinner />}
        {error && <p className="error">{error}</p>}

        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onFavorite={handleAddFavorite}
            />
          ))}
        </div>

        <Favorites favorites={favorites} />
        <ToastContainer position="bottom-right" theme={theme} autoClose={2000} />
      </div>
    </div>
  );
}

export default App;
