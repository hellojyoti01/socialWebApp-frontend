//3rd party
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//css
import s from './suggestion.module.css'
//icon

import { BsArrowUpRight, BsHypnotize } from 'react-icons/bs'

import SentRequests from 'src/components/sentRequests'

function SentRequestList() {
  const sentFriendRequest = useSelector((el) => {
    return el.friendReducer.sentRequests
  })

  const navigate = useNavigate()

  const handelNavigate = (e) => {
    e.preventDefault()
    navigate('/allSentRequests')
  }

  return (
    <div className={s.container}>
      <h4>Sent Requests...</h4>
      <div className={s.wrapper}>
        {sentFriendRequest.length >= 1 ? (
          sentFriendRequest.slice(0, 4).map((el, idx) => {
            return <SentRequests sentRequest={el} key={idx} />
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
        <button onClick={(e) => handelNavigate(e)}>
          <span>View All Sent Requests...</span>
          <BsArrowUpRight />
        </button>
      </div>
    </div>
  )
}

export default SentRequestList
