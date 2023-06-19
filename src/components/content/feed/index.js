import React, { useEffect, useState } from 'react'
import s from './feed.module.css'
import Posts from '../post/index'
import { usePost } from '../../../context/Postprovider'
import { useAuth } from 'src/context/AuthProvider'
function Feed() {
  const [post, setPost] = useState([])
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
      <div className={s.button}>
        <Posts post={post} />
      </div>
    </div>
  )
}

export default Feed

//profile username post caption hashtag like comment total like tol
