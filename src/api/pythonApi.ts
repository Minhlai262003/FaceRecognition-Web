import axios from 'axios'

const pythonApi = axios.create({
  baseURL: import.meta.env.VITE_PYTHON_API_BASE_URL,
})

export default pythonApi
