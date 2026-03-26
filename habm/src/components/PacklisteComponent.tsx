import type { Animal } from '../types'

interface PacklisteComponentProps {
  animals: Animal[]
}

export const PacklisteComponent = ({ animals }: PacklisteComponentProps) => {
  return (
    <>
      <section className="section">
        <h2>Packliste - Meist gesuchte Tiere</h2>
        <div className="animal-list">
          {animals.map((animal) => (
            <div key={animal.id} className="animal-card">
              <div className="animal-image">
                <img src={animal.picture} alt={animal.name} />
              </div>
              <div className="animal-info">
                <h3>{animal.name}</h3>
                <p className="animal-reason">{animal.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
