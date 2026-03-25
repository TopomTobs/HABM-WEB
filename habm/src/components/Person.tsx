import { useEffect, useState } from 'react'
import type { Person } from '../types'

interface PersonComponentProps {
  person: Person
}

export const PersonComponent = ({ person }: PersonComponentProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  // Reset loading state when person changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImageLoaded(false)
  }, [person.id])

  const renderEducation = (person: Person) =>
    person.education.map((edu) => (
      <li key={`${person.id}-${edu.title}`}>
        <strong>{edu.title}</strong> — {edu.institution} <span className="highlight">({edu.year})</span>
        <br />
        <small>{edu.details}</small>
      </li>
    ))

  const renderList = (items: string[]) => items.map((item) => <li key={item}>{item}</li>)

  const renderPlaceholder = (entry: string) => {
    const isImage = entry.toLowerCase().endsWith('.avif') || entry.toLowerCase().endsWith('.png') || entry.toLowerCase().endsWith('.jpg') || entry.toLowerCase().endsWith('.gif')
    if (isImage) {
      return (
        <div className="placeholder-image" key={entry}>
          <img src={entry} alt={entry} />
        </div>
      )
    }
    return (
      <div className="placeholder-image" key={entry}>
        {entry}
        <br />
        <span className="badge">Bild hier</span>
      </div>
    )
  }

  return (
    <>
      <section className="section">
        <h2>{person.name}</h2>
        <p className="highlight">{person.role}</p>
        {person.profileImage && (
          <div className={`profile-image ${imageLoaded ? 'loaded' : 'loading'}`}>
            {!imageLoaded && <div className="loading-text">Profilbild {person.name}</div>}
            <img 
              src={person.profileImage} 
              alt={`Profilbild ${person.name}`}
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
          </div>
        )}
        <p>{person.summary}</p>
        {person.placeholders.length > 0 && (
          <div className="stat-grid">{person.placeholders.map(renderPlaceholder)}</div>
        )}
      </section>

      <section className="section">
        <h2>Bildung</h2>
        <ul className="list">{renderEducation(person)}</ul>
      </section>

      <section className="section">
        <h2>Kenntnisse</h2>
        {person.skills.length > 0 ? <ul className="list">{renderList(person.skills)}</ul> : <p>Keine Einträge.</p>}
      </section>

      <section className="section">
        <h2>Highlights</h2>
        {person.highlights.length > 0 ? <ul className="list">{renderList(person.highlights)}</ul> : <p>Keine Einträge.</p>}
      </section>
    </>
  )
}