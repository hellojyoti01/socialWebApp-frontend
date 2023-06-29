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
import conversationService from 'src/Api/conversationService'
//Local
import { useAuth } from 'src/context/AuthProvider'
import { useFriend } from 'src/context/friendProvider'
import { usePost } from 'src/context/Postprovider'

//Lode
import { Skeleton } from '@mui/material'
function Index() {
  const [userProfile, setUserProfile] = useState(null)
  const [toastActive, setToastActive] = useState(false)
  const [friends, setFriends] = useState(null)
  const [post, setPost] = useState(null)
  const [relationShip, setRelationShip] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const authContext = useAuth()

  //Edit Profile
  const handelClick = async (e) => {
    if (e.target.innerText === 'Edit Profile') {
      navigate('/edit-profile', { state: { id: 1, user: authContext.profile } })
    }
    if (e.target.innerText === 'Add Friend' || e.target.innerText === 'Already Requested') {
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

    //! Accept Request bug
    if (e.target.innerText === 'Accept Request') {
      setToastActive(true)
      friendService
        .acceptRequest({ user_id: userProfile._id }, authContext.token)
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

    if (e.target.innerText === 'Sent Message') {
      setToastActive(true)
      conversationService
        .setConversation(
          {
            senderId: authContext.user._id,
            receiverId: userProfile._id,
          },
          authContext.token,
        )
        .then((res) => {
          setTimeout(() => {
            setToastActive(false)
          }, 2000)
          setTimeout(() => {
            navigate('/message')
          }, 1000)
        })
        .catch((e) => {
          setTimeout(() => {
            setToastActive(false)
          }, 2000)
          setTimeout(() => {
            navigate('/message')
          }, 1000)
        })
    }
  }

  //navigate

  //! Edit Post And Show Post Bug
  const handelNavigate = (e, el) => {
    e.preventDefault()
    if (userProfile._id.toString() === authContext.user._id.toString()) {
      navigate('/edit-post', { state: { id: 1, post: el, user: userProfile } })
    }
    navigate('/show-post', { state: { id: 1, post: el, user: userProfile } })
  }

  //Component Mount Function Call
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

  return (
    <div className={s.profile_panel}>
      <>
        <header>
          <div className={s.profile}>
            {userProfile ? (
              <img src={userProfile?.profile} alt="Profile Icon" />
            ) : (
              <Skeleton variant="circular" animation="wave" width={'80px'} height={'80px'} />
            )}
          </div>
          <div className={s.edit_profile}>
            <ul>
              {post ? (
                <li>
                  <strong>Posts</strong>
                  {post?.length !== 0 ? `${post?.length}` : '--'}
                </li>
              ) : (
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              )}
              {friends ? (
                <li>
                  <strong>Friends</strong> {friends.length !== 0 ? `${friends.length}` : '--'}
                </li>
              ) : (
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              )}
            </ul>
            <div className={s.actions}>
              {relationShip == 0 ||
              relationShip == 1 ||
              relationShip == -1 ||
              relationShip == 2 ||
              relationShip == 3 ? (
                <button
                  onClick={handelClick}
                  style={{
                    pointerEvents: toastActive ? 'none' : 'auto',
                  }}
                >
                  {relationShip == -1 ? 'Edit Profile' : ''}
                  {relationShip == 0 ? 'Add Friend' : ''}
                  {relationShip == 1 ? 'Already Requested' : ''}
                  {relationShip == 2 ? 'Accept Request' : ''}
                  {relationShip == 3 ? 'Sent Message' : ''}

                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              ) : (
                <Skeleton variant="rectangular" width={'190px'} height={'30px'} />
              )}
            </div>
          </div>
        </header>
        <section className={s.info}>
          <ul>
            <li>
              {' '}
              {userProfile ? (
                <span className={s.bio}>
                  {userProfile?.name ? `${authContext?.userProfile.name}` : 'Unknown'}
                </span>
              ) : (
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              )}
            </li>
            <li>
              {' '}
              {userProfile ? (
                <span className={s.bio}>{userProfile?.bio ? `${userProfile.bio}` : ''}</span>
              ) : (
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              )}
            </li>
            <li>
              {' '}
              {userProfile ? (
                <span className={s.bio}>
                  {userProfile?.dateOfBirth
                    ? `${moment(userProfile?.dateOfBirth).format('MMMM Do YYYY')}`
                    : ''}
                </span>
              ) : (
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              )}
            </li>
            <li>
              {' '}
              {userProfile ? (
                <span className={s.bio}>
                  {userProfile?.phoneNo ? `${userProfile?.phoneNo}` : ''}
                </span>
              ) : (
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              )}
            </li>
          </ul>
        </section>
        <section className={s.posts}>
          {post ? (
            <>
              {post.map((el, idx) => {
                return (
                  <div className={s.post} key={idx}>
                    <img
                      src={el.post}
                      alt={'post not Support'}
                      onClick={(e) => handelNavigate(e, el)}
                    />
                  </div>
                )
              })}
            </>
          ) : post?.length === 0 ? (
            <>
              <div className={s.not_found}>
                <div className={s.icon}>
                  <AiFillStop size={100} />
                </div>
                <p>No Post</p>
              </div>
            </>
          ) : (
            <Skeleton variant="rectangular" width={'190px'} height={'200px'} />
          )}
        </section>{' '}
        <ToastContainer />
      </>
    </div>
  )
}
export default Index
