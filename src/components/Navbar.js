import React from 'react';

export default function Navbar({ theme, setTheme }) {
  return (
    <nav className="navbar">
      <h1>🎬 Movie App</h1>
      <button 
        className="toggle-btn" 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? '🌙 Dark Mode' : '☀ Light Mode'}
      </button>
    </nav>
  );
}
