import React, { useState, useEffect } from 'react';
import PasswordModal from './components/PasswordModal';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import PersonContent from './components/PersonContent';
import { data, CORRECT_PASSWORD_HASH, sha256 } from './data';
import './index.css';

function App() {
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState(data.persons[0].id);
  const [modalError, setModalError] = useState('');

  const selectedPerson = data.persons.find(p => p.id === selectedPersonId);

  const handlePasswordVerify = async (password) => {
    const hash = await sha256(password);
    if (hash === CORRECT_PASSWORD_HASH) {
      setPasswordVerified(true);
      setModalError('');
    } else {
      setModalError('Falsches Passwort, bitte versuchen Sie es erneut');
    }
  };

  const handleBurgerClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleSelectPerson = (personId) => {
    setSelectedPersonId(personId);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 860) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!passwordVerified) {
    return <PasswordModal onVerified={handlePasswordVerify} />;
  }

  return (
    <div>
      <Topbar onBurgerClick={handleBurgerClick} />
      <Sidebar
        persons={data.persons}
        selectedPersonId={selectedPersonId}
        onSelectPerson={handleSelectPerson}
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
      />
      <PersonContent person={selectedPerson} />
      {sidebarOpen && <div className="overlay visible" onClick={handleSidebarClose}></div>}
    </div>
  );
}

export default App;
