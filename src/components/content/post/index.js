//3rd party
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { CSpinner, CFormInput } from '@coreui/react'
import { Skeleton } from '@mui/material'
import axios from 'axios'

//Free Location
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
//icon
import {
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai'
import { BsFillBookmarksFill, BsBookmarks } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'

//css
import s from './post.module.css'

//api
import postService from 'src/Api/postService'
import authService from 'src/Api/authService'

import validator from 'src/middleware/validator'
import { useAuth } from 'src/context/AuthProvider'

function Posts({ post }) {
  const [toggler, setToggler] = useState(false)
  const [likeToggle, setLikeToggle] = useState(false)
  const [inputBoxActive, setInputBoxActive] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState(null)
  const [coordinates, setCoordinates] = useState({
    longitude: '',
    latitude: '',
  })
  const [pic, setPic] = useState(null)
  const [location, setLocation] = useState(null)
  const [comment, setComment] = useState(null)
  const [page, setPage] = useState(1)

  const authContext = useAuth()
  const navigate = useNavigate()

  // Fast Load Componet
  useEffect(() => {
    if (post && authContext.token) {
      setPic(post)
      authService.findOneProfile({ _id: post.postedBY }, authContext.token).then((res) => {
        setUser(res.data)
        let arr = res.data.name.split(' ')
        if (arr.length) {
          let username = ''
          if (arr.length >= 2) {
            username = `❤️༒☬${arr[0]}@${arr[1]}☬༒❤️`
          } else {
            username = `❤️༒☬${arr[0]}☬༒❤️`
          }
          setUserName(username)
        }
      })

      if (post.location) {
        const fetchData = async () => {
          try {
            const latitude = post.location.coordinates[1]
            const longitude = post.location.coordinates[0]
            setCoordinates({
              longitude: longitude,
              latitude: latitude,
            })
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            )
            const data = await response.json()
            let location = ''
            if (data) {
              if (data.address.state_district) {
                location = ` ${data.address.state_district} `
              }
              if (data.address.state) {
                location = ` ${data.address.state_district}, ${data.address.state} `
              }
              if (data.address.country) {
                location = ` ${data.address.state_district}, ${data.address.state}, ${data.address.country} `
              }
            }

            // setAddress(data.display_name)
            setLocation(location)
          } catch (error) {
            console.error(error)
            setLocation('')
          }
        }

        fetchData()
      }

      postService.checkCurrentUserLike({ post_id: post._id }, authContext.token).then((res) => {
        if (res.data.length) {
          setLikeToggle(!likeToggle)
        }
      })
    }
  }, [authContext.token, post])

  //! Imp Function Call

  //Toggle Setting Button
  const handelToggler = (e) => {
    e.preventDefault()
    if (authContext.user._id.toString() === user._id.toString()) {
      setToggler(!toggler)
    }
  }

  //Edit
  const handelEdit = () => {
    setInputBoxActive(true)
  }

  //Post Update Field Change

  const handelFieldChange = (e) => {
    setPic((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      }
    })
  }

  //Update Post APi

  const handelUpdate = async (e) => {
    setToastActive(true)

    try {
      //Validate Data
      const validateData = await validator.updatePost({
        post_id: pic._id,
        title: pic.title,
        description: pic.description,
      })

      // Response
      postService
        .updatePost(validateData, authContext.token)
        .then((res) => {
          setInputBoxActive(false)
          setToggler(!toggler)
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
    } catch (e) {
      toast.error(e.message, {
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
    }
  }

  //Delete Post APi

  const handelDelete = async (e) => {
    setToastActive(true)
    //post_id,
    try {
      //Validate Data

      // Response

      const data = {
        post_id: pic._id,
      }
      postService
        .deletePost(data, authContext.token)
        .then((res) => {
          setToggler(!toggler)
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
          }, 2000)
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
    } catch (e) {
      toast.error(e.message, {
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
    }
  }

  //Like Api

  const handelLike = async (e) => {
    //post_id,
    setLikeToggle(!likeToggle)
    setToastActive(true)

    e.preventDefault()
    try {
      //Validate Data

      // Response

      const data = {
        post_id: pic._id,
      }
      postService
        .likeAPost(data, authContext.token)
        .then((res) => {
          console.log(res, 'PIc Likes')
          if (res.data.length) {
            setPic((prev) => {
              const previousPic = { ...prev }
              previousPic.likeCount += 1
              return previousPic
            })
            console.log(pic.likeCount, 'Like Add')
          } else {
            setPic((prev) => {
              const previousPic = { ...prev }
              previousPic.likeCount =
                previousPic.likeCount > 0 ? previousPic.likeCount - 1 : previousPic.likeCount
              return previousPic
            })
            console.log(pic.likeCount, 'Like Remove')
          }
        })
        .catch((e) => {})
    } catch (e) {}
  }

  //! Imp Navigate
  const navigateToUserProfile = () => {
    navigate('/profile', { state: { id: 1, user: user } })
  }
  const navigateToUserLocation = () => {
    navigate('/google-map', { state: { id: 1, userLocation: coordinates } })
  }
  const likeNavigatePage = () => {
    navigate('/show-likes', { state: { id: 1, post: pic } })
  }

  return (
    <>
      <div className={s.post_card}>
        <div className={s.post_header}>
          <div className={s.post_profile}>
            {' '}
            {user ? (
              <img
                src={user.profile}
                alt="User Avatar"
                className={s.avatar}
                onClick={navigateToUserProfile}
              />
            ) : (
              <Skeleton animation="wave" variant="circular" width="32px" height="32px" />
            )}
            {user ? (
              <>
                <h3 className={s.username}>{userName ? userName : user.name}</h3>
                <button className={s.settings_btn} onClick={(e) => handelToggler(e)}>
                  <AiOutlineSetting />
                </button>
              </>
            ) : (
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            )}
          </div>
          <div className={s.post_location}>
            {location ? (
              <>
                <span>
                  <CiLocationOn size={'20px'} className={s.location_icon} />
                </span>
                <span className={s.location} onClick={navigateToUserLocation}>
                  {' '}
                  {location ? location : ''}
                </span>
              </>
            ) : (
              <>
                <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
              </>
            )}
          </div>
        </div>

        {/*Toggler */}
        {toggler ? (
          <>
            <div className={s.sidebar}>
              <div className={s.sidebar_menu}>
                <div
                  className={s.sidebar_menu_item}
                  onClick={handelEdit}
                  style={{
                    pointerEvents: toastActive ? 'none' : 'auto',
                  }}
                >
                  Edit
                </div>
                <div
                  className={s.sidebar_menu_item}
                  onClick={handelDelete}
                  style={{
                    pointerEvents: toastActive ? 'none' : 'auto',
                  }}
                >
                  Delete
                </div>
                <div className={s.sidebar_menu_item}>Add Tag</div>
                <div
                  className={s.sidebar_menu_item}
                  onClick={handelUpdate}
                  style={{
                    pointerEvents: toastActive ? 'none' : 'auto',
                  }}
                >
                  Update
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {pic ? (
          <img src={pic.media[0]} alt="Post Image" className={s.post_image} />
        ) : (
          <Skeleton
            sx={{
              height: 190,
            }}
            animation="wave"
            variant="rectangular"
          />
        )}

        <div className={s.post_footer}>
          {pic ? (
            <div className={s.post_icons}>
              <div className={s.left_icons}>
                <button className={s.like_btn}>
                  <div className={s.content}>
                    <span
                      className={likeToggle ? `${s.heart} ${s.heart_active}` : s.heart}
                      onClick={(e) => handelLike(e)}
                      style={{
                        pointerEvents: toastActive ? 'none' : 'auto',
                      }}
                    ></span>
                    <span className={s.likes_count} onClick={likeNavigatePage}>
                      {pic.likeCount} Likes
                    </span>
                  </div>
                </button>
                <button className={s.comment_btn}>
                  <div className={s.content}>
                    <AiOutlineComment size={'33px'} className={s.comment_icon} />
                    <span className={s.comments_count}> 10 comments</span>
                  </div>
                </button>
                <button className={s.share_btn}>
                  <div className={s.content}>
                    <AiOutlineShareAlt size={'33px'} className={s.share_icon} />
                    <span className={s.share_count}> </span>
                  </div>
                </button>
              </div>
              <button className={s.save_btn}>
                <BsBookmarks size={'33px'} className={s.bookmark_icon} />
              </button>
            </div>
          ) : (
            <Skeleton animation="wave" variant="text" style={{ fontSize: '24px', width: '20px' }} />
          )}

          {pic ? (
            <p className={s.title}>
              {inputBoxActive ? (
                <CFormInput
                  type="text"
                  id="title"
                  defaultValue={pic.title}
                  onChange={(e) => handelFieldChange(e)}
                />
              ) : (
                pic.title
              )}
            </p>
          ) : (
            <Skeleton animation="wave" variant="text" style={{ fontSize: '1rem' }} />
          )}
          {pic ? (
            <p className={s.description}>
              {inputBoxActive ? (
                <CFormInput
                  type="text"
                  id="description"
                  defaultValue={pic.description}
                  onChange={(e) => handelFieldChange(e)}
                />
              ) : (
                pic.description
              )}
            </p>
          ) : (
            <Skeleton animation="wave" variant="text" style={{ fontSize: '1rem' }} />
          )}

          <div className={s.hashtags}>
            <a href="#">#sunset</a>
            <a href="#">#photography</a>
            <a href="#">#nature</a>
          </div>
          <div className={s.likes_comments}>
            <span className={s.likes}>0 likes</span>
            <span className={s.comments}>0 comments</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Posts
