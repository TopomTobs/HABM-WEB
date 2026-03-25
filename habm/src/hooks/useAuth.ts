import { useState } from 'react'

const CORRECT_PASSWORD_HASH = '12dcba6f6ee644657c01c710ce57be906cd1d898a1036c0a2364bf1d96031ec5'

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