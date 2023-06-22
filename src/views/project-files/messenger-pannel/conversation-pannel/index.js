import { useState, useEffect } from 'react'
import React from 'react'
import s from './conversation.module.css'
import { useAuth } from 'src/context/AuthProvider'
import authService from 'src/Api/authService'
function Index({ conversation, currentUser }) {
  const [user, setUser] = useState({})
  const authContext = useAuth()
  useEffect(() => {
    const friendIdx = conversation.members.find(
      (el) => el.toString() !== currentUser._id.toString(),
    )

    async function getUser() {
      authService
        .findOneProfile({ _id: friendIdx }, authContext.token)
        .then((res) => {
          setUser(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
    getUser()
  }, [conversation, currentUser])

  return (
    <div>
      <div className={`${s.user}`}>
        <img src={user.profile} alt="User 1 Avatar" className={s.avatar} />
        <h3 className={s.username}>{user.name}</h3>
      </div>
    </div>
  )
}

export default Index
