import { useState } from 'react'

const CORRECT_PASSWORD_HASH = '1fe8642f53e4aaa4410319946962ca6d3bcc7782b09c5d89a37e3897b3d5a1e0'

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const useAuth = () => {
  const [password, setPassword] = useState('')
  const [passwordVerified, setPasswordVerified] = useState(false)
  const [message, setMessage] = useState('')

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
      // Play Soviet National Anthem
      const audio = new Audio('/01%20-%20The%20Alexandrov%20Red%20Army%20Chorus%20-%20Soviet%20National%20Anthem.flac')
      audio.play().catch((err) => console.error('Failed to play anthem:', err))
    } else {
      setMessage('Falsches Passwort, bitte versuchen Sie es erneut')
      setPassword('')
    }
  }

  return {
    password,
    setPassword,
    passwordVerified,
    message,
    verifyPassword,
  }
}
