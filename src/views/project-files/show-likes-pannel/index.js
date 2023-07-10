//3rd Party
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CPagination, CPaginationItem } from '@coreui/react'
import s from './show_likes.module.css'

//APi
import postService from 'src/Api/postService'
import { useAuth } from 'src/context/AuthProvider'

//component
import UserLike from './UserLike'
function Index() {
  const [post, setPost] = useState(null)
  const [previousPage, setPreviousPageDisable] = useState(false)
  const [likes, setLikes] = useState(null)
  const [page, setPage] = useState(1)

  const location = useLocation()
  const navigate = useNavigate()
  const authContext = useAuth()

  // Fast Load Component Set Post
  useEffect(() => {
    if (location?.state?.post) {
      setPost(location.state.post)
    }
  }, [])

  // Find All Like By Pagination
  useEffect(() => {
    if (post) {
      postService
        .findAllLikePost({ post_id: post._id, page: page }, authContext.token)
        .then((res) => {
          setLikes(res.data)
        })
    }
  }, [page, post])

  // Disable Or enable Page
  useEffect(() => {
    if (page == 1) {
      setPreviousPageDisable(true)
    }
  }, [page])

  //Function Decrease PAge
  const handelPagePrevious = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  // Function Increase Page
  const handelPageNext = () => {
    setPage(page + 1)
  }

  return (
    <div className={s.likes_pannel}>
      {likes ? (
        <div className={s.like_pannel}>
          {likes.length ? (
            likes.map((e, idx) => {
              return <UserLike like={e} key={idx} />
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
                        <h3 class="h2">Look like you're lost</h3>

                        <p>No Like Found </p>
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
      ) : (
        <div className={s.loading_screen}>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className={s.pagination}>
        <CPagination aria-label="Page navigation example" className={s.pagenate}>
          <CPaginationItem aria-label="Previous" disabled={previousPage}>
            <span aria-hidden="true" onClick={handelPagePrevious}>
              &laquo;
            </span>
          </CPaginationItem>

          <CPaginationItem aria-label="Next">
            <span aria-hidden="true" onClick={handelPageNext}>
              &raquo;
            </span>
          </CPaginationItem>
        </CPagination>
      </div>
    </div>
  )
}

export default Index
