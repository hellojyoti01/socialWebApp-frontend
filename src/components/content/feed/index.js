//3rd party
import React, { useEffect, useState } from 'react'

//css
import s from './feed.module.css'

//post Component
import Posts from '../post/index'

//Context Api
import { usePost } from '../../../context/Postprovider'
import { useAuth } from 'src/context/AuthProvider'

//Api
import postService from 'src/Api/postService'
function Feed() {
  const [feed, setFeed] = useState([])
  const postContent = usePost()
  const authContext = useAuth()

  useEffect(() => {
    if (postContent.post.length) {
      const newPost = postContent.post.map((el) => {
        return {
          ...el,
          profile: authContext.user.profile,
        }
      })

      setPost((prev) => {
        return [...prev, ...newPost]
      })
    }
  }, [postContent.post.length])

  const [page, setPage] = useState(1)
  useEffect(() => {
    if (authContext.token && page) {
      postService.findAllPostFeed({ page: page }, authContext.token).then((res) => {
        setFeed(res.data)
      })
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
        {feed.map((el, idx) => {
          return <Posts post={el} key={idx} />
        })}
      </div>
    </div>
  )
}

export default Feed

//profile username post caption hashtag like comment total like tol
