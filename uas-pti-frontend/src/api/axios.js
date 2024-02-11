import axios from 'axios'

export default axios.create({
  // baseURL: "https://gentle-gainful-tin.glitch.me",
  baseURL: 'http://localhost:4173',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
