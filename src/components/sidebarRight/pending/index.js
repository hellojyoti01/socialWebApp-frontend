import React, { useEffect, useState } from 'react'
import s from './pending.module.css'
import { CAvatar } from '@coreui/react'
import { BsArrowUpRight } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'
import authService from 'src/Api/authService'
import friendService from 'src/Api/friendServices'

import { useAuth } from 'src/context/AuthProvider'
import { useFriend } from 'src/context/friendProvider'
import { element } from 'prop-types'
function PendingFriendsList() {
  const [toastActive, setToastActive] = useState(false)
  const authContext = useAuth()
  const friendContext = useFriend()

  const acceptRequest = async (e, element) => {
    e.preventDefault()
    setToastActive(true)
    friendService
      .acceptRequest({ user_id: element._id }, authContext.token)
      .then((res) => {
        friendContext.getAllPendingRequest(authContext.token)
        friendContext.findAllFriends({ user_id: authContext.user._id }, authContext.token)
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

  const declineRequest = async (el, element) => {}
  useEffect(() => {
    friendContext.getAllPendingRequest(authContext.token)
  }, [])
  return (
    <div className={s.container}>
      <h4>Request</h4>
      <div className={s.wrapper}>
        {friendContext.pending.length > 0
          ? friendContext.pending.map((el, idx) => {
              console.log(el)
              return (
                <div className={s.item} key={el}>
                  <div className={s.profile}>
                    <li className={s.each_item}>
                      {' '}
                      <CAvatar src={el.profile} />
                      <span>{el.name}</span>
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
                    >
                      Accept
                    </button>
                    <button
                      className={s.reject}
                      onClick={(e) => {
                        declineRequest(e, el)
                      }}
                      style={{
                        pointerEvents: toastActive ? 'none' : 'auto',
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )
            })
          : 'No Friend Request'}
      </div>
      <div className={s.view_all}>
        <button>
          <span>View All</span>
          <BsArrowUpRight />
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PendingFriendsList
