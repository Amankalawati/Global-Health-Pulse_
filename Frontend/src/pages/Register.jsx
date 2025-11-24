// src/pages/Register.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { auth, db } from '../firebase'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      // 1. Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // 2. Save full profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        bloodGroup,
        city,
        createdAt: new Date().toISOString(),
        uid: user.uid
      })

      alert("Account created & profile saved!")
      navigate('/tools')
    } catch (err) {
      setError(err.message.includes("email-already") ? "Email already in use" : "Registration failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center pt-20 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">
        <h2 className="text-4xl font-black text-center mb-8">Create Account</h2>
        {error && <p className="text-red-600 text-center font-bold bg-red-50 p-4 rounded-xl mb-6">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required className="w-full p-4 rounded-xl border-2" />
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full p-4 rounded-xl border-2" />
          <input type="password" placeholder="Password (6+ chars)" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full p-4 rounded-xl border-2" />
          <input placeholder="Phone (optional)" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full p-4 rounded-xl border-2" />
          <select value={bloodGroup} onChange={e=>setBloodGroup(e.target.value)} className="w-full p-4 rounded-xl border-2">
            <option value="">Blood Group (optional)</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => <option key={g}>{g}</option>)}
          </select>
          <input placeholder="City" value={city} onChange={e=>setCity(e.target.value)} className="w-full p-4 rounded-xl border-2" />

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-5 rounded-xl shadow-lg transition transform hover:scale-105">
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}