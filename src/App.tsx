import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import DashboardPage from './pages/dashboard/DashboardPage'
import PropertyDetailPage from './pages/property-detail/PropertyDetailPage'; // Detay Sayfası (Yeni ekledik)
import PropertyPage from './pages/property-detail/PropertyPage'; // Liste Sayfası

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        {/* TOP NAVIGATION BAR */}
        <Navbar />

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