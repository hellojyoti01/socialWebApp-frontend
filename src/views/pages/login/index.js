//3rd Party
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../../firebase/firebaseSdk'
//icon

import { RiLockPasswordLine } from 'react-icons/ri'
import { BsFacebook } from 'react-icons/bs'
import { AiFillGoogleCircle, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai'

//Assets
import { wave, bg, avatar } from '../../../assets'

//csss
//@ts-ignore
import s from '../../../css/sign_in.module.css'

//local

import authService from 'src/Api/authService'
import validator from 'src/middleware/validator'
import { useAuth } from 'src/context/authContext/Provider'
function Index() {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })
  const [toastActive, setToastActive] = useState(false)
  const [error, setError] = useState('')
  const authContext = useAuth()
  const navigate = useNavigate()
  //User Input State Change
  const handelFieldChange = (e) => {
    setUserInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  /* -------------------------------------------------------------------------- */
  /*             Request To DataBase               */
  /* -------------------------------------------------------------------------- */
  const handelSubmit = async () => {
    setToastActive(true)
    try {
      setError('')
      //Validate Data
      const validateData = await validator.SignIn({
        email: userInput.email,
        password: userInput.password,
      })

      // Response
      authService
        .SignIn(validateData)
        .then((resToken) => {
          authService.sendOTP(validateData).then((res) => {
            // authContext.setToken(res.data)
            // axios.defaults.headers.common['Authorization'] = res.data
            // localStorage.setItem('SocialWeb_Token', res.data)
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
              navigate('/verifyOTP', {
                state: {
                  id: 2,
                  email: validateData.email,
                  token: resToken.data,
                },
              })
            }, 2000)
          })
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
        .catch((e) => {
          console.log(e, 'catch')
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
      console.log(e, 'validate')
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
      {/* -------------Left Wave Image ---------------------- */}
      <img src={wave} alt="wave" className={s.wave} />
      {/* -------------Middle Background Image ---------------------- */}
      <img src={bg} alt="bg" className={s.bg} />

      {/* -------------Form Box Start---------------------- */}
      <div className={s.from_box}>
        {/* -------------User Profile Start---------------------- */}
        <span className={s.user_profile}>
          <img src={avatar} alt="avatar" className={s.avatar} />
        </span>
        {/* -------------User Profile End ---------------------- */}

        {/* -------------Sign In Heading Start---------------------- */}
        <h1 className={s.sign_up_heading}>Log In</h1>
        {/* -------------Sign In Heading End---------------------- */}

        {/* -------------Sign In Input Box Start---------------------- */}

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
            <span>Sign In</span>
          </button>
        </div>
        {/* -------------Sign Up Button End---------------------- */}

        {/* -------------Account exist Start---------------------- */}
        <div className={s.account_exist}>
          <Link to={'/register'} style={{ textDecoration: 'none', color: 'black' }}>
            <p className={s.account_exist_}>Created Account ? </p>
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
