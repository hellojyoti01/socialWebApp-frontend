//3rd Party

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment/moment'
//css
import s from './profile_pannel.module.css'

//Local
import { useAuth } from 'src/context/AuthProvider'
import { useFriend } from 'src/context/friendProvider'
import { usePost } from 'src/context/Postprovider'

function Index() {
  const navigate = useNavigate()
  const location = useLocation()
  const authContext = useAuth()
  const postContext = usePost()
  const friendContext = useFriend()

  //Edit Profile
  const handelClick = (e) => {
    if (e.target.innerText === 'Edit Profile') {
      navigate('/edit-profile', { state: { id: 1, user: authContext.profile } })
    }
  }

  //Compunent Mount Function Call
  useEffect(() => {
    if (location.state.user._id) {
      postContext.findAllPost(location.state.user._id, authContext.token)
      friendContext.findAllFriends(location.state.user._id, authContext.token)
      authContext.findOneProfile(location.state.user._id, authContext.token)
    }
  }, [location.state.user._id])
  return (
    <div className={s.profile_panel}>
      <header>
        <div className={s.profile}>
          <img
            src={
              authContext?.profile.profile
                ? `${authContext?.profile.profile}`
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtyVGp8jhiIKUZwCH5Vxr0WFnWMoWzDCShQoMLKvW9bQ&s'
            }
            alt="Profile Icon"
          />
        </div>
        <div className={s.edit_profile}>
          <ul>
            <li>
              <strong>Posts</strong>{' '}
              {postContext.post?.length !== 0 ? `${postContext.post?.length}` : '--'}
            </li>
            <li>
              <strong>Friends</strong>{' '}
              {friendContext?.friends.length !== 0 ? `${friendContext?.friends.length}` : '--'}
            </li>
          </ul>
          <div className={s.actions}>
            <button onClick={handelClick}>
              {authContext?.user?._id?.toString() === location.state?.user?._id.toString()
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
              {authContext?.profile.name ? `${authContext?.profile.name}` : 'Unknown'}
            </span>
          </li>
          <li>
            {' '}
            <span className={s.bio}>
              {authContext?.profile.bio ? `${authContext?.profile.bio}` : ''}
            </span>
          </li>
          <li>
            {' '}
            <span className={s.bio}>
              {authContext?.profile?.dateOfBirth
                ? `${moment(authContext?.profile?.dateOfBirth).format('MMMM Do YYYY')}`
                : ''}
            </span>
          </li>
          <li>
            {' '}
            <span className={s.bio}>
              {authContext?.profile?.phoneNo ? `${authContext?.profile?.phoneNo}` : ''}
            </span>
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
