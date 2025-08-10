import React from 'react';

function Navbar({ theme, setTheme }) {
  return (
    <nav className="navbar">
      <h1 className="logo">🎬 MovieMate</h1>
      <button
        className="toggle-btn"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </nav>
  );
}

export default Navbar;
