import type { Person } from '../types'

interface SidebarProps {
  persons: Person[]
  selectedPersonId: string
  onSelectPerson: (personId: string) => void
  onSelectPackliste: () => void
  currentView: 'persons' | 'packliste'
  sidebarOpen: boolean
}

export const Sidebar = ({
  persons,
  selectedPersonId,
  onSelectPerson,
  onSelectPackliste,
  currentView,
  sidebarOpen
}: SidebarProps) => {

  const renderListTiles = () =>
    persons.map((person) => (
      <li
        key={person.id}
        className={['person-item', selectedPersonId === person.id && currentView === 'persons' ? 'active' : ''].join(' ')}
        onClick={(e) => {
          e.stopPropagation()
          onSelectPerson(person.id)
        }}
      >
        {person.name}
      </li>
    ))

  return (
    <nav id="sidebar" className={`sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="Navigation">
      <div className="nav-header">
        <h2>Personen</h2>
      </div>
      <ul id="personList" className="person-list">
        {renderListTiles()}
      </ul>

      <div className="extras-section">
        <div className="section-header">
          <h2>Extras</h2>
        </div>
        <ul className="extras-list">
          <li
            className={['extras-item', currentView === 'packliste' ? 'active' : ''].join(' ')}
            onClick={(e) => {
              e.stopPropagation()
              onSelectPackliste()
            }}
          >
            Packliste
          </li>
        </ul>
      </div>

      <div className="sidebar-footer">
        <p className="soviet-tag">De Maschienenbau Klassn brauch ma ned Hazn, de san söba woam</p>
      </div>
    </nav>
  )
}