import React, { useState } from 'react'
import { registerDonor } from '../../api/healthApi'
import { Heart, Droplet, Calendar, MapPin, User, Phone, CheckCircle2, AlertCircle } from 'lucide-react'

export default function DonorRegister() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    bloodGroup: '',
    city: '',
    lastDonation: ''
  })
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const submit = async (e) => {
uchere.preventDefault()
    setLoading(true)
    setMsg(null)

    try {
      await registerDonor(form)
      setMsg({ type: 'success', text: 'Thank you, Hero! Your details have been saved. You can now save lives!' })
      setForm({ name: '', contact: '', bloodGroup: '', city: '', lastDonation: '' })
    } catch (err) {
      setMsg({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-4 bg-red-100 text-red-700 px-8 py-4 rounded-full text-2xl font-bold mb-6 shadow-lg animate-pulse">
            <Heart className="w-10 h-10" fill="currentColor" />
            Be Someone's Miracle Today
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Register as a <span className="text-red-600">Blood Donor</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-xl mx-auto">
            One donation can save up to <strong>3 lives</strong>. Join 48,000+ heroes across India.
          </p>
        </div>

        {/* Success/Error Message */}
        {msg && (
          <div className={`mb-8 p-6 rounded-2xl flex items-center gap-4 shadow-lg border-l-8 ${
            msg.type === 'success' 
              ? 'bg-green-50 text-green-800 border-green-500' 
              : 'bg-red-50 text-red-800 border-red-500'
          }`}>
            {msg.type === 'success' ? <CheckCircle2 className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
            <div>
              <p className="font-bold text-lg">{msg.type === 'success' ? 'Thank You!' : 'Oops!'}</p>
              <p className="text-base">{msg.text}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-red-100">
          <form onSubmit={submit} className="space-y-8">
            {/* Name */}
            <div className="relative">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <User className="w-6 h-6 text-red-600" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => update('name', e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition"
                placeholder="Enter your full name"
              />
            </div>

            {/* Contact */}
            <div className="relative">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <Phone className="w-6 h-6 text-red-600" />
                Phone or Email
              </label>
              <input
                type="text"
                required
                value={form.contact}
                onChange={e => update('contact', e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition"
                placeholder="We'll contact you when needed"
              />
            </div>

            {/* Blood Group & City */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <Droplet className="w-6 h-6 text-red-600" fill="currentColor" />
                  Blood Group
                </label>
                <select
                  required
                  value={form.bloodGroup}
                  onChange={e => update('bloodGroup', e.target.value)}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition"
                >
                  <option value="">Choose your blood group</option>
                  {bloodGroups.map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <MapPin className="w-6 h-6 text-red-600" />
                  City / Area
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => update('city', e.target.value)}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition"
                  placeholder="e.g. Mumbai, Delhi, Bangalore"
                />
              </div>
            </div>

            {/* Last Donation */}
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                <Calendar className="w-6 h-6 text-red-600" />
                Last Donation Date <span className="text-sm font-normal text-gray-500">(optional)</span>
              </label>
              <input
                type="date"
                value={form.lastDonation}
                onChange={e => update('lastDonation', e.target.value)}
                className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl py-5 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
              >
                {loading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Heart className="w-7 h-7" fill="white" />
                    Yes, I Want to Save Lives!
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setForm({ name: '', contact: '', bloodGroup: '', city: '', lastDonation: '' })}
                className="px-8 py-5 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-red-500 hover:text-red-600 transition"
              >
                Clear Form
              </button>
            </div>
          </form>

          {/* Trust Badges */}
          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">Your information is 100% secure and only used for emergency blood requests.</p>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <span>SSL Secured</span>
              <span>Verified Donors Only</span>
              <span>No Spam Ever</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}