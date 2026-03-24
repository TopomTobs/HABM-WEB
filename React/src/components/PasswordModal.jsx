import React, { useState, useRef, useEffect } from 'react';

export default function PasswordModal({ onVerified }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Bitte geben Sie ein Passwort ein');
      return;
    }

    await onVerified(password);
    setPassword('');
  };

  return (
    <div className="password-modal-overlay">
      <div className="password-modal">
        <h2>Zugriff erforderlich</h2>
        <p>Bitte geben Sie das Passwort ein:</p>
        <form onSubmit={handleVerify}>
          <input
            ref={inputRef}
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />
          <button type="submit">Bestätigen</button>
        </form>
        {error && <div className="password-error">{error}</div>}
      </div>
    </div>
  );
}
