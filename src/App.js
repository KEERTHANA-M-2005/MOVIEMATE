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
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [recentSearches, setRecentSearches] = useState([]);

  // Apply dark/light mode
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  // Fetch random movies on first load
  useEffect(() => {
    const popularQueries = ["Avengers", "Batman", "Spiderman", "Harry Potter", "Star Wars", "Frozen", "Iron Man"];
    const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
    handleSearch(randomQuery);
  }, []);

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
    <div className="app">
      <Navbar 
        theme={theme} 
        setTheme={setTheme} // toggle control
      />
      
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

        <ToastContainer 
          position="bottom-right" 
          theme={theme === 'dark' ? 'dark' : 'light'} 
          autoClose={2000} 
        />
      </div>
    </div>
  );
}

export default App;
