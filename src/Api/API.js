import axios from 'axios'

export default axios.create({
  baseURL: `http://localhost:6050/api/v1`, //local
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000', // Replace with your React app's origin
  },
})
