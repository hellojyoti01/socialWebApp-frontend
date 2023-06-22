//3rd Party

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment/moment'

import { toast, ToastContainer } from 'react-toastify'
import { CSpinner } from '@coreui/react'
//icons
import { AiFillStop } from 'react-icons/ai'
//css
import s from './profile_pannel.module.css'

// Api
import friendService from 'src/Api/friendServices'
import authService from 'src/Api/authService'
import postService from 'src/Api/postService'
//Local
import { useAuth } from 'src/context/AuthProvider'
import { useFriend } from 'src/context/friendProvider'
import { usePost } from 'src/context/Postprovider'

function Index() {
  const [userProfile, setUserProfile] = useState(null)
  const [toastActive, setToastActive] = useState(false)
  const [friends, setFriends] = useState(null)
  const [post, setPost] = useState(null)
  const [relationShip, setRelationShip] = useState(null)

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

      friendContext.friends.find((el) => {
        return el._id.toString() === location.state.user._id
      })
    }
  }, [location.state.user._id])

  useEffect(() => {
    if (location.state.user._id && authContext.token) {
      authContext.findOneProfile(location.state.user._id, authContext.token)

      // find user Profile
      async function findUserProfile(param, token) {
        authService
          .findOneProfile({ _id: param }, token)
          .then((res) => {
            setUserProfile(res.data)
          })
          .catch((e) => {
            setUserProfile(null)
          })
      }

      //find user post
      async function findAllPostSingleUser(posted_by, token) {
        postService
          .findAllPostSingleUser({ posted_by: posted_by }, token)
          .then((res) => {
            setPost([...res.data])
          })
          .catch((e) => {
            console.log('Error In Profile fun', e)
          })
      }

      async function findAllFriend(param, token) {
        friendService
          .totalFriend({ user_id: param }, token)
          .then((res) => {
            setFriends([...res.data])
          })
          .catch((e) => {
            setFriends(null)
            console.log('Error In Profile fun', e)
          })
      }

      async function checkRelationShipStatus(param, token) {
        friendService
          .checkRelationShipStatus({ user_id: param }, token)
          .then((res) => {
            setRelationShip(res.data)
          })
          .catch((e) => {
            console.log('Error In Profile fun', e)
          })
      }
      findUserProfile(location.state.user._id, authContext.token)
      findAllPostSingleUser(location.state.user._id, authContext.token)
      findAllFriend(location.state.user._id, authContext.token)
      checkRelationShipStatus(location.state.user._id, authContext.token)
    }
  }, [location.state.user._id])
  console.log(relationShip, 'relation ship')
  return (
    <div className={s.profile_panel}>
      {relationShip && userProfile && friends && post ? (
        <>
          <header>
            <div className={s.profile}>
              <img
                src={
                  userProfile?.profile
                    ? `${userProfile.profile}`
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtyVGp8jhiIKUZwCH5Vxr0WFnWMoWzDCShQoMLKvW9bQ&s'
                }
                alt="Profile Icon"
              />
            </div>
            <div className={s.edit_profile}>
              <ul>
                <li>
                  <strong>Posts</strong> {post && post?.length !== 0 ? `${post?.length}` : '--'}
                </li>
                <li>
                  <strong>Friends</strong>{' '}
                  {friends && friends.length !== 0 ? `${friends.length}` : '--'}
                </li>
              </ul>
              <div className={s.actions}>
                <button
                  onClick={handelClick}
                  style={{
                    pointerEvents: toastActive ? 'none' : 'auto',
                  }}
                >
                  {relationShip == -1 ? 'Edit Profile' : ''}
                  {relationShip == 0 ? 'Add Friend' : ''}
                  {relationShip == 1 ? '': ''}
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
                  {userProfile?.name ? `${authContext?.userProfile.name}` : 'Unknown'}
                </span>
              </li>
              <li>
                {' '}
                <span className={s.bio}>{userProfile?.bio ? `${userProfile.bio}` : ''}</span>
              </li>
              <li>
                {' '}
                <span className={s.bio}>
                  {userProfile?.dateOfBirth
                    ? `${moment(userProfile?.dateOfBirth).format('MMMM Do YYYY')}`
                    : ''}
                </span>
              </li>
              <li>
                {' '}
                <span className={s.bio}>
                  {userProfile?.phoneNo ? `${userProfile?.phoneNo}` : ''}
                </span>
              </li>
            </ul>
          </section>
          <section className={s.posts}>
            {post && post.length !== 0 ? (
              post.map((el, idx) => {
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
                <p>No Post</p>
              </div>
            )}
          </section>{' '}
          <ToastContainer />
        </>
      ) : (
        <CSpinner />
      )}
    </div>
  )
}
export default Index
