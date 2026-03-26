import { useEffect, useRef } from 'react'

interface PasswordModalProps {
  password: string
  setPassword: (password: string) => void
  message: string
  verifyPassword: () => void
  passwordVerified: boolean
}

export const PasswordModal = ({ password, setPassword, message, verifyPassword, passwordVerified }: PasswordModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!passwordVerified && inputRef.current) {
      inputRef.current.focus()
    }
  }, [passwordVerified])

  return (
    <div id="passwordModal" className={`password-modal-overlay ${passwordVerified ? 'hidden' : ''}`}>
      <div className="password-modal">
        <h2>Zugriff erforderlich</h2>
        <p>Bitte geben Sie das Passwort ein:</p>
        <input
          ref={inputRef}
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
  )
}