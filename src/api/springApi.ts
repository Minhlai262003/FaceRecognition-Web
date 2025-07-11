import axios from 'axios'

const springApi = axios.create({
  baseURL: import.meta.env.VITE_SPRING_API_BASE_URL,
})

export default springApi
