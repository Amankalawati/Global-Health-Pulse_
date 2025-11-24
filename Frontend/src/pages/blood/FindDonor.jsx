// src/pages/blood/FindDonor.jsx   ← EXACT NAME + PATH
import React, { useState, useEffect } from 'react'
import { searchDonors } from '../../api/healthApi'
import { MapPin, Phone, MessageCircle, Droplet, AlertCircle, Navigation } from 'lucide-react'

export default function FindDonor() {
  const [donors, setDonors] = useState([])
  const [bloodGroup, setBloodGroup] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setError(''),
        () => setError('Location access denied')
      )
    }
  }

  const findDonors = async () => {
    if (!bloodGroup) return alert('Select blood group')
    setLoading(true)
    try {
      const data = await searchDonors({ bloodGroup })
      setDonors(Array.isArray(data) ? data : [])
    } catch (err) {
      setDonors([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-4 bg-red-600 text-white px-10 py-6 rounded-full text-3xl font-black shadow-2xl animate-pulse mb-8">
          <Droplet className="w-12 h-12" fill="white" />
          FIND DONOR NEAR ME
          <Droplet className="w-12 h-12" fill="white" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10">
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full px-6 py-5 text-xl border-4 border-red-300 rounded-2xl mb-6"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>

          <button
            onClick={findDonors}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-2xl py-6 rounded-2xl"
          >
            {loading ? 'Searching...' : 'FIND DONORS NOW'}
          </button>
        </div>

        {donors.length === 0 && !loading && bloodGroup && (
          <p className="text-2xl text-gray-600">No donors found yet. Be the first!</p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {donors.map((d, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-red-200">
              <h3 className="text-3xl font-black">{d.name}</h3>
              <p className="text-4xl font-bold text-red-600">{d.bloodGroup}</p>
              <p className="text-xl mt-4">{d.city}</p>
              <div className="flex gap-4 mt-6">
                <a href={`tel:${d.contact}`} className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold">Call</a>
                <a href={`https://wa.me/${d.contact.replace(/\D/g,'')}`} target="_blank" className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold">WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}