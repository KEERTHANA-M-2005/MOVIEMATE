import React from 'react';

function MovieCard({ movie, onFavorite }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h3>{movie.Title}</h3>
      <img src={movie.Poster} alt={movie.Title} style={{ width: '150px' }} />
      <p>Year: {movie.Year}</p>
      <button onClick={() => onFavorite(movie)}>Add to Favorites</button>
    </div>
  );
}

export default MovieCard;
