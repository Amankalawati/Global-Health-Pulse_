// src/pages/Dashboard.jsx
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-indigo-700 mb-4">
            Welcome back, {user?.name || "Hero"}!
          </h1>
          <p className="text-xl text-gray-600">Your health & donation dashboard</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Link to="/blood" className="bg-red-500 text-white p-8 rounded-2xl text-center hover:scale-105 transition shadow-lg">
            <div className="text-6xl mb-4">Heart</div>
            <h3 className="text-2xl font-bold">Blood Bank</h3>
          </Link>
          <Link to="/blood/find" className="bg-green-500 text-white p-8 rounded-2xl text-center hover:scale-105 transition shadow-lg">
            <div className="text-6xl mb-4">Search</div>
            <h3 className="text-2xl font-bold">Find Donor</h3>
          </Link>
          <Link to="/tools" className="bg-purple-500 text-white p-8 rounded-2xl text-center hover:scale-105 transition shadow-lg">
            <div className="text-6xl mb-4">Tools</div>
            <h3 className="text-2xl font-bold">Health Tools</h3>
          </Link>
        </div>

        <button
          onClick={logout}
          className="mt-12 bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-black transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}