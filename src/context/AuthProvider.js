//3rd party Api
import React, { useState, useEffect, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import authService from 'src/Api/authService'
//context create
const authContext = createContext(null)

function Provider({ children }) {
  //Token Get From Local Storage
  const [token, setToken] = useState(() => {
    let token = localStorage.getItem('SocialWeb_Token')

    if (token) {
      axios.defaults.headers.common['Authorization'] = token
      return token
    }
  })
  //User Object
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({})
  const navigate = useNavigate()

  //Current User Info
  function whoAmI() {
    try {
      authService
        .WhoAmI(token)
        .then((res) => {
          setUser(res.data)
          navigate('/')
        })
        .catch((e) => {
          navigate('/login')
        })
    } catch (e) {
      navigate('/login')
    }
  }

  //Find One Profile Of Any User
  function findOneProfile(param, token) {
    try {
      authService
        .findOneProfile({ _id: param }, token)
        .then((res) => {
          setProfile(res.data)
        })
        .catch((e) => {
          console.log('Some Error In FindAll')
        })
    } catch (e) {}
  }

  useEffect(() => {
    if (!token) return navigate('/register')
    whoAmI()
  }, [token])

  const value = { user, setToken, token, findOneProfile, profile }
  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

const useAuth = () => {
  const auth = useContext(authContext)
  return auth
}

export default Provider
export { useAuth }
