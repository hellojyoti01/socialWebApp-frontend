//3rd party
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
//css
import s from './suggestion.module.css'
//icon
import { CAvatar } from '@coreui/react'
import { BsArrowUpRight, BsHypnotize } from 'react-icons/bs'

// Context API
import { useAuth } from 'src/context/AuthProvider'
//redux
import { fetchAllSentRequests } from '../../../redux/friendSlice'

//Api
import friendService from 'src/Api/friendServices'

function SentRequestList() {
  const sentFriendRequest = useSelector((el) => {
    return el.friendReducer.sentRequests
  })

  const [page, setPage] = useState(1)
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
        dispatch(
          fetchAllSentRequests({ id: authContext.user._id, page: 1, token: authContext.token }),
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

  useEffect(() => {
    if (authContext?.user && authContext?.token) {
      dispatch(fetchAllSentRequests({ page: page, token: authContext.token }))
    }
  }, [])

  console.log(sentFriendRequest, 'sent Request')
  return (
    <div className={s.container}>
      <h4>Sent Requests...</h4>
      <div className={s.wrapper}>
        {sentFriendRequest.length >= 1 ? (
          sentFriendRequest.slice(0, 4).map((el, idx) => {
            return (
              <div className={s.item} key={idx}>
                <div className={s.profile}>
                  <li className={s.each_item} onClick={() => handelNavigate(el.recipient)}>
                    {' '}
                    <CAvatar src={el.recipient.profile} />
                    <div className={s.userName}>{el.recipient.userName}</div>
                  </li>
                </div>
                <div className={s.icon}>
                  <button
                    className={s.reject}
                    style={{
                      pointerEvents: toastActive ? 'none' : 'auto',
                    }}
                    onClick={(e) => hendelDelete(e, el.recipient._id)}
                  ></button>
                </div>
              </div>
            )
          })
        ) : (
          <div className={s.noRequestContainer}>
            <span className={s.noRequestText}>No Sent Requests, Plz send The Requsts😍...</span>

            <span className={s.noRequestImage}>
              <BsHypnotize />
            </span>
          </div>
        )}
      </div>
      {/*view All*/}
      <div className={s.view_all}>
        <button
          style={{
            pointerEvents: toastActive ? 'none' : 'auto',
          }}
        >
          <span>View All Sent Requests...</span>
          <BsArrowUpRight />
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SentRequestList
