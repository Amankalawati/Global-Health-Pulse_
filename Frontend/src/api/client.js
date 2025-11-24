import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

export const setToken = (token) => {
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete client.defaults.headers.common['Authorization']
  }
}

export default client
