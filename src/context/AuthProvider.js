//3rd party Api
import React, { useState, useEffect, createContext, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import authService from 'src/Api/authService'

//socket
import { io } from 'socket.io-client'
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

  const socket = useRef()
  //User Object
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState({})
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

  // //Find One Profile Of Any User
  function findOneProfile(param, token) {
    try {
      authService
        .findOneProfile({ _id: param }, token)
        .then((res) => {
          setUserProfile(res.data)
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

  // socket connection when user log in
  useEffect(() => {
    if (user) {
      socket.current = io('ws://localhost:6050')
    }
  }, [user])

  //get all connected socket user
  useEffect(() => {
    if (socket.current) {
      console.log('A user Log In')
      socket.current.emit('add_user', user)
      socket.current?.on('get_user', (message) => {
        console.log(message, 'socket user')
      })
    }
  }, [socket.current])

  const value = { user, setToken, token, findOneProfile, userProfile, socket }
  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

const useAuth = () => {
  const auth = useContext(authContext)
  return auth
}

export default Provider
export { useAuth }
