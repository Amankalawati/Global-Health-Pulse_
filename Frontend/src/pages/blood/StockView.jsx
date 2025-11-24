// src/pages/blood/StockView.jsx
import React, { useEffect, useState } from 'react'
import { getBloodStock } from '../../api/healthApi'
import { Droplet, AlertTriangle, RefreshCw, Hospital, Phone } from 'lucide-react'

export default function StockView() {
  const [stock, setStock] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState('')

  const fetchStock = async () => {
    setLoading(true)
    try {
      const data = await getBloodStock()  // ← Your real backend!
      setStock(Array.isArray(data) ? data : [])
      setLastUpdated(new Date().toLocaleTimeString('en-IN'))
    } catch (err) {
      console.error('Failed to fetch blood stock:', err)
      alert('Could not load blood stock. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStock()
    const interval = setInterval(fetchStock, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  // Group by blood group for summary
  const summary = stock.reduce((acc, s) => {
    acc[s.bloodGroup] = (acc[s.bloodGroup] || 0) + (s.units || 0)
    return acc
  }, {})

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

  const getLevel = (units) => {
    if (units === 0) return { label: 'EMPTY', color: 'bg-red-600', pulse: true }
    if (units <= 5) return { label: 'CRITICAL', color: 'bg-red-500', pulse: true }
    if (units <= 15) return { label: 'LOW', color: 'bg-orange-500', pulse: false }
    return { label: 'AVAILABLE', color: 'bg-green-600', pulse: false }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-red-700 mb-4">
            Live Blood Stock Dashboard
          </h1>
          <p className="text-2xl text-gray-700">
            Last updated: <strong>{lastUpdated || 'Loading...'}</strong>
          </p>
          <button
            onClick={fetchStock}
            className="mt-6 inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl transition"
          >
            <RefreshCw className={`w-8 h-8 ${loading ? 'animate-spin' : ''}`} />
            Refresh Live Data
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12">
          {bloodGroups.map(bg => {
            const units = summary[bg] || 0
            const { label, color, pulse } = getLevel(units)
            return (
              <div
                key={bg}
                className={`relative rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all ${color} ${pulse ? 'animate-pulse' : ''}`}
              >
                <div className="text-center">
                  <div className="text-5xl font-black">{bg}</div>
                  <div className="text-7xl font-black mt-4">{units}</div>
                  <div className="mt-3 text-xl font-bold flex items-center justify-center gap-2">
                    <Droplet className="w-8 h-8" />
                    {label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Detailed List */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8">
            <h2 className="text-4xl font-black flex items-center gap-4">
              <Hospital className="w-12 h-12" />
              All Blood Banks & Hospitals
            </h2>
          </div>

          {loading ? (
            <div className="p-20 text-center">
              <RefreshCw className="w-16 h-16 mx-auto animate-spin text-red-600" />
              <p className="text-2xl mt-6">Loading live stock from server...</p>
            </div>
          ) : stock.length === 0 ? (
            <div className="p-20 text-center text-gray-500">
              <Droplet className="w-32 h-32 mx-auto opacity-20" />
              <p className="text-3xl mt-8">No blood stock available yet</p>
              <p className="text-lg mt-4">Add stock via admin panel</p>
            </div>
          ) : (
            <div className="grid gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
              {stock.map((s, i) => {
                const level = getLevel(s.units)
                return (
                  <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-red-400 transition">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-black text-xl text-gray-800">{s.center || s.hospital}</h3>
                      <span className={`px-4 py-2 rounded-full text-white font-bold text-sm ${level.color}`}>
                        {level.label}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Droplet className="w-8 h-8 text-red-600" fill="currentColor" />
                        <span className="text-4xl font-black">{s.bloodGroup}</span>
                        <span className="text-5xl font-black text-red-600 ml-4">{s.units}</span>
                        <span className="text-lg text-gray-600">units</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>City:</strong> {s.city}</p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-green-600" />
                          <a href={`tel:${s.contact}`} className="text-green-600 font-semibold hover:underline">
                            {s.contact}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}