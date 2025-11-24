// src/App.jsx → FINAL 100% WORKING VERSION
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import EmergencySOSButton from './components/EmergencySOSButton'

// Your main pages
import Home from './pages/Home'
import Issues from './pages/Issues'
import Prevention from './pages/Prevention'
import Tools from './pages/Tools'
import Login from './pages/Login'
import Register from './pages/Register'
import SymptomChecker from './pages/SymptomChecker'
import GlobalCases from './pages/GlobalCases'

// BLOOD PAGES — ALL YOUR HARD WORK
import BloodHome from './pages/blood/BloodHome'          // ← YOUR MASTERPIECE
import StockView from './pages/blood/StockView'
import FindDonor from './pages/blood/FindDonor'
import DonorRegister from './pages/blood/DonorRegister'
import RequestBlood from './pages/blood/RequestBlood'


export default function App() {
  const location = useLocation()
  const hideHeader = location.pathname === '/global-cases'

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeader && <Header />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/prevention" element={<Prevention />} />
          <Route path="/symptoms" element={<SymptomChecker />} />
          <Route path="/global-cases" element={<GlobalCases />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tools" element={<Tools />} />

          {/* ==== BLOOD BANK SECTION ==== */}
          <Route path="/blood" element={<BloodHome />} />                    {/* ← THIS IS YOUR PAGE */}
          <Route path="/blood/stock" element={<StockView />} />
          <Route path="/blood/find" element={<FindDonor />} />
          <Route path="/blood/register" element={<DonorRegister />} />
          <Route path="/blood/request" element={<RequestBlood />} />

          {/* Fallback */}
          <Route path="*" element={<div className="text-center py-20 text-6xl font-bold">404</div>} />

           
        </Routes>

        <EmergencySOSButton />
      </main>
    </div>
  )
}