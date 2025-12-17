import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import DashboardPage from './pages/dashboard/DashboardPage'
import PropertyPage from './pages/property-detail/PropertyPage' // Liste Sayfası
import PropertyDetailPage from './pages/property-detail/PropertyDetailPage' // Detay Sayfası (Yeni ekledik)
import { Button } from './components/ui/button'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        {/* TOP NAVIGATION BAR */}
        <div className="bg-slate-900 text-white p-2 text-center text-sm flex justify-center gap-4 items-center sticky top-0 z-50">
          <span className="text-slate-400">Navigation:</span>

          <Link to="/">
            <Button variant="link" className="text-white h-auto p-0 font-normal hover:text-slate-300">
              Manager Dashboard
            </Button>
          </Link>

          <span className="text-slate-600">|</span>

          <Link to="/properties">
            <Button variant="link" className="text-white h-auto p-0 font-normal hover:text-slate-300">
              Public Properties (Guest View)
            </Button>
          </Link>
        </div>

        <Routes>
          {/* 1. ADMIN DASHBOARD */}
          <Route path="/" element={<DashboardPage />} />

          {/* 2. PUBLIC LISTING PAGE  */}
          <Route path="/properties" element={<PropertyPage />} />

          {/* 3. PROPERTY DETAIL PAGE (DETAIL) */}
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App