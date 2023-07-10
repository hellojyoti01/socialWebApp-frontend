import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//css
import s from './all-pending-requests.module.css'
//icon

import { BsArrowUpRight, BsHypnotize } from 'react-icons/bs'
import { GiNextButton, GiPreviousButton } from 'react-icons/gi'
// Context API
import { useAuth } from 'src/context/AuthProvider'
//redux
import { fetchAllPendingRequests } from '../../../redux/friendSlice'

import PendingRequests from '../../../components/pendingRequests'

function Index() {
  const pendingFriends = useSelector((el) => {
    return el.friendReducer.pendingRequests
  })
  const [currentPage, setCurrentPage] = useState(1)
  const authContext = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Prev Page Function Call
  const handelPrevious = (e) => {
    e.preventDefault()
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  //Next Page Function Call
  const handelNext = (e) => {
    e.preventDefault()
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    if (authContext?.user && authContext?.token) {
      dispatch(fetchAllPendingRequests({ page: currentPage, token: authContext.token }))
    }
  }, [currentPage])
  return (
    <div className={s.sentRequests_panel}>
      <div className={s.sentRequests}>
        {pendingFriends.length >= 1 ? (
          pendingFriends.map((el, idx) => {
            return <PendingRequests pendingRequest={el} key={idx} />
          })
        ) : (
          <section className={s.page_404}>
            <div className={s.container}>
              <div className={s.row}>
                <div class="col-sm-12 ">
                  <div class="col-sm-10 col-sm-offset-1  text-center">
                    <div className={s.four_zero_four_bg}>
                      <h1 class="text-center "></h1>
                    </div>

                    <div className={s.contant_box_404}>
                      <h3 class="h2">Your sent requests not more ....</h3>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.link_404} onClick={() => navigate('/')}>
                Go Back To Home
              </div>
            </div>
          </section>
        )}
      </div>
      <div className={s.pagination}>
        <div className={s.paginate_wrapper}>
          {' '}
          <div className={s.paginate}>
            <button onClick={(e) => handelPrevious(e)}>
              <GiPreviousButton />
              <span className={s.prev}>Prev</span>
            </button>
          </div>
          <div className={s.paginate}>
            <button onClick={(e) => handelNext(e)}>
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
