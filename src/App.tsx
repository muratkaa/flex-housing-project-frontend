import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import DashboardPage from './pages/dashboard/DashboardPage'
import PropertyPage from './pages/public/PropertyPage'
import { Button } from './components/ui/button'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        {/* Üstteki Test Menüsü (Geçişi kolaylaştırmak için) */}
        <div className="bg-slate-900 text-white p-2 text-center text-sm flex justify-center gap-4 items-center">
          <span>Developer Navigation:</span>
          <Link to="/">
            <Button variant="link" className="text-white h-auto p-0">
              Manager Dashboard
            </Button>
          </Link>
          <span className="text-slate-600">|</span>
          <Link to="/property/1">
            <Button variant="link" className="text-white h-auto p-0">
              Public Property Page
            </Button>
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
