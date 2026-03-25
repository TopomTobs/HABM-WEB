import { useEffect, useMemo, useState } from 'react'
import './App.css'

type EducationEntry = {
  title: string
  institution: string
  year: string
  details: string
}

type Person = {
  id: string
  name: string
  role: string
  profileImage?: string
  summary: string
  education: EducationEntry[]
  skills: string[]
  highlights: string[]
  placeholders: string[]
}

const CORRECT_PASSWORD_HASH = '12dcba6f6ee644657c01c710ce57be906cd1d898a1036c0a2364bf1d96031ec5'

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

const persons: Person[] = [
  {
    id: 'markus',
    name: 'Markus Hablesreiter',
    role: 'Java CEO an der HTL Wels',
    profileImage: './assets/markus.jpg',
    summary:
      'Markus verbindet handwerkliches Denken aus dem Maschinenbau mit klaren mathematischen Strukturen und pädagogischer Leidenschaft. Er liebt es, komplexe Themen so zu erklären, dass sie auch für jene verständlich werden, die noch nie darüber nachgedacht haben.',
    education: [
      {
        title: 'HTL IT-Mechanik',
        institution: 'HTL Wels',
        year: 'Abschluss 2010',
        details:
          'Fundierte Ausbildung in Mechanik, Fertigungstechnik und Konstruktion. Schwerpunkt: Betriebstechnik & Steuerungstechnik.',
      },
      {
        title: 'Studium Mathematik',
        institution: 'Universität (Dipl.-Ing.)',
        year: 'Abschluss 2014',
        details:
          'Mathematische Modellierung, Statistik und numerische Methoden – Basis für präzises Denken im Projektunterricht.',
      },
      {
        title: 'Lehrtätigkeit IT & Mathematik',
        institution: 'HTL Wels',
        year: 'seit 2016',
        details:
          'Unterrichtet IT-Grundlagen, Programmieren, Netzwerktechnik und mathematische Grundlagen für Technikerschüler.',
      },
    ],
    skills: [
      'JavaScript / Webentwicklung',
      'Python & Automatisierung',
      'Mathematik & Statistik',
      'Didaktik & Projektbegleitung',
      'CAD / Konstruktion',
    ],
    highlights: [
      'Teamprojekte mit HTL-Schülern zur digitalen Fertigung',
      'Lehrplanentwicklung im Bereich Informatik',
      'Tutor für Schulwettbewerbe und Hackathons',
    ],
    placeholders: ['Projektdokumentation (Platzhalter)'],
  },
  {
    id: 'ShenZ',
    name: 'ShenZ',
    role: 'NWT Großmeister an der HTL Wels',
    profileImage: '/LOLO.avif',
    summary:
      'ShenZ ist ein erfahrener NWT-Lehrer, der mit seiner ruhigen und geduldigen Art komplexe naturwissenschaftliche und technische Konzepte vermittelt. Er legt großen Wert auf praktische Anwendungen und fördert das kritische Denken seiner Schüler, um sie auf die Herausforderungen der modernen Technik vorzubereiten. Besonderen Wert legt er auf die Sozialen Kompetenzen welche er im SOPK, NWT sowie ITS Unterricht vermittelt.',
    education: [
      {
        title: 'HTL IT-Elek',
        institution: 'HTL Wels',
        year: 'Abschluss 1992',
        details: 'Fundierte Ausbildung in Elektrotechnik, Psychologie',
      },
      {
        title: 'Lehrtätigkeit NWT',
        institution: 'HTL Wels',
        year: 'seit 2002',
        details:
          'Unterrichtet Naturwissenschaft und Technik, mit Fokus auf praktische Anwendungen und kritisches Denken.',
      },
      {
        title: 'Master SOPK & ITS',
        institution: 'HTL Wels',
        year: 'seit 2002',
        details:
          'Fördert soziale Kompetenzen und Teamarbeit durch spezielle Unterrichtseinheiten und Projekte.',
      },
    ],
    skills: [],
    highlights: [
      'Obwohl er schon seit 2002 an der HTL Wels unterrichtet, ist er immer noch der jüngste Lehrer an der Schule.',
    ],
    placeholders: ['Protokoll hier Hochladen', 'Bild 2 (Platzhalter)'],
  },
  {
    id: 'laurenz',
    name: 'Lolo',
    role: 'Schüler an der HTL Wels',
    profileImage: '/LOLO.avif',
    summary:
      'Lolo ist ein leidenschaftlicher kroatischer Nationalist, der seine Wurzeln stolz vertritt. Als Schüler an der HTL Wels teilt er seine Zeit zwischen intensivem Schlaf in der Schule und aktiven Outdoor-Abenteuern. Wenn er nicht gerade döst, tracktiert er seine Mitschüler mit seinem scharfen Witz und seiner energischen Persönlichkeit. Seine Leidenschaft gilt dem Eisklettern und Felsenklettern, wo er die Herausforderungen der Natur meistert.',
    education: [
      {
        title: 'HTL Wels',
        institution: 'HTL Wels',
        year: 'aktuell',
        details:
          'Besucht die Höhere Technische Lehranstalt Wels, mit Fokus auf technische Fächer und praktische Ausbildung. Die Ausbildung wird voraussichtlich 7 Jahre dauern.',
      },
    ],
    skills: [
      'Kroatisch nationalistische Kultur',
      'Eisklettern & Felsenklettern',
      'Schlafoptimierung (Schule)',
      'Mitschüler-Interaktion',
    ],
    highlights: [
      'Meister im strategischen Schlafen während des Unterrichts',
      'Erfolgreiche Klettertouren in den Alpen',
      'Stolzer Vertreter kroatischer Traditionen',
    ],
    placeholders: [],
  },
  {
    id: 'Ayshee',
    name: 'Ayshee Müller',
    role: 'Lolos Affaire',
    profileImage: '/LOLO.avif',
    summary:
      'Ayshee ist eine geheimnisvolle und faszinierende Persönlichkeit, die als Lolos Affaire bekannt ist. Sie hat eine enge Beziehung zu Laurenz, dem Schüler an der HTL Wels, und teilt mit ihm eine besondere Verbindung. Ayshee ist für ihre charmante und einnehmende Art bekannt, die sie in sozialen Kreisen beliebt macht. Ihre Interessen und Aktivitäten sind vielfältig, und sie bringt eine einzigartige Dynamik in Laurenzs Leben. Ihr leben verbringt sie ausschließlich zu Hause in der koratischen Botschft wo sie für Lolos wohl sorgt.',
    education: [
      {
        title: 'MaHF (Master of House Frau)',
        institution: 'FH Kabul for Applied IS',
        year: 'Abschluss September 2001',
        details:
          'Fundierte Ausbildung in Mechanik, Fertigungstechnik und Konstruktion. Schwerpunkt: Betriebstechnik & Steuerungstechnik.',
      },
    ],
    skills: [
      'Butzen / Kochen',
      'Python & Automatisierung',
      'Stochastik & Statistik',
      'Didaktik & Gebärung',
      'Kroatischer Charme',
    ],
    highlights: [
      'Wäre Laurenz nicht zeugungsunfähig, hätte Ayshee bereits 10 Kinder mit ihm',
      'Meisterin im Butzen und Kochen für Laurenz',
      'Unschlagbare Fähigkeiten im Stochastischen Denken, besonders in Bezug auf die Wahrscheinlichkeit, dass Laurenz jemals erwachsen wird.',
      'Verteidigerin von Laurenz in sozialen Situationen, insbesondere wenn es um seine Schlafgewohnheiten geht.',
    ],
    placeholders: ['Sichtungen von Ayshee hier hochladen '],
  },
]

function App() {
  const [password, setPassword] = useState('')
  const [passwordVerified, setPasswordVerified] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedPersonId, setSelectedPersonId] = useState(persons[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setInnerWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (innerWidth >= 860) {
      setSidebarOpen(false)
    }
  }, [innerWidth])

  const selectedPerson = useMemo(
    () => persons.find((p) => p.id === selectedPersonId) ?? persons[0],
    [selectedPersonId]
  )

  const verifyPassword = async () => {
    if (!password) {
      setMessage('Bitte geben Sie ein Passwort ein')
      return
    }
    const hash = await sha256(password)
    if (hash === CORRECT_PASSWORD_HASH) {
      setPasswordVerified(true)
      setPassword('')
      setMessage('')
    } else {
      setMessage('Falsches Passwort, bitte versuchen Sie es erneut')
      setPassword('')
    }
  }

  const selectPerson = (personId: string) => {
    if (!passwordVerified) return
    setSelectedPersonId(personId)
    if (innerWidth < 860) {
      setSidebarOpen(false)
    }
  }

  const renderListTiles = () =>
    persons.map((person) => (
      <li
        key={person.id}
        className={['person-item', selectedPerson.id === person.id ? 'active' : ''].join(' ')}
        onClick={() => selectPerson(person.id)}
      >
        {person.name}
      </li>
    ))

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
      <div id="passwordModal" className={`password-modal-overlay ${passwordVerified ? 'hidden' : ''}`}>
        <div className="password-modal">
          <h2>Zugriff erforderlich</h2>
          <p>Bitte geben Sie das Passwort ein:</p>
          <input
            type="password"
            id="passwordInput"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
          />
          <button id="passwordBtn" onClick={verifyPassword}>
            Bestätigen
          </button>
          <div id="passwordError" className="password-error">
            {message}
          </div>
        </div>
      </div>

      <header className={`topbar ${sidebarOpen ? 'shifted' : ''}`}>
        <button
          id="burger"
          className="burger"
          aria-label="Menü"
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="site-title">Portfolio</h1>
      </header>

      <nav id="sidebar" className={`sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="Personenavigation">
        <div className="nav-header">
          <h2>Personen</h2>
        </div>
        <ul id="personList" className="person-list">
          {renderListTiles()}
        </ul>
        <div className="sidebar-footer">
          <p className="soviet-tag">De Maschienenbau Klassn brauch ma ned Hazn, de san söba woam</p>
        </div>
      </nav>

      <div className={`overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      <main id="content" className={`content ${sidebarOpen ? 'shifted' : ''}`} role="main">
        {!passwordVerified ? (
          <section className="section">
            <h2>Zugang gesperrt</h2>
            <p>Bitte geben Sie das Passwort ein, um den Inhalt zu sehen.</p>
          </section>
        ) : (
          <>
            <section className="section">
              <h2>{selectedPerson.name}</h2>
              <p className="highlight">{selectedPerson.role}</p>
              {selectedPerson.profileImage && (
                <div className="profile-image">
                  <img src={selectedPerson.profileImage} alt={`Profilbild ${selectedPerson.name}`} />
                </div>
              )}
              <p>{selectedPerson.summary}</p>
              {selectedPerson.placeholders.length > 0 && (
                <div className="stat-grid">{selectedPerson.placeholders.map(renderPlaceholder)}</div>
              )}
            </section>

            <section className="section">
              <h2>Bildung</h2>
              <ul className="list">{renderEducation(selectedPerson)}</ul>
            </section>

            <section className="section">
              <h2>Kenntnisse</h2>
              {selectedPerson.skills.length > 0 ? <ul className="list">{renderList(selectedPerson.skills)}</ul> : <p>Keine Einträge.</p>}
            </section>

            <section className="section">
              <h2>Highlights</h2>
              {selectedPerson.highlights.length > 0 ? <ul className="list">{renderList(selectedPerson.highlights)}</ul> : <p>Keine Einträge.</p>}
            </section>
          </>
        )}
      </main>
    </>
  )
}

export default App
