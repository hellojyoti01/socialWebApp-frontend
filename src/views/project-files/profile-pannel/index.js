import React, { useState, useEffect } from 'react'
import { CAvatar } from '@coreui/react'
import s from './profile_pannel.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from 'src/context/AuthProvider'
import { useFriend } from 'src/context/friendProvider'
import { usePost } from 'src/context/Postprovider'
function Index() {
  const navigate = useNavigate()
  const location = useLocation()
  const authContext = useAuth()
  const postContext = usePost()
  const friendContext = useFriend()
  console.log(friendContext, 'friend')
  const handelClick = (e) => {
    if (e.target.innerText === 'Edit Profile') {
      navigate('/edit-profile', { state: { id: 1, user: location.state.user } })
    }
  }

  useEffect(() => {
    if (location.state.user._id) {
      postContext.findAllPost(location.state.user._id, authContext.token)
      friendContext.findAllFriends(location.state.user._id, authContext.token)
    }
  }, [location.state.user._id])
  return (
    <div className={s.profile_panel}>
      <header>
        <div className={s.profile}>
          <img
            src={
              location?.state.user?.profile
                ? `${location.state.user.profile}`
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtyVGp8jhiIKUZwCH5Vxr0WFnWMoWzDCShQoMLKvW9bQ&s'
            }
            alt="Profile Icon"
          />
        </div>
        <div className={s.edit_profile}>
          <ul>
            <li>
              <strong>Posts</strong>{' '}
              {postContext.post.length !== 0 ? `${postContext.post.length}` : '--'}
            </li>
            <li>
              <strong>Friends</strong>{' '}
              {friendContext.friends.length !== 0 ? `${friendContext.friends.length}` : '--'}
            </li>
          </ul>
          <div className={s.actions}>
            <button onClick={handelClick}>
              {authContext.user._id.toString() === location.state.user._id.toString()
                ? 'Edit Profile'
                : 'Send Request'}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <section className={s.info}>
        <ul>
          <li>
            {' '}
            <span className={s.bio}>
              {location?.state.user?.name ? `${location.state.user.name}` : 'Unknown'}
            </span>
          </li>
          <li>
            {' '}
            <span className={s.bio}>Look around and build something that the world wants</span>
          </li>
          <li>
            {' '}
            <span className={s.bio}>Dob : 010211</span>
          </li>
        </ul>
      </section>
      <section className={s.posts}>
        {postContext.post.length !== 0
          ? postContext.post.map((el, idx) => {
              return (
                <div className={s.post} key={idx}>
                  <img src={el.post} alt={'post not Support'} />
                </div>
              )
            })
          : 'No Post Plz Create Fast Post'}
      </section>{' '}
    </div>
  )
}

export default Index
