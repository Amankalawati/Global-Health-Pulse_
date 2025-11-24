// src/components/ProtectedRoute.jsx
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth()

  // This is the KEY line — wait until Firebase finishes checking
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-3xl font-bold text-blue-600">Loading...</div>
      </div>
    )
  }

  // Now it's safe to check
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}