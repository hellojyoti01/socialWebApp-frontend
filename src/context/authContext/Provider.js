import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Provider({ children }) {
  const [token, setToken] = useState(() => {
    let token = localStorage.getItem('SocialWeb_Token')

    if (token) {
      axios.defaults.headers.common['Authorization'] = token
      return token
    }
  })
  const navigate = useNavigate()
  function whoAmI() {
    console.log('WhoAmI')
  }
  useEffect(() => {
    if (!token) return navigate('/register')
    whoAmI()

    console.log('Function Call ')
  }, [])
  return <div>{children}</div>
}

export default Provider
