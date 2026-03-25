import type { Person } from '../types'

interface SidebarProps {
  persons: Person[]
  selectedPersonId: string
  onSelectPerson: (personId: string) => void
  sidebarOpen: boolean
}

export const Sidebar = ({ persons, selectedPersonId, onSelectPerson, sidebarOpen }: SidebarProps) => {
  const renderListTiles = () =>
    persons.map((person) => (
      <li
        key={person.id}
        className={['person-item', selectedPersonId === person.id ? 'active' : ''].join(' ')}
        onClick={() => onSelectPerson(person.id)}
      >
        {person.name}
      </li>
    ))

  return (
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
  )
}