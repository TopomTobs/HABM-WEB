import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { persons } from './data/persons'
import { useAuth } from './hooks/useAuth'
import { PasswordModal } from './components/PasswordModal'
import { Sidebar } from './components/Sidebar'
import { PersonComponent } from './components/Person'

function App() {
  const { password, setPassword, passwordVerified, message, verifyPassword } = useAuth()
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSidebarOpen(false)
    }
  }, [innerWidth])

  useEffect(() => {
    // Add or remove authenticated class from body based on password verification
    if (passwordVerified) {
      document.body.classList.add('authenticated')
    } else {
      document.body.classList.remove('authenticated')
    }
  }, [passwordVerified])

  const selectedPerson = useMemo(
    () => persons.find((p) => p.id === selectedPersonId) ?? persons[0],
    [selectedPersonId]
  )

  const selectPerson = (personId: string) => {
    if (!passwordVerified) return
    setSelectedPersonId(personId)
    if (innerWidth < 860) {
      setSidebarOpen(false)
    }
  }

  return (
    <>
      <PasswordModal
        password={password}
        setPassword={setPassword}
        message={message}
        verifyPassword={verifyPassword}
        passwordVerified={passwordVerified}
      />

      <header className="topbar">
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

      <Sidebar
        persons={persons}
        selectedPersonId={selectedPersonId}
        onSelectPerson={selectPerson}
        sidebarOpen={sidebarOpen}
      />

      <div className={`overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      <main id="content" className={`content ${sidebarOpen ? 'shifted' : ''}`} role="main">
        {!passwordVerified ? (
          <section className="section">
            <h2>Zugang gesperrt</h2>
            <p>Bitte geben Sie das Passwort ein, um den Inhalt zu sehen.</p>
          </section>
        ) : (
          <PersonComponent person={selectedPerson} />
        )}
      </main>
    </>
  )
}

export default App
