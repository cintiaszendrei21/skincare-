import { useEffect, useState } from 'react'
import { getHello } from '../../api/apiClient'

type HelloState =
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | { status: 'error' }

export function HelloPage() {
  const [state, setState] = useState<HelloState>({ status: 'loading' })
  const [name, setName] = useState('')

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
    getHello(name)
      .then((response) => {
        setState({ status: 'success', message: response.message })
      })
      .catch((error) => {
        console.error('error', error)
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
      <input
        type="text"
        placeholder="Add meg a neved"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={handleSend}>Küldés</button>
    </>
  )
}
