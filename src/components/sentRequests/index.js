//3rd party
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
//icon
import { CAvatar } from '@coreui/react'
//Api
import friendService from 'src/Api/friendServices'

//context Api
import { useAuth } from 'src/context/AuthProvider'
//Redux
import { fetchAllSentRequests } from 'src/redux/friendSlice'
//css
import s from './sentRequests.module.css'

function SentRequests({ sentRequest }) {
  const [toastActive, setToastActive] = useState(false)

  const authContext = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const hendelDelete = (e, element_id) => {
    e.preventDefault()
    setToastActive(true)
    friendService
      .declineRequest({ user_id: element_id }, authContext.token)
      .then((res) => {
        dispatch(fetchAllSentRequests({ token: authContext.token }))

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
        toast.warning(e?.response?.data.message, {
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
  const handelNavigate = (user) => {
    navigate('/profile', { state: { id: 1, user: user } })
  }
  return (
    <>
      <div className={s.item}>
        <div className={s.profile}>
          <li className={s.each_item} onClick={() => handelNavigate(sentRequest.recipient)}>
            {' '}
            <CAvatar src={sentRequest.recipient.profile} />
            <div className={s.userName}>{sentRequest.recipient.userName}</div>
          </li>
        </div>
        <div className={s.icon}>
          <button
            className={s.reject}
            style={{
              pointerEvents: toastActive ? 'none' : 'auto',
            }}
            onClick={(e) => hendelDelete(e, sentRequest.recipient._id)}
          ></button>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default SentRequests
