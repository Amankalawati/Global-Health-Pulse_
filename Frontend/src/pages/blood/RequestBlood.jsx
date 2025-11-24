import React, { useState } from 'react'
import { createBloodRequest } from '../../api/healthApi'
import { Siren, Droplet, PhoneCall, MapPin, Hospital, User, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function RequestBlood() {
  const [form, setForm] = useState({
    patientName: '',
    bloodGroup: '',
    units: 1,
    city: '',
    hospital: '',
    contact: ''
  })
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg(null)

    try {
      await createBloodRequest(form)
      setMsg({
        type: 'success',
        text: 'URGENT REQUEST SENT! Donors in your area have been notified. Help is on the way!'
      })
      setForm({ patientName: '', bloodGroup: '', units: 1, city: '', hospital: '', contact: '' })
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to send alert. Please try again or call 108 immediately.' })
    } finally {
      setLoading(false)
    }
  }

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-red-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* EMERGENCY HERO */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-4 bg-red-600 text-white px-10 py-6 rounded-full text-3xl font-black shadow-2xl animate-pulse">
            <Siren className="w-12 h-12" />
            EMERGENCY BLOOD NEEDED
            <Siren className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-red-700 mt-6">
            Save a Life <span className="text-gray-900">Right Now</span>
          </h1>
          <p className="text-2xl text-gray-700 mt-4 font-semibold">
            Your request will reach <span className="text-red-600 font-black">thousands of donors instantly</span>
          </p>
        </div>

        {/* Success / Error Alert */}
        {msg && (
          <div className={`mb-8 p-8 rounded-3xl flex items-center gap-6 shadow-2xl text-white font-bold text-xl border-l-8 ${
            msg.type === 'success'
              ? 'bg-green-600 border-green-800'
              : 'bg-red-600 border-red-900'
          }`}>
            {msg.type === 'success' ? <CheckCircle2 className="w-16 h-16" /> : <AlertTriangle className="w-16 h-16" />}
            <div>
              <p className="text-2xl">{msg.type === 'success' ? 'ALERT SENT!' : 'FAILED!'}</p>
              <p className="text-lg mt-1">{msg.text}</p>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-red-200">
          <form onSubmit={submit} className="space-y-8">
            {/* Patient Name */}
            <div>
              <label className="flex items-center gap-3 text-2xl font-black text-red-700 mb-4">
                <User className="w-10 h-10" />
                Patient Name
              </label>
              <input
                type="text"
                required
                value={form.patientName}
                onChange={e => update('patientName', e.target.value)}
                className="w-full px-6 py-5 text-xl border-4 border-red-300 rounded-2xl focus:border-red-600 focus:ring-8 focus:ring-red-100 outline-none transition"
                placeholder="Full name of patient"
              />
            </div>

            {/* Blood Group + Units */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="flex items-center gap-3 text-2xl font-black text-red-700 mb-4">
                  <Droplet className="w-10 h-10" fill="currentColor" />
                  Required Blood Group
                </label>
                <select
                  required
                  value={form.bloodGroup}
                  onChange={e => update('bloodGroup', e.target.value)}
                  className="w-full px-6 py-5 text-xl border-4 border-red-300 rounded-2xl focus:border-red-600 focus:ring-8 focus:ring-red-100 outline-none transition"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(bg => (
                    <option key={bg} value={bg} className="text-2xl py-4">{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-3 text-2xl font-black text-red-700 mb-4">
                  <Droplet className="w-10 h-10" />
                  Units Needed
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  required
                  value={form.units}
                  onChange={e => update('units', e.target.value)}
                  className="w-full px-6 py-5 text-xl border-4 border-red-300 rounded-2xl focus:border-red-600 focus:ring-8 focus:ring-red-100 outline-none transition"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="flex items-center gap-3 text-2xl font-black text-red-700 mb-4">
                  <MapPin className="w-10 h-10" />
                  City / Area
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={e => update('city', e.target.value)}
                  className="w-full px-6 py-5 text-xl border-4 border-red-300 rounded-2xl focus:border-red-600 focus:ring-8 focus:ring-red-100 outline-none transition"
                  placeholder="e.g. Mumbai, Pune, Delhi"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 text-2xl font-black text-red-700 mb-4">
                  <Hospital className="w-10 h-10" />
                  Hospital Name
                </label>
                <input
                  type="text"
                  required
                  value={form.hospital}
                  onChange={e => update('hospital', e.target.value)}
                  className="w-full px-6 py-5 text-xl border-4 border-red-300 rounded-2xl focus:border-red-600 focus:ring-8 focus:ring-red-100 outline-none transition"
                  placeholder="e.g. Lilavati Hospital"
                />
              </div>
            </div>

            {/* Contact */}
            <div>
              <label className="flex items-center gap-3 text-2xl font-black text-red-700 mb-4">
                <PhoneCall className="w-10 h-10" />
                Contact Number (Urgent)
              </label>
              <input
                type="text"
                required
                value={form.contact}
                onChange={e => update('contact', e.target.value)}
                className="w-full px-6 py-5 text-xl border-4 border-red-300 rounded-2xl focus:border-red-600 focus:ring-8 focus:ring-red-100 outline-none transition"
                placeholder="Donors will call you directly"
              />
            </div>

            {/* EMERGENCY SUBMIT */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-black text-3xl py-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-6"
              >
                {loading ? (
                  <>Sending Alert to All Donors...</>
                ) : (
                  <>
                    <Siren className="w-12 h-12 animate-pulse" />
                    SEND EMERGENCY BLOOD ALERT NOW!
                    <Siren className="w-12 h-12 animate-pulse" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Critical Warning */}
          <div className="mt-10 p-8 bg-red-600 text-white rounded-3xl text-center font-bold text-xl">
            <PhoneCall className="w-16 h-16 mx-auto mb-4" />
            <p className="text-3xl">LIFE IN DANGER?</p>
            <p className="text-5xl mt-4">CALL 108 IMMEDIATELY</p>
            <p className="mt-4 text-lg">This portal helps find donors. For critical cases, always call ambulance first.</p>
          </div>
        </div>
      </div>
    </div>
  )
}