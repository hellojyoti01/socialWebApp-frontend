//3rd Party
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import s from './pending.module.css'

//Icon
import { BsArrowUpRight, BsHypnotize } from 'react-icons/bs'

import PendingFriends from '../../pendingRequests'
function PendingFriendsList() {
  const pendingFriends = useSelector((el) => {
    return el.friendReducer.pendingRequests
  })

  const navigate = useNavigate()
  const handelNavigate = (e) => {
    e.preventDefault()
    navigate('/allPendingRequests')
  }
  return (
    <div className={s.container}>
      <h4>Pending Requests...</h4>
      <div className={s.wrapper}>
        {pendingFriends.length >= 1 ? (
          pendingFriends.map((el, idx) => {
            return <PendingFriends key={idx} pendingRequest={el} />
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
        <button onClick={(e) => handelNavigate(e)}>
          <span>View All Pending Requests</span>
          <BsArrowUpRight />
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PendingFriendsList
