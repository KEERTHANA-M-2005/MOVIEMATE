import React from 'react';

function MovieCard({ movie, onFavorite }) {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <button className="favorite-btn" onClick={() => onFavorite(movie)}>
        ❤️ Favorite
      </button>
    </div>
  );
}

export default MovieCard;
