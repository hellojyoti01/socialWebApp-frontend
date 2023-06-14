//3rd party lib
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

//css
import s from '../../../css/enter_email.module.css'

//local
import validator from 'src/middleware/validator'
import authService from 'src/Api/authService'

function SendOtp() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [toastActive, setToastActive] = useState(false)
  const navigate = useNavigate()

  //Send Otp Particular Email address
  const handelClick = async (e) => {
    e.preventDefault()
    setToastActive(true)
    try {
      setError('')
      const validateData = await validator.Email({ email })

      authService
        .sendOTP(validateData)
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
            navigate('/verifyOTP', { state: { id: 1, email: validateData.email } })
          }, 2000)
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
          setTimeout(() => {
            navigate('/register')
          }, 2000)
        })
    } catch (e) {
      setError(e.message)
      console.log(e)
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
      {/* -------------sendOtp Wrapper Start--------------------------------- */}
      <div className={s.wrapper}>
        <h1>Enter Your Email to Send OTP</h1>

        {/* -------------form Wrapper Start--------------------------------- */}
        <form>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            id="send-otp-btn"
            style={{
              pointerEvents: toastActive ? 'none' : 'auto',
            }}
            onClick={(e) => handelClick(e)}
          >
            Send OTP
          </button>
        </form>
        {/* -------------form Wrapper End--------------------------------- */}

        {/* -------------Content Wrapper End--------------------------------- */}
        {/* -------------If Any error add Inside paragraph End--------------------------------- */}
        <p className={s.error_message} id="error-message"></p>
        <p className={s.info}>An OTP will be sent to {email} email address for verification.</p>
        <p className={s.privacy_policy}>
          By entering your email, you agree to our <a href="#">privacy policy</a>.
        </p>

        {/* -------------Content Wrapper End--------------------------------- */}
      </div>
      {/* -------------sendOtp Wrapper Start--------------------------------- */}

      {/* -------------toast--------------------------------- */}
      <ToastContainer />
    </div>
  )
}

export default SendOtp
