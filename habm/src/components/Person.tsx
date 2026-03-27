import { useEffect, useState } from 'react'
import type { Person } from '../types'

interface PersonComponentProps {
  person: Person
}

export const PersonComponent = ({ person }: PersonComponentProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null)
  const [selectedMediaType, setSelectedMediaType] = useState<'image' | 'video' | null>(null)

  // Reset loading state when person changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImageLoaded(false)
  }, [person.id])

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedMedia) {
        setSelectedMedia(null)
        setSelectedMediaType(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedMedia])

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

      {person.quotes && person.quotes.length > 0 && (
        <section className="section">
          <h2>Zitate</h2>
          <div className="quotes-container">
            {person.quotes.map((quote, index) => (
              <blockquote key={index} className="quote">
                "{quote.text}"
                {(quote.date || quote.recipient) && (
                  <div className="quote-meta">
                    {quote.date && <span className="quote-date">{quote.date}</span>}
                    {quote.recipient && <span className="quote-recipient">— {quote.recipient}</span>}
                  </div>
                )}
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {(person.images.length > 0 || (person.videos && person.videos.length > 0)) && (
        <section className="section">
          <h2>Medien Galerie</h2>
          <div className="image-gallery">
            {person.images.map((image, index) => (
              <div 
                key={`img-${index}`} 
                className="gallery-item" 
                onClick={() => {
                  setSelectedMedia(image)
                  setSelectedMediaType('image')
                }}
              >
                <img src={image} alt={`Galerie Bild ${index + 1} von ${person.name}`} />
              </div>
            ))}
            {person.videos && person.videos.map((video, index) => (
              <div 
                key={`vid-${index}`} 
                className="gallery-item gallery-video-item" 
                onClick={() => {
                  setSelectedMedia(video)
                  setSelectedMediaType('video')
                }}
              >
                <video 
                  src={video} 
                  preload="metadata"
                />
                <div className="video-overlay-icon">▶</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedMedia && selectedMediaType === 'image' && (
        <div className="image-overlay" onClick={() => {
          setSelectedMedia(null)
          setSelectedMediaType(null)
        }}>
          <img src={selectedMedia} alt="Vollbild" className="fullscreen-image" />
        </div>
      )}

      {selectedMedia && selectedMediaType === 'video' && (
        <div className="image-overlay" onClick={() => {
          setSelectedMedia(null)
          setSelectedMediaType(null)
        }}>
          <video 
            src={selectedMedia} 
            className="fullscreen-video"
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}