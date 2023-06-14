//3rd Party
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
//css
import s from '../../../css/forgot_password.module.css'

//local
import validator from 'src/middleware/validator'
import authService from 'src/Api/authService'

function PasswordForgot() {
  const location = useLocation()
  const [error, setError] = useState('')
  const [toastActive, setToastActive] = useState(false)
  const navigate = useNavigate()
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  })

  //password state Change
  const handelChange = (e) => {
    setPassword((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      }
    })
  }

  //Change password API call
  const handelChangePassword = async (e) => {
    e.preventDefault()
    setToastActive(true)
    try {
      setError('')
      const validateData = await validator.forgetPassword({
        OTP: location.state.OTP,
        email: location.state.email,
        password: password.password,
        confirmPassword: password.confirmPassword,
      })

      authService
        .resetPassword(validateData)
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
            navigate('/login')
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
          setTimeout(() => {
            navigate('/sendOTP')
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
      {/* -------------Password change Wrapper Start--------------------------------- */}
      <div className={s.wrapper}>
        <h1>Change Password</h1>
        {/* -------------From Wrapper Start--------------------------------- */}
        <form>
          <input
            type="password"
            id="password"
            placeholder="New Password"
            onChange={(e) => {
              handelChange(e)
            }}
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm New Password"
            onChange={(e) => {
              handelChange(e)
            }}
          />

          {/* ------------- change password and cancel password Wrapper Start--------------------------------- */}
          <div className={s.button_row}>
            <button
              className={s.change_button}
              onClick={handelChangePassword}
              style={{
                pointerEvents: toastActive ? 'none' : 'auto',
              }}
            >
              Change Password
            </button>
            <button
              className={s.cancel_button}
              style={{
                pointerEvents: toastActive ? 'none' : 'auto',
              }}
            >
              Cancel
            </button>
          </div>
          {/* ------------- change password and cancel password Wrapper Start--------------------------------- */}
        </form>
        {/* -------------From Wrapper Start--------------------------------- */}
      </div>
      {/* -------------Password change Wrapper Start--------------------------------- */}

      {/* -------------Toast--------------------------------- */}
      <ToastContainer />
    </div>
  )
}

export default PasswordForgot
