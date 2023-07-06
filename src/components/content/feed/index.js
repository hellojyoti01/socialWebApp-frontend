//3rd party
import React, { useEffect, useState, useRef } from 'react'

//css
import s from './feed.module.css'

//post Component
import Posts from '../post/index'
import PostSkeleton from '../feed/postSkeleton'

//Context Api

import { useAuth } from 'src/context/AuthProvider'

import postService from 'src/Api/postService'

function Feed({ feedPost, setFeedPost }) {
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
        {feedPost ? (
          <>
            {feedPost.length >= 1 ? (
              feedPost.map((el, idx) => {
                return <Posts post={el} key={idx} setFeedPost={setFeedPost} />
              })
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            {[1, 2].map((el, idx) => (
              <PostSkeleton key={idx} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Feed

//profile username post caption hashtag like comment total like tol
