// backend/server.js  ← YOUR FULL BACKEND IS BACK
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// ————— FAKE DATA UNTIL YOU CONNECT FIREBASE AGAIN —————
const fakeStock = [
  { center: "AIIMS Delhi", bloodGroup: "O+", units: 48, city: "New Delhi", contact: "011-26588500" },
  { center: "Lilavati Hospital", bloodGroup: "A+", units: 15, city: "Mumbai", contact: "022-26751000" },
  { center: "Fortis Bangalore", bloodGroup: "B+", units: 8, city: "Bangalore", contact: "080-66214444" },
  { center: "Apollo Chennai", bloodGroup: "O-", units: 0, city: "Chennai", contact: "044-28290200" },
  { center: "Max Hospital Saket", bloodGroup: "AB+", units: 22, city: "Delhi", contact: "011-40554055" },
  { center: "Safdarjung Hospital", bloodGroup: "A-", units: 5, city: "Delhi", contact: "011-26165060" }
]

// All your routes — exactly like before
app.get('/blood/stock', (req, res) => res.json(fakeStock))

app.post('/blood/donors', (req, res) => {
  console.log('New donor:', req.body)
  res.json({ success: true, message: 'Donor registered' })
})

app.post('/blood/requests', (req, res) => {
  console.log('New request:', req.body)
  res.json({ success: true, message: 'Request created' })
})

app.post('/register', (req, res) => res.json({ success: true }))
app.post('/login', (req, res) => res.json({ success: true, user: { name: req.body.email } }))

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Backend LIVE → http://localhost:${PORT}`)
  console.log(`Open your app → data will appear instantly`)
})

app.get('/blood/donors', (req, res) => {
  const fakeDonors = [
    { name: "Rahul Sharma", bloodGroup: "O+", contact: "+919876543210", city: "Delhi" },
    { name: "Priya Singh", bloodGroup: "A+", contact: "+918765432109", city: "Mumbai" },
    { name: "Amit Kumar", bloodGroup: "B+", contact: "+919900112233", city: "Bangalore" }
  ]
  res.json(fakeDonors)
})