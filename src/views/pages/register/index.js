//3rd Party import
import React, { useState } from 'react'
import { CProgress, CProgressBar } from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'src/firebase/firebaseSdk'
import axios from 'axios'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../../firebase/firebaseSdk'
//Asset Import
import { wave, bg, avatar } from '../../../assets'
//Icon Import
import { RiLockPasswordLine } from 'react-icons/ri'
import { BsFacebook } from 'react-icons/bs'
import { AiFillGoogleCircle, AiFillLinkedin } from 'react-icons/ai'
import { AiOutlineMail, AiOutlineUserAdd } from 'react-icons/ai'
//css Import
import s from '../../../css/sign_up.module.css'

//Local File Import
import validator from '../../../middleware/validator'
import costumError from '../../../middleware/costumError'

import authService from 'src/Api/authService' //API Request
import { useAuth } from 'src/context/authContext/Provider'

function Index() {
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [userProfileUrl, setUserProfileUrl] = useState('')
  const [fileTransformed, setFileTransFormed] = useState(0)
  const [toastActive, setToastActive] = useState(false)
  const [progressBarActive, setProgressBarActive] = useState(false)
  const [userProfilePhoto, setUserProfilePhoto] = useState(null)
  const [error, setError] = useState('')

  const authContext = useAuth()

  const handelFieldChange = (e) => {
    setUserInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  /* -------------------------------------------------------------------------- */
  /*               Upload File In The Firebase and Download Url              */
  /* -------------------------------------------------------------------------- */
  const handelProfileChange = (e) => {
    try {
      setUserProfilePhoto(e.target.files[0])
      const storageRef = ref(storage, `images/profile/${e.target.files[0].name}`)

      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0])

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setFileTransFormed(progress)
          // console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              break
            case 'running':
              setProgressBarActive(true)
              break
          }
        },
        (error) => {
          setUserProfilePhoto(null)
          setProgressBarActive(false)
          console.log(error, 'Error In File Upload')
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUserProfileUrl(downloadURL)
            setProgressBarActive(false)
            // console.log('File available at', downloadURL)
          })
        },
      )
    } catch (e) {
      setUserProfilePhoto(null)
      console.log('Error In Upload File', e)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*             Request To DataBase               */
  /* -------------------------------------------------------------------------- */
  const handelSubmit = async () => {
    setToastActive(true)
    try {
      setError('')

      //Validate Data
      const validateData = await validator.SignUp({
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
        profile: userProfileUrl,
      })

      //Response
      authService
        .Register({ ...validateData, signInMode: 'ideal' })
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
        })
        .catch((e) => {
          const { data } = e.response

          setError(data.message)
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
      const errorMsg = costumError.signUp(JSON.stringify(e.message))
      setError(errorMsg)
      console.log(e)
      toast.error(errorMsg, {
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

  const handelGoogleSignIn = async (e) => {
    setToastActive(true)
    try {
      setError('')
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      const credential = GoogleAuthProvider.credentialFromResult(result)
      const { providerData } = result.user
      console.log(providerData[0], 'user')

      //Api Request to Database
      //Validate Data
      const validateData = await validator.socialSign({
        email: providerData[0].email,
        name: providerData[0].displayName,
        profile: providerData[0].photoURL,
        uid: providerData[0].uid,
      })

      // Response
      authService
        .socialSign({ ...validateData, signInMode: providerData[0].providerId })
        .then((res) => {
          authContext.setToken(res.data)
          axios.defaults.headers.common['Authorization'] = res.data
          localStorage.setItem('SocialWeb_Token', res.data)
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
        })
        .catch((e) => {
          const { data } = e.response
          setError(data.message)
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
      setError(e.message)
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

  return (
    <div className={s.container}>
      {progressBarActive ? (
        <CProgress className="mb-3">
          <CProgressBar
            color="danger"
            variant="striped"
            animated
            value={fileTransformed}
            aria-valuenow={fileTransformed}
          />
        </CProgress>
      ) : (
        <></>
      )}

      {/* -------------Left Wave Image ---------------------- */}
      <img src={wave} alt="wave" className={s.wave} />
      {/* -------------Middle Background Image ---------------------- */}
      <img src={bg} alt="bg" className={s.bg} />

      {/* -------------Form Box Start---------------------- */}
      <div className={s.from_box}>
        {/* -------------User Profile Start---------------------- */}
        <span className={s.user_profile}>
          <input
            type="file"
            className={s.user_input_image}
            onChange={(e) => handelProfileChange(e)}
          />
          <img src={userProfileUrl ? userProfileUrl : avatar} alt="avatar" className={s.avatar} />
        </span>
        {/* -------------User Profile End ---------------------- */}

        {/* -------------Sign Up Heading Start---------------------- */}
        <h1 className={s.sign_up_heading}>Create Account</h1>
        {/* -------------Sign Up Heading End---------------------- */}

        {/* -------------Sign Up Input Box Start---------------------- */}
        <div className={s.input_box}>
          <input
            type="text"
            name="name"
            className={s.input}
            required
            onChange={(e) => handelFieldChange(e)}
          />
          <label htmlFor="username" className={s.label}>
            Name
          </label>
          <span className={s.icon}>
            <AiOutlineUserAdd />
          </span>
        </div>
        <div className={s.input_box}>
          <input
            type="email"
            name="email"
            className={s.input}
            required
            onChange={(e) => handelFieldChange(e)}
          />
          <label htmlFor="email" className={s.label}>
            Email
          </label>
          <span className={s.icon}>
            <AiOutlineMail />
          </span>
        </div>
        <div className={s.input_box}>
          <input
            type="password"
            name="password"
            className={s.input}
            required
            onChange={(e) => handelFieldChange(e)}
          />
          <label htmlFor="password" className={s.label}>
            Password
          </label>
          <span className={s.icon}>
            <RiLockPasswordLine />
          </span>
        </div>
        {/* -------------Sign Up Input Box End---------------------- */}

        {/* -------------Remember Me And Forget Password Start---------------------- */}
        <div className={s.remember_me}>
          <span>
            {' '}
            <input type="checkbox" />
            <span>Remember me</span>
          </span>
          <Link to="/sendOTP" style={{ textDecoration: 'none' }}>
            {' '}
            <span className={s.forget_password}> Forgot Password</span>
          </Link>
        </div>
        {/* -------------Remember Me And Forget Password End---------------------- */}

        {/* -------------Sign Up Button Start---------------------- */}
        <div className={s.sign_up_btn}>
          <button
            className={s.button}
            style={{
              verticalAlign: 'middle',
              pointerEvents: toastActive ? 'none' : 'auto',
            }}
            onClick={handelSubmit}
          >
            <span>Sign Up</span>
          </button>
        </div>
        {/* -------------Sign Up Button End---------------------- */}

        {/* -------------Account exist Start---------------------- */}
        <div className={s.account_exist}>
          <Link to={'/logIn'} style={{ textDecoration: 'none', color: 'black' }}>
            <p className={s.account_exist_}>Already Account exist ? </p>
          </Link>
        </div>
        {/* -------------Account exist End---------------------- */}

        {/* -------------Social Media Sign UP---------------------- */}

        <div className={s.social_media_signUP}>
          <ul className={s.icon_group}>
            <li className={s.icon_list}>
              <a
                href="#"
                style={{
                  pointerEvents: toastActive ? 'none' : 'auto',
                }}
              >
                <span>
                  <BsFacebook size={20} />
                </span>
              </a>
            </li>

            <li className={s.icon_list} onClick={handelGoogleSignIn}>
              <a
                href="#"
                style={{
                  pointerEvents: toastActive ? 'none' : 'auto',
                }}
              >
                <span>
                  <AiFillGoogleCircle size={20} />
                </span>
              </a>
            </li>
            <li className={s.icon_list}>
              <a
                href="#"
                style={{
                  pointerEvents: toastActive ? 'none' : 'auto',
                }}
              >
                <span>
                  {' '}
                  <AiFillLinkedin size={20} />
                </span>
              </a>
            </li>
          </ul>
        </div>
        {/* -------------Social Media Sign UP End---------------------- */}
        <ToastContainer />
      </div>
      {/* -------------Form Box Start---------------------- */}
    </div>
  )
}

export default Index
