//3rd Party

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment'
import { useDispatch } from 'react-redux'

import { toast, ToastContainer } from 'react-toastify'
import { CSpinner } from '@coreui/react'
//icons
import { AiFillStop } from 'react-icons/ai'
import { GrContactInfo } from 'react-icons/gr'
//css
import s from './profile_pannel.module.css'

// Api
import friendService from 'src/Api/friendServices'
import authService from 'src/Api/authService'
import postService from 'src/Api/postService'
import conversationService from 'src/Api/conversationService'
//Local
import { useAuth } from 'src/context/AuthProvider'
import { fetchAllSentRequests, fetchAllFriends } from 'src/redux/friendSlice'

//Lode
import { Skeleton } from '@mui/material'
function Index() {
  const [user, setUser] = useState(null)
  const [age, setAge] = useState('')
  const [toastActive, setToastActive] = useState(false)
  const [friends, setFriends] = useState(null)
  const [post, setPost] = useState(null)
  const [relationShip, setRelationShip] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const authContext = useAuth()
  const dispatch = useDispatch()

  //Edit Profile
  const handelClick = async (e) => {
    if (relationShip == -1) {
      navigate('/edit-profile', { state: { id: 1, user: user } })
    }
    if (relationShip == 0 || relationShip == 1) {
      setToastActive(true)
      // Response
      friendService
        .sendRequest({ user_id: location.state.user._id }, authContext.token)
        .then((res) => {
          //Updated Send Request
          dispatch(fetchAllSentRequests({ page: 1, token: authContext.token }))
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
          console.log(e, 'Error In Profile Page ')
          toast.warning('Some Error Occored In Server !', {
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
    if (relationShip == 2) {
      setToastActive(true)
      friendService
        .acceptRequest({ user_id: user._id }, authContext.token)
        .then((res) => {
          dispatch(fetchAllFriends({ id: authContext.user._id, page: 1, token: authContext.token }))
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

    if (relationShip == 3) {
      setToastActive(true)
      conversationService
        .setConversation(
          {
            senderId: authContext.user._id,
            receiverId: user._id,
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

    navigate('/show-post', { state: { id: 1, post: el, user: user } })
  }

  // Function for Calculate Age

  function calculateAge(dateOfBirth) {
    return new Promise((reslove, reject) => {
      try {
        const currentDate = moment()
        const birthDate = moment(dateOfBirth, 'YYYY-MM-DD')
        const age = currentDate.diff(birthDate, 'years')
        if (age) {
          reslove(age)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  //Component Mount Function Call
  useEffect(() => {
    if (location.state.user._id && authContext.token) {
      // find user Profile
      async function findUserProfile(param, token) {
        authService
          .findOneProfile({ _id: param }, token)
          .then((res) => {
            if (res.data?.dateOfBirth) {
              calculateAge(res.data.dateOfBirth)
                .then((res) => {
                  setAge(res)
                })
                .catch((err) => {
                  console.log(err)
                })
            }
            setUser(res.data)
          })
          .catch((e) => {
            setUser(null)
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
          .findAllFriend({ user_id: param }, token)
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
        {/*  ------------- Profile Avtar and Action Type------------------------------------ */}
        <header>
          <div className={s.profile}>
            {user ? (
              <img src={user?.profile} alt="Profile Icon" />
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
                <li>
                  {' '}
                  <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40px' }} />
                </li>
              )}
              {friends ? (
                <li>
                  <strong>Friends</strong> {friends.length !== 0 ? `${friends.length}` : '--'}
                </li>
              ) : (
                <li>
                  {' '}
                  <Skeleton variant="text" sx={{ fontSize: '1rem', width: '40px' }} />
                </li>
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
        {/*  ------------- profile Info------------------------------------ */}
        <section className={s.info}>
          {user ? (
            <>
              <ul>
                <li
                  style={{
                    display: user?.name ? 'block' : 'none',
                  }}
                >
                  <span className={s.bio}>
                    {user?.name ? (
                      <>
                        <GrContactInfo size={'20px'} />
                        <span className={s.user_bio_info}> {user.name}</span>
                      </>
                    ) : (
                      ''
                    )}
                  </span>
                </li>
                <li
                  style={{
                    display: user?.name ? 'block' : 'none',
                  }}
                >
                  {' '}
                  <span className={s.bio}>
                    {user?.bio ? (
                      <>
                        <GrContactInfo size={'20px'} />
                        <span className={s.user_bio_info}> {user.bio}</span>
                      </>
                    ) : (
                      ''
                    )}
                  </span>
                </li>
                <li
                  style={{
                    display: user?.name ? 'block' : 'none',
                  }}
                >
                  <span className={s.bio}>
                    {user?.dateOfBirth && age > 0 ? (
                      <>
                        <GrContactInfo size={'20px'} />
                        <span className={s.user_bio_info}> {`${age} Years Old`}</span>
                      </>
                    ) : (
                      ''
                    )}
                  </span>
                </li>
                <li
                  style={{
                    display: user?.name ? 'block' : 'none',
                  }}
                >
                  <span className={s.bio}>
                    {user?.address ? (
                      <>
                        <GrContactInfo size={'20px'} />
                        <span className={s.user_bio_info}>{user.address}</span>
                      </>
                    ) : (
                      ''
                    )}
                  </span>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul>
                {[1, 2, 3, 4].map((el, idx) => (
                  <Skeleton key={idx} variant="text" sx={{ fontSize: '1rem' }} />
                ))}
              </ul>
            </>
          )}
        </section>
        {/* /* -------------Post Section------------------------------------ */}
        <section className={s.posts}>
          {post ? (
            <>
              {post.length >= 1 ? (
                <>
                  {' '}
                  {post.map((el, idx) => {
                    return (
                      <div className={s.post} key={idx}>
                        <img
                          src={el.media[0]}
                          alt={'post not Support'}
                          onClick={(e) => handelNavigate(e, el)}
                        />
                      </div>
                    )
                  })}
                </>
              ) : (
                <>
                  <section className={s.page_404}>
                    <div className={s.page_404_container}>
                      <div className={s.row}>
                        <div className="col-sm-12 ">
                          <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className={s.four_zero_four_bg}>
                              <h1 className="text-center "></h1>
                            </div>

                            <div className={s.contant_box_404}>
                              <h3 className="h2">No Post Exist In Your Profile</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5, 6].map((el, idx) => (
                <div className={s.post} key={idx}>
                  <Skeleton variant="rectangular" width={'190px'} height={'200px'} />
                </div>
              ))}
            </>
          )}
        </section>{' '}
        <ToastContainer />
      </>
    </div>
  )
}
export default Index
