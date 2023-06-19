//3rd Party

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment/moment'

import { toast, ToastContainer } from 'react-toastify'
//icons
import { AiFillStop } from 'react-icons/ai'
//css
import s from './profile_pannel.module.css'
import friendService from 'src/Api/friendServices'

//Local
import { useAuth } from 'src/context/AuthProvider'
import { useFriend } from 'src/context/friendProvider'
import { usePost } from 'src/context/Postprovider'

function Index() {
  const [userProfile, setUserProfile] = useState({})
  const [toastActive, setToastActive] = useState(false)
  const [friend, SetFriend] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const authContext = useAuth()
  const postContext = usePost()
  const friendContext = useFriend()

  //Edit Profile
  const handelClick = async (e) => {
    if (e.target.innerText === 'Edit Profile') {
      navigate('/edit-profile', { state: { id: 1, user: authContext.profile } })
    }
    if (e.target.innerText === 'Send Request') {
      setToastActive(true)
      // Response
      friendService
        .sendRequest({ user_id: location.state.user._id }, authContext.token)
        .then((res) => {
          toast.success(res.message, {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setTimeout(() => {
            setToastActive(false)
          }, 3000)
          setTimeout(() => {
            navigate('/')
          }, 1000)
        })
        .catch((e) => {
          const { data } = e.response
          toast.warning(data.message, {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setTimeout(() => {
            setToastActive(false)
          }, 3000)
        })
    }
  }

  //navigate
  const handelNavigate = (e, el) => {
    e.preventDefault()
    navigate('/edit-post', { state: { id: 1, post: el } })
  }
  //Component Mount Function Call

  useEffect(() => {
    if (location.state.user._id) {
      postContext.findAllPostSingleUser(location.state.user._id, authContext.token)
      friendContext.findAllFriends(location.state.user._id, authContext.token)
      authContext.findOneProfile(location.state.user._id, authContext.token)

      const friend = friendContext.friends.find((el) => {
        return el._id.toString() === location.state.user._id
      })
      SetFriend(friend)
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
            <button
              onClick={handelClick}
              style={{
                pointerEvents: toastActive ? 'none' : 'auto',
              }}
            >
              {authContext?.user?._id?.toString() === location.state?.user?._id.toString()
                ? 'Edit Profile'
                : friend?._id
                ? 'Send Message'
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
        {postContext.post.length !== 0 ? (
          postContext.post.map((el, idx) => {
            return (
              <div className={s.post} key={idx}>
                <img
                  src={el.post}
                  alt={'post not Support'}
                  onClick={(e) => handelNavigate(e, el)}
                />
              </div>
            )
          })
        ) : (
          <div className={s.not_found}>
            <div className={s.icon}>
              <AiFillStop size={100} />
            </div>
            <h1>404</h1>
            <p>Post Not Found Created Now !</p>
          </div>
        )}
      </section>{' '}
      <ToastContainer />
    </div>
  )
}
export default Index
