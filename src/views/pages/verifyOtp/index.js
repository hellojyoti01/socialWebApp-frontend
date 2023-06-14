//3rd party lib
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//css
import s from '../../../css/send_otp.module.css'

//local
import validator from 'src/middleware/validator'
import authService from 'src/Api/authService'

function VerifyOTP() {
  const location = useLocation()
  const [OTP, setOTP] = useState({
    otpInput1: '',
    otpInput2: '',
    otpInput3: '',
    otpInput4: '',
    otpInput5: '',
    otpInput6: '',
  })
  const [error, setError] = useState('')
  const [toastActive, setToastActive] = useState(false)
  const navigate = useNavigate()

  //Verify OTP
  const handelVerify = async (e) => {
    e.preventDefault()
    setToastActive(true)
    try {
      setError('')
      const validateData = await validator.OTP({
        OTP: `${OTP.otpInput1}${OTP.otpInput2}${OTP.otpInput3}${OTP.otpInput4}${OTP.otpInput5}${OTP.otpInput6}`,
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
            navigate('/resetPassword', {
              state: {
                id: 1,
                email: validateData.email,
                OTP: validateData.OTP,
              },
            })
          }, 2000)
        })
        .catch((e) => {
          const { data } = e.response
          console.log('error', data)
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
  const handelChange = (e) => {
    setOTP((prev) => {
      return { ...prev, [e.target.id]: e.target.value }
    })
  }

  return (
    <div className={s.container}>
      {/* -------------VerifyOtp Wrapper Start--------------------------------- */}
      <div className={s.wrapper}>
        <h1>Verify OTP</h1>

        {/* -------------VerifyOtp Form Start--------------------------------- */}
        <form>
          <div className={s.otp_input_container}>
            <input
              type="text"
              id="otpInput1"
              maxLength="1"
              className={s.otp_input}
              onChange={(e) => handelChange(e)}
            />
            <input
              type="text"
              id="otpInput2"
              maxLength="1"
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
            />
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
