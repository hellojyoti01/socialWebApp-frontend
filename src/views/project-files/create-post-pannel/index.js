//3rd
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//icon

import { BsChatRightText } from 'react-icons/bs'
//Local
import { storage } from '../../../firebase/firebaseSdk'
import validator from 'src/middleware/validator'
import postService from 'src/Api/postService'
import { useAuth } from 'src/context/AuthProvider'
//css
import s from './crete_post_pannel.module.css'

//redux
import { fetchAllPostCurrentUser } from 'src/redux/postSlice'

function Index() {
  const [file, setFile] = useState('')
  const [postUrl, setPostUrl] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [toastActive, setToastActive] = useState(false)

  // State variables to hold the user's location
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()
  const authContext = useAuth()
  const dispatch = useDispatch()

  // Function to retrieve the user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        },
        (error) => {
          console.error(error)
        },
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  //File Upload In FireBase
  const handelUploadPostFirebase = () => {
    setToastActive(true)
    try {
      const storageRef = ref(storage, `images/post/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          // console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              break
            case 'running':
              break
          }
        },
        (error) => {
          setToastActive(false)
          toast.error('Some Error Occor In File Uploded Try Again! ', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setToastActive(false)

            setPostUrl(downloadURL)
          })
        },
      )
    } catch (e) {
      toast.error('Some Error Occor In File Uploded Try Again! ', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })

      setToastActive(false)
    }
  }

  useEffect(() => {
    if (location.state) {
      setFile(location.state.url)
    }
  }, [])

  //Uploaded Post In Firebase
  useEffect(() => {
    if (file) {
      handelUploadPostFirebase()
      getLocation()
    }
  }, [file])

  async function createPost(e) {
    e.preventDefault()
    setToastActive(true)

    try {
      const validateData = await validator.createPost({
        media: postUrl ? postUrl : '',
        title: title,
        description: description,
        longitude,
        latitude,
      })

      postService
        .createPost(validateData, authContext.token)
        .then((res) => {
          // Current User Post Updated
          dispatch(
            fetchAllPostCurrentUser({
              id: authContext.user._id,
              token: authContext.token,
            }),
          )

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
            navigate('/', 1000)
          })
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
          }, 2000)
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
      }, 2000)
    }
  }

  return (
    <div
      className={s.container}
      style={{
        backgroundColor: toastActive ? 'black' : '#eff0f2',
      }}
    >
      {toastActive ? (
        <>
          <div className={s.ring}></div>
          <span className={s.loadeing_screen}>Uploading...</span>
        </>
      ) : (
        <>
          <div className={s.from_box}>
            <div className={s.create_btn}>
              <button
                style={{
                  pointerEvents: toastActive ? 'none' : 'auto',
                }}
                onClick={(e) => createPost(e)}
              >
                Posted
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <div className={s.input_box}>
              <input
                type="text"
                name="title"
                value={title}
                className={s.input}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="title" className={s.label}>
                Title
              </label>
              <span className={s.icon}>
                <BsChatRightText />
              </span>
            </div>
            <div className={s.input_box}>
              <input
                type="text"
                name="description"
                value={description}
                className={s.input}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="description" className={s.label}>
                Description
              </label>
              <span className={s.icon}>
                <BsChatRightText />
              </span>
            </div>
          </div>
          <div className={s.image_area}>
            {file ? <img src={URL.createObjectURL(file)} alt="unknown Image" /> : ''}
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  )
}

export default Index
