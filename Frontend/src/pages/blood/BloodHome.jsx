// src/pages/blood/BloodHome.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Droplet, Users, Siren, PhoneCall, MapPin } from 'lucide-react'

export default function BloodHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-red-100 text-red-700 px-6 py-3 rounded-full text-lg font-bold mb-6 animate-pulse">
          <Heart className="w-7 h-7" fill="currentColor" />
          Every Drop Saves a Life
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
          Blood Donation & Request Portal
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect donors with patients in real-time. Be a hero – donate blood or find help instantly across India.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
        {[
          { label: "Active Donors", value: "48,291+", icon: Users, color: "text-blue-600" },
          { label: "Lives Saved", value: "1.2M+", icon: Heart, color: "text-red-600" },
          { label: "Requests Today", value: "892", icon: Droplet, color: "text-orange-600" },
          { label: "Emergency Alerts", value: "Live", icon: Siren, color: "text-purple-600" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition">
            <stat.icon className={`w-12 h-12 mx-auto mb-3 ${stat.color}`} />
            <div className="text-3xl font-black text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Action Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 mb-16">
        {/* Donate Card */}
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 to-red-600 text-white p-10 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="absolute top-0 right-0 opacity-20">
            <Droplet className="w-64 h-64" fill="white" />
          </div>
          <Heart className="w-20 h-20 mb-6" fill="white" />
          <h2 className="text-4xl font-black mb-4">Become a Donor</h2>
          <p className="text-lg opacity-90 mb-8">
            One donation can save up to 3 lives. Register now and help someone breathe tomorrow.
          </p>
          <Link
            to="/blood/register"
            className="inline-flex items-center gap-3 bg-white text-red-600 px-8 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Register as Donor
            <span className="ml-2">Go</span>
          </Link>
          <div className="mt-6 text-sm opacity-80">
            Free health checkup • Certificate • Be a hero
          </div>
        </div>

        {/* Request Card */}
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 text-white p-10 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="absolute top-0 right-0 opacity-20">
            <Siren className="w-64 h-64" />
          </div>
          <Siren className="w-20 h-20 mb-6 animate-pulse" />
          <h2 className="text-4xl font-black mb-4">Need Blood Urgently?</h2>
          <p className="text-lg opacity-90 mb-8">
            Post a request and get connected with nearby donors within minutes.
          </p>
          <Link
            to="/blood/request"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Request Blood Now
            <span className="ml-2">Lightning</span>
          </Link>
          <div className="mt-6 text-sm opacity-80">
            Real-time alerts • Verified donors • Instant matching
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="max-w-4xl mx-auto bg-red-600 text-white rounded-3xl p-8 text-center shadow-2xl">
        <PhoneCall className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-3xl font-black mb-3">Life-Threatening Emergency?</h3>
        <p className="text-xl mb-6">
          Call <span className="font-black text-4xl">108</span> or <span className="font-black text-4xl">102</span> immediately
        </p>
        <p className="text-lg opacity-90">
          This portal connects donors. For critical cases, always contact ambulance services first.
        </p>
      </div>

      {/* Quick Links */}
      <div className="mt-16 text-center">
        <div className="inline-flex flex-wrap gap-6 justify-center">
          {[
            { to: "/blood/stock", label: "Check Blood Stock", icon: Droplet },
            { to: "/blood/find", label: "Find Donor Near Me", icon: MapPin },
            { to: "/blood/register", label: "My Donation History", icon: Users }
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 bg-white border-2 border-gray-200 px-8 py-5 rounded-2xl font-semibold text-lg hover:border-red-500 hover:shadow-xl transition-all"
            >
              <link.icon className="w-7 h-7 text-red-600" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}