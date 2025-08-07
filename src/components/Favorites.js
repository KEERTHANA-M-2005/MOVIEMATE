import React from 'react';

function Favorites({ favorites }) {
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((movie) => (
          <div key={movie.imdbID}>
            {movie.Title} ({movie.Year})
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
