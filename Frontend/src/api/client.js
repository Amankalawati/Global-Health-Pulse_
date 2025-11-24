// src/api/client.js   ← FINAL VERSION (NO MORE ERRORS)
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
})

// Optional: token function (most projects use this)
export const setToken = (token) => {
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete client.defaults.headers.common['Authorization']
  }
}

export default client