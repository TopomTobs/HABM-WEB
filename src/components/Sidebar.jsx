import React from 'react';

export default function Sidebar({ persons, selectedPersonId, onSelectPerson, isOpen, onClose }) {
  return (
    <>
      <nav className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Personenavigation">
        <div className="nav-header">
          <h2>Personen</h2>
        </div>
        <ul className="person-list">
          {persons.map((person) => (
            <li
              key={person.id}
              className={`person-item ${selectedPersonId === person.id ? 'active' : ''}`}
              onClick={() => {
                onSelectPerson(person.id);
                onClose();
              }}
            >
              {person.name}
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <p className="soviet-tag">De Maschienenbau Klassn brauch ma ned Hazn, de san söba woam</p>
        </div>
      </nav>
      {isOpen && <div className="overlay visible" onClick={onClose}></div>}
    </>
  );
}
