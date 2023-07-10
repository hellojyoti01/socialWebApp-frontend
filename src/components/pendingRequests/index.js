//3rd Party
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

//icon
import { CAvatar } from '@coreui/react'
//context Api
import { useAuth } from 'src/context/AuthProvider'
//css
import s from './pending.module.css'
//APi
import friendService from 'src/Api/friendServices'
import { fetchAllPendingRequests, fetchAllFriends } from '../../redux/friendSlice'
function Index({ pendingRequest }) {
  const [toastActive, setToastActive] = useState(false)
  const dispatch = useDispatch()
  const authContext = useAuth()
  const navigate = useNavigate()

  //Decline The Request
  const declineRequest = async (el, element) => {
    el.preventDefault()
    setToastActive(true)
    friendService
      .declineRequest({ user_id: element._id }, authContext.token)
      .then((res) => {
        dispatch(fetchAllPendingRequests({ token: authContext.token }))
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
  // Accept The Requests
  const acceptRequest = async (e, element) => {
    e.preventDefault()
    setToastActive(true)
    friendService
      .acceptRequest({ user_id: element._id }, authContext.token)
      .then((res) => {
        dispatch(fetchAllFriends({ id: authContext.user._id, token: authContext.token }))
        dispatch(fetchAllPendingRequests({ token: authContext.token }))
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
  const handelNavigate = (el) => {
    navigate('/profile', { state: { id: 1, user: el } })
  }
  return (
    <>
      <div className={s.item}>
        <div className={s.profile}>
          <li className={s.each_item} onClick={() => handelNavigate(pendingRequest.recipient)}>
            {' '}
            <CAvatar src={pendingRequest.recipient.profile} />
            <div className={s.userName}>{pendingRequest.recipient.userName}</div>
          </li>
        </div>
        <div className={s.icon}>
          <button
            className={s.success}
            onClick={(e) => {
              acceptRequest(e, pendingRequest.recipient)
            }}
            style={{
              pointerEvents: toastActive ? 'none' : 'auto',
            }}
          ></button>
          <button
            className={s.reject}
            onClick={(e) => {
              declineRequest(e, pendingRequest.recipient)
            }}
            style={{
              pointerEvents: toastActive ? 'none' : 'auto',
            }}
          ></button>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default Index
