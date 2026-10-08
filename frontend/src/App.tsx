import { Route, Routes } from 'react-router-dom'
import { HelloPage } from './features/hello/HelloPage'

export default function App() {
  return (
    <main>
      <h1>Skincare training app</h1>
      <Routes>
        <Route path="*" element={<HelloPage />} />
      </Routes>
    </main>
  )
}
