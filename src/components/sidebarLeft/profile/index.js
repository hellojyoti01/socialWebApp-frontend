//3rd party
import React, { useEffect } from 'react'
import { CAvatar } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//css
import s from './profile.module.css'

//Local

import { fetchAllPostCurrentUser } from 'src/redux/postSlice'
//assets
import { avatar } from 'src/assets'
import { useAuth } from 'src/context/AuthProvider'
import { useFriend } from 'src/context/friendProvider'

export default function Profile(...props) {
  //redux
  const store = useSelector((store) => store)
  const { currentUserPost } = store.postReducer

  const authContext = useAuth()
  const friendContext = useFriend()
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (authContext.token && authContext.user?._id) {
      dispatch(
        fetchAllPostCurrentUser({
          id: authContext.user._id,
          token: authContext.token,
        }),
      )
    }
  }, [authContext.token, authContext.user])

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {/* ---Profile Icon----- */}

        <CAvatar
          src={authContext.user?.profile ? authContext.user.profile : avatar}
          status="success"
          size="xl"
          onClick={() => {
            navigate('/profile', { state: { id: 1, user: authContext.user } })
          }}
        />

        {/* ---Address Start----- */}
        <div className={s.profile_info}>
          <h4>{authContext.user?.name ? authContext.user.name : '--'} </h4>
          <p>{authContext.user?.address ? authContext.user.address : '__, __ , __'}</p>
        </div>
        {/* ---Address End----- */}

        {/* ---Friends Start----- */}
        <div className={s.followers}>
          <div className={s.friends}>
            <span>
              {friendContext.friends.length !== 0 ? `${friendContext.friends.length}` : '--'}
            </span>
            <span>friends</span>
          </div>
          <div className={s.posts}>
            <span>{currentUserPost.length !== 0 ? `${currentUserPost.length}` : '--'}</span>
            <span>Posts</span>
          </div>
        </div>
        {/* ---Friends End----- */}
      </div>
    </div>
  )
}
