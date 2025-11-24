// src/components/Navbar.jsx
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { currentUser, userData, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-5 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-black">Global Health Pulse</Link>

        {currentUser ? (
          <div className="flex items-center gap-6">
            <span className="text-xl">Welcome, <strong>{userData?.name || currentUser.email}</strong></span>
            <button
              onClick={handleLogout}
              className="bg-red-rose-600 hover:bg-rose-700 px-6 py-3 rounded-xl font-bold transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold">Login</Link>
        )}
      </div>
    </div>
  )
}