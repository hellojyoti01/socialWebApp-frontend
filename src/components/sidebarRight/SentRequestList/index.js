//3rd party
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//css
import s from './suggestion.module.css'
//icon

import { BsArrowUpRight, BsHypnotize } from 'react-icons/bs'

// Context API
import { useAuth } from 'src/context/AuthProvider'
//redux
import { fetchAllSentRequests } from '../../../redux/friendSlice'

import SentRequests from 'src/components/sentRequests'

function SentRequestList() {
  const sentFriendRequest = useSelector((el) => {
    return el.friendReducer.sentRequests
  })
  const authContext = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handelNavigate = (e) => {
    e.preventDefault()
    navigate('/allSentRequests')
  }

  useEffect(() => {
    if (authContext?.user && authContext?.token) {
      dispatch(fetchAllSentRequests({ token: authContext.token }))
    }
  }, [])

  console.log(sentFriendRequest, 'sent Request')
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
