//3rd Party Lib
import React, { useEffect, useState } from 'react'
import s from './friend_list.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CAvatar } from '@coreui/react'

import { BsArrowUpRight, BsHypnotize } from 'react-icons/bs'

//Context Api
import { useAuth } from 'src/context/AuthProvider'

//API
import { fetchAllFriends } from 'src/redux/friendSlice'
import friendService from 'src/Api/friendServices'
function FriendsList() {
  const friends = useSelector((el) => {
    return el.friendReducer.friends
  })

  const [toastActive, setToastActive] = useState(false)
  const [page, setPage] = useState(1)
  const authContext = useAuth()
  const dispatch = useDispatch()

  const declineRequest = async (el, element) => {
    el.preventDefault()
    setToastActive(true)
    friendService
      .declineRequest({ user_id: element._id }, authContext.token)
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
  useEffect(() => {
    if (authContext.user?._id) {
      dispatch(fetchAllFriends({ id: authContext.user._id, page: page, token: authContext.token }))
    }
  }, [])
  console.log(friends)

  return (
    <div className={s.container}>
      <h4>Friends...</h4>
      <div className={s.wrapper}>
        {friends?.length >= 1 ? (
          <>
            {friends.slice(0, 4).map((element, idx) => {
              return (
                <div className={s.item} key={idx}>
                  <div className={s.profile}>
                    <li className={s.each_item}>
                      {' '}
                      <CAvatar src={element.profile} status="success" />
                      <div className={s.userName}>{element.userName}</div>
                    </li>
                  </div>
                  <div className={s.icon}>
                    <button
                      className={s.success}
                      // onClick={(e) => {
                      //   acceptRequest(e, el)
                      // }}
                      style={{
                        pointerEvents: toastActive ? 'none' : 'auto',
                      }}
                    ></button>
                    <button
                      className={s.reject}
                      onClick={(e) => {
                        declineRequest(e, element)
                      }}
                      style={{
                        pointerEvents: toastActive ? 'none' : 'auto',
                      }}
                    ></button>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <>
            <div className={s.noRequestContainer}>
              <span className={s.noRequestText}>No Friends, Plz Make Connection 😊...</span>

              <span className={s.noRequestImage}>
                <BsHypnotize />
              </span>
            </div>{' '}
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
          <span>View All Friends List...</span>
          <BsArrowUpRight />
        </button>
      </div>
    </div>
  )
}

export default FriendsList
