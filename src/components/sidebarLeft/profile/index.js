//3rd party
import React, { useState, useEffect } from 'react'
import { CAvatar } from '@coreui/react'
//css
import s from './profile.module.css'
//assets
import { avatar } from 'src/assets'
import { useAuth } from 'src/context/AuthProvider'
import { useFriend } from 'src/context/friendProvider'
import { usePost } from 'src/context/Postprovider'
import { Link } from 'react-router-dom'

export default function Profile(...props) {
  const authContext = useAuth()
  const postContext = usePost()
  const friendContext = useFriend()

  useEffect(() => {
    if (authContext.token) {
      postContext.findAllPost(authContext.user._id, authContext.token)
      friendContext.findAllFriends(authContext.token)
    }
  }, [authContext.token])

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {/* ---Profile Icon----- */}
        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <CAvatar
            src={authContext.user?.profile ? authContext.user.profile : avatar}
            status="success"
            size="xl"
          />
        </Link>
        {/* ---Address Start----- */}
        <div className={s.profile_info}>
          <h4>{authContext.user?.name ? authContext.user.name : '--'} </h4>
          <p>{authContext.user?.address ? authContext.user.address : 'Kolkata, NewTown , India'}</p>
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
            <span>{postContext.post.length !== 0 ? `${postContext.post.length}` : '--'}</span>
            <span>Posts</span>
          </div>
        </div>
        {/* ---Friends End----- */}
      </div>
    </div>
  )
}
