import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//css
import s from './all_sent_requests.module.css'
//icon

import { BsArrowUpRight, BsHypnotize } from 'react-icons/bs'
import { GiNextButton, GiPreviousButton } from 'react-icons/gi'
// Context API
import { useAuth } from 'src/context/AuthProvider'
//redux
import { fetchAllSentRequests } from '../../../redux/friendSlice'

import SentRequests from 'src/components/sentRequests'

function Index() {
  const sentFriendRequest = useSelector((el) => {
    return el.friendReducer.sentRequests
  })
  const [currentPage, setCurrentPage] = useState(1)

  const authContext = useAuth()
  const dispatch = useDispatch()
  useEffect(() => {
    if (authContext?.user && authContext?.token) {
      dispatch(fetchAllSentRequests({ page: currentPage, token: authContext.token }))
    }
  }, [currentPage])
  return (
    <div className={s.sentRequests_panel}>
      <div className={s.sentRequests}></div>
      <div className={s.pagination}>
        <div className={s.paginate_wrapper}>
          {' '}
          <div className={s.paginate}>
            <button>
              <GiPreviousButton />
              <span className={s.prev}>Prev</span>
            </button>
          </div>
          <div className={s.paginate}>
            <button>
              <span className={s.next}>Next</span>
              <GiNextButton />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Index
