import React from 'react';

export default function Topbar({ onBurgerClick }) {
  return (
    <header className="topbar">
      <button
        id="burger"
        className="burger"
        aria-label="Menü"
        onClick={onBurgerClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <h1 className="site-title">Portfolio</h1>
    </header>
  );
}
