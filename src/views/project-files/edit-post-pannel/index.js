import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CSpinner, CFormInput } from '@coreui/react'
import {
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import { BsFillBookmarksFill } from 'react-icons/bs'
import s from './edit_post.module.css'
import { useAuth } from '../../../context/AuthProvider'
import postService from 'src/Api/postService'
import validator from 'src/middleware/validator'

function Index() {
  const [post, setPost] = useState({})
  const [user, setUser] = useState({})

  const [loading, setLoading] = useState(true)
  const [inputBoxActive, setInputBoxActive] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [toggler, setToggler] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const authContext = useAuth()

  const handelToggler = (e) => {
    e.preventDefault()
    if (post.postedBY.toString() === authContext.user._id) {
      setToggler(!toggler)
    }
  }

  const handelEdit = () => {
    setInputBoxActive(true)
  }

  const handelFieldChange = (e) => {
    setPost((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      }
    })
  }

  const handelUpdate = async (e) => {
    setInputBoxActive(false)
    //post_id, caption, userTag, hashTag
    try {
      //Validate Data
      const validateData = await validator.updatePost({
        post_id: post._id,
        caption: post.caption,
        userTag: post.userTag,
        hashTag: post.hashTag,
      })

      // Response
      postService
        .updatePost(validateData, authContext.token)
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
  const handelDelete = async (e) => {
    setInputBoxActive(false)
    //post_id,
    try {
      //Validate Data

      // Response

      const data = {
        post_id: post._id,
      }
      postService
        .deletePost(data, authContext.token)
        .then((res) => {
          console.log(res, 'responec')
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
  useEffect(() => {
    if (location?.state) {
      setPost({ ...location.state?.post })
      setUser({ ...authContext.user })
      setLoading(false)
    }
  }, [])
  return (
    <div className={s.post_card}>
      {!loading ? (
        <>
          <div className={s.post_header}>
            <img src={user.profile} alt="User Avatar" className={s.avatar} />
            <h3 className={s.username}>{user.userName}</h3>
            <button
              className={s.settings_btn}
              onClick={(e) => {
                handelToggler(e)
              }}
            >
              <AiOutlineSetting />
            </button>
          </div>
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
          <img src={post.post} alt="Post Image" className={s.post_image} />
          <div className={s.post_footer}>
            <div className={s.post_icons}>
              <div className={s.left_icons}>
                <button className={s.like_btn}>
                  <AiOutlineHeart />
                </button>
                <button className={s.comment_btn}>
                  <AiOutlineComment />
                </button>
                <button className={s.share_btn}>
                  <AiOutlineShareAlt />
                </button>
              </div>
              <button className={s.save_btn}>
                <BsFillBookmarksFill />
              </button>
            </div>
            <p className={s.caption}>
              <CFormInput
                type="text"
                id="caption"
                defaultValue={post.caption}
                plainText={!inputBoxActive}
                disabled={!inputBoxActive}
                onChange={(e) => handelFieldChange(e)}
              />
            </p>
            <div className={s.hashtags}>
              {/* {inputBoxActive ? (
                <CFormInput
                  type="text"
                  id="hashTag"
                  defaultValue={'hello'}
                  onChange={(e) => handelFieldChange(e)}
                />
              ) : (
                <>
                  <a href="#">#sunset</a>
                  <a href="#">#photography</a>
                  <a href="#">#nature</a>{' '}
                </>
              )} */}
              <a href="#">#sunset</a>
              <a href="#">#photography</a>
              <a href="#">#nature</a>{' '}
            </div>
            <div className={s.likes_comments}>
              <span className={s.likes}>{post.totalLike} likes</span>
              <span className={s.comments}>{post.totalComment} comments</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <CSpinner color="primary" />
        </>
      )}

      <ToastContainer />
    </div>
  )
}

export default Index
