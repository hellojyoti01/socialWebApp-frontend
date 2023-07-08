import React, { useState, useEffect } from 'react'
import { CSpinner } from '@coreui/react'
import Posts from 'src/components/content/post'
import { useLocation } from 'react-router-dom'

//css
import s from './showpost.module.css'
function Index() {
  const [post, setPost] = useState(null)

  const location = useLocation()
  useEffect(() => {
    if (location?.state?.post) {
      setPost(location.state.post)
    }
  }, [])

  return (
    <div className={s.show_post_panel}>
      {post ? (
        <div className={s.show_post}>
          <Posts post={post} />
        </div>
      ) : (
        <>
          <CSpinner />
        </>
      )}
    </div>
  )
}

export default Index
