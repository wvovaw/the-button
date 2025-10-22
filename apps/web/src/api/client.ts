import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user-profile')

      window.location.href = '/signin?error=session_expired'
    }

    return Promise.reject(error)
  },
)

export default client
