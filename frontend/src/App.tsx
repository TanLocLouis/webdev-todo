import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}
      {/* Main content — offset by sidebar width on desktop */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  )
}
