/* -------------------------------------------------------------------------- */
/* //! Loction Rendering 6 time                                  */
/* -------------------------------------------------------------------------- */

//3rd party lib
import React, { useState, useRef, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//css
import s from '../../../css/send_otp.module.css'

//local
import validator from 'src/middleware/validator'
import authService from 'src/Api/authService'
import { useAuth } from 'src/context/AuthProvider'
function VerifyOTP() {
  const location = useLocation()
  // const [OTP, setOTP] = useState({
  //   otpInput1: '',
  //   otpInput2: '',
  //   otpInput3: '',
  //   otpInput4: '',
  //   otpInput5: '',
  //   otpInput6: '',
  // })
  const [OTP, setOTP] = useState(new Array(6).fill(''))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const otpRef = useRef(null)
  const [error, setError] = useState('')
  const [toastActive, setToastActive] = useState(false)
  const navigate = useNavigate()
  const authContext = useAuth()

  //Verify OTP
  const handelVerify = async (e) => {
    e.preventDefault()
    setToastActive(true)
    try {
      setError('')
      const validateData = await validator.OTP({
        OTP: OTP.join(''),
        email: location.state.email,
      })

      authService
        .verifyOTP(validateData)
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
            if (location.state.id == 1) {
              setTimeout(() => {
                navigate('/resetPassword', {
                  state: {
                    id: 1,
                    email: validateData.email,
                    OTP: validateData.OTP,
                  },
                })
              }, 2000)
            } else if (location.state.id == 2) {
              authContext.setToken(location.state.token)
              axios.defaults.headers.common['Authorization'] = JSON.stringify(location.state.token)
              localStorage.setItem('SocialWeb_Token', location.state.token)
            } else {
              setToastActive(true)
              setError('Server Down')
              toast.error('Server Down', {
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

  //Back to Previous Page
  const handelCancel = async (e) => {
    e.preventDefault()
    navigate('/sendOTP')
  }

  //!Resend Not Implement
  const handelResend = async (e) => {
    e.preventDefault()
    navigate('/sendOTP')
  }

  //Change OTP In State
  const handelChange = (e, index) => {
    const { value } = e.target
    const newOtp = [...OTP]
    newOtp[index] = value
    setOTP(newOtp)
    if (!value) {
      if (index !== 0) {
        return setActiveOtpIndex(index - 1)
      }
      if (index === 0) {
        setActiveOtpIndex(index)
      }
      return
    }
    if (index < 5) {
      setActiveOtpIndex(index + 1)
    }
  }

  useEffect(() => {
    otpRef.current.focus()
  }, [activeOtpIndex])
  return (
    <div className={s.container}>
      {/* -------------VerifyOtp Wrapper Start--------------------------------- */}
      <div className={s.wrapper}>
        <h1>Verify OTP</h1>

        {/* -------------VerifyOtp Form Start--------------------------------- */}
        <form>
          <div className={s.otp_input_container}>
            {OTP.map((el, idx) => {
              return (
                <input
                  type="text"
                  ref={activeOtpIndex == idx ? otpRef : null}
                  key={idx}
                  id="otpInput1"
                  maxLength="1"
                  className={s.otp_input}
                  onChange={(e) => handelChange(e, idx)}
                />
              )
            })}

            {/* <input
              type="text"
              id="otpInput2"
              maxLength="1"
              autoFocus={true}
              className={s.otp_input}
              onChange={(e) => handelChange(e)}
            />
            <input
              type="text"
              id="otpInput3"
              maxLength="1"
              className={s.otp_input}
              onChange={(e) => handelChange(e)}
            />
            <input
              type="text"
              id="otpInput4"
              maxLength="1"
              className={s.otp_input}
              onChange={(e) => handelChange(e)}
            />
            <input
              type="text"
              id="otpInput5"
              maxLength="1"
              className={s.otp_input}
              onChange={(e) => handelChange(e)}
            />
            <input
              type="text"
              id="otpInput6"
              maxLength="1"
              className={s.otp_input}
              onChange={(e) => handelChange(e)}
            /> */}
          </div>

          {/* -------------VerifyOtp Button Back , Verify , resend Start--------------------------------- */}
          <div className={s.button_row}>
            <button
              className={s.back_button}
              style={{
                pointerEvents: toastActive ? 'none' : 'auto',
              }}
              onClick={handelCancel}
            >
              Back
            </button>
            <button
              className={s.resend_button}
              style={{
                pointerEvents: toastActive ? 'none' : 'auto',
              }}
              onClick={handelResend}
            >
              Resend
            </button>
            <button
              className={s.verify_button}
              onClick={handelVerify}
              style={{
                pointerEvents: toastActive ? 'none' : 'auto',
              }}
            >
              Verify
            </button>
          </div>
          {/* -------------VerifyOtp Button Back , Verify , resend End--------------------------------- */}
        </form>
        {/* -------------VerifyOtp Form End--------------------------------- */}
      </div>
      {/* -------------VerifyOtp Wrapper End--------------------------------- */}
      {/* -------------Toast--------------------------------- */}
      <ToastContainer />
    </div>
  )
}

export default VerifyOTP
