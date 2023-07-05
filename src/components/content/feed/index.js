//3rd party
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//css
import s from './feed.module.css'

//post Component
import Posts from '../post/index'

//Context Api
import { usePost } from '../../../context/Postprovider'
import { useAuth } from 'src/context/AuthProvider'

//Redux
import { fetchAllPostFeed } from '../../../redux/postSlice'

function Feed() {
  const [feedPost, setFeedPost] = useState([])
  const authContext = useAuth()

  const [page, setPage] = useState(1)
  useEffect(() => {
    if (authContext.token && page) {
    }
  }, [page])
  return (
    <div className={s.container}>
      <div className={s.top}>
        <h4>Feed</h4>
        <div className={s.btn_group}>
          <button>
            Latest
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button>
            Popular
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div className={s.buttom}>
        {/* <Posts post={post} /> */}
        {/* {feed.map((el, idx) => {
          return <Posts post={el} key={idx} />
        })} */}
      </div>
    </div>
  )
}

export default Feed

//profile username post caption hashtag like comment total like tol
