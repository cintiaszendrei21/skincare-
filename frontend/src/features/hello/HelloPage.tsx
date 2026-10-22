import { useEffect, useState } from 'react'
import { getHello, sayHello, saveCosmetic } from '../../api/apiClient'

type HelloState =
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | { status: 'error' }

export function HelloPage() {
  const [state, setState] = useState<HelloState>({ status: 'loading' })

  const [name, setName] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [cosmeticName, setCosmeticName] = useState('')
  const [cosmeticError, setCosmeticError] = useState<string | null>(null)

  useEffect(() => {
    let isCurrent = true

    getHello()
      .then((response) => {
        if (isCurrent) {
          setState({ status: 'success', message: response.message })
        }
      })
      .catch(() => {
        if (isCurrent) {
          setState({ status: 'error' })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [])

  const handleSend = () => {
    setErrorMessage(null)
    if (!name.trim()) {
      setErrorMessage('A név megadása kötelező!')
      return
    }
    if (name.length < 2) {
      setErrorMessage('A névnek legalább 2 karakter hosszúnak kell lennie!')
      return
    }
    sayHello(name)
      .then((response) => {
        setState({ status: 'success', message: response.message })
      })
      .catch((error) => {
        console.error('error', error)
        setErrorMessage('Hiba történt a kérés küldése során.')
      })
  }

  const handleCosmeticSend = () => {
    setCosmeticError(null)
    if (!cosmeticName.trim()) {
      setCosmeticError('A név megadása kötelező!')
      return
    }
    if (cosmeticName.length < 2) {
      setCosmeticError('A névnek legalább 2 karakter hosszúnak kell lennie!')
      return
    }
    saveCosmetic(cosmeticName)
      .then((response) => {
        setState({ status: 'success', message: response.message })
      })
      .catch((error) => {
        console.error('error', error)
        setCosmeticError('Hiba történt a mentés során.')
      })
  }

  if (state.status === 'loading') {
    return <p role="status">Loading message from the backend…</p>
  }

  if (state.status === 'error') {
    return <p role="alert">Could not load the backend message. Is the backend running?</p>
  }

  return (
    <>
      <p>{state.message}</p>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <input
        type="text"
        placeholder="Add meg a neved"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={handleSend}>Küldés</button>

      <br /><br />

      {cosmeticError && <p style={{ color: 'red' }}>{cosmeticError}</p>}
      <input
        type="text"
        placeholder="Add meg a termék nevét"
        value={cosmeticName}
        onChange={(e) => setCosmeticName(e.target.value)}
      />
      <button type="button" onClick={handleCosmeticSend}>Küldés</button>
    </>
  )
}
