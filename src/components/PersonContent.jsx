import React from 'react';

export default function PersonContent({ person }) {
  if (!person) {
    return <main className="content" role="main"></main>;
  }

  return (
    <main className="content" role="main">
      <section className="section">
        <h2>{person.name}</h2>
        <p className="highlight">{person.role}</p>
        {person.profileImage && (
          <div className="profile-image">
            <img src={person.profileImage} alt={`Profilbild ${person.name}`} />
          </div>
        )}
        <p>{person.summary}</p>
        {person.placeholders.map((label, idx) => (
          <div key={idx} className="placeholder-image">
            {label.startsWith('Assets/') ? (
              <img src={label} alt={label} />
            ) : (
              <>
                {label}
                <br />
                <span className="badge">Bild hier</span>
              </>
            )}
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Bildung</h2>
        <ul className="list">
          {person.education.map((edu, idx) => (
            <li key={idx}>
              <strong>{edu.title}</strong> — {edu.institution}{' '}
              <span className="highlight">({edu.year})</span>
              <br />
              <small>{edu.details}</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Kenntnisse</h2>
        <ul className="list">
          {person.skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Highlights</h2>
        <ul className="list">
          {person.highlights.map((highlight, idx) => (
            <li key={idx}>{highlight}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
