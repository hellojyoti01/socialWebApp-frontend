//3rd Party
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import s from './pending.module.css'
import { CAvatar } from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'
//Icon
import { BsArrowUpRight, BsHypnotize } from 'react-icons/bs'

import { useAuth } from 'src/context/AuthProvider'

//ApI
import { fetchAllPendingRequests, fetchAllFriends } from '../../../redux/friendSlice'
import friendService from 'src/Api/friendServices'
function PendingFriendsList() {
  const pendingFriends = useSelector((el) => {
    return el.friendReducer.pendingRequests
  })

  const [page, setPage] = useState(1)
  const [toastActive, setToastActive] = useState(false)

  const authContext = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const acceptRequest = async (e, element) => {
    e.preventDefault()
    setToastActive(true)
    friendService
      .acceptRequest({ user_id: element._id }, authContext.token)
      .then((res) => {
        dispatch(fetchAllFriends({ id: authContext.user._id, page: 1, token: authContext.token }))
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

  const declineRequest = async (el, element) => {
    el.preventDefault()
    setToastActive(true)
    friendService
      .declineRequest({ user_id: element._id }, authContext.token)
      .then((res) => {
        dispatch(
          fetchAllPendingRequests({ id: authContext.user._id, page: 1, token: authContext.token }),
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
    if (authContext?.user && authContext.token) {
      dispatch(
        fetchAllPendingRequests({ id: authContext.user._id, page: page, token: authContext.token }),
      )
    }
  }, [])

  return (
    <div className={s.container}>
      <h4>Pending Requests...</h4>
      <div className={s.wrapper}>
        {pendingFriends.length >= 1 ? (
          pendingFriends.map((el, idx) => {
            return (
              <div className={s.item} key={idx}>
                <div className={s.profile}>
                  <li className={s.each_item} onClick={() => handelNavigate(el)}>
                    {' '}
                    <CAvatar src={el.profile} />
                    <div className={s.userName}>{el.userName}</div>
                  </li>
                </div>
                <div className={s.icon}>
                  <button
                    className={s.success}
                    onClick={(e) => {
                      acceptRequest(e, el)
                    }}
                    style={{
                      pointerEvents: toastActive ? 'none' : 'auto',
                    }}
                  ></button>
                  <button
                    className={s.reject}
                    onClick={(e) => {
                      declineRequest(e, el)
                    }}
                    style={{
                      pointerEvents: toastActive ? 'none' : 'auto',
                    }}
                  ></button>
                </div>
              </div>
            )
          })
        ) : (
          <>
            {' '}
            <div className={s.noRequestContainer}>
              <span className={s.noRequestText}>
                No Pending Requests, You Add All Pending Requests 😃...
              </span>

              <span className={s.noRequestImage}>
                <BsHypnotize />
              </span>
            </div>
          </>
        )}
      </div>
      {/*view All*/}
      <div className={s.view_all}>
        <button
          style={{
            pointerEvents: toastActive ? 'none' : 'auto',
          }}
        >
          <span>View All Pending Requests</span>
          <BsArrowUpRight />
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PendingFriendsList
