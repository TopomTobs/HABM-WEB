import { useState } from 'react'

const CORRECT_PASSWORD_HASH = 'dd166db3780fe9d8b38844b737288867ce50ec6f06590785b2d598c8a979dc7a'

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