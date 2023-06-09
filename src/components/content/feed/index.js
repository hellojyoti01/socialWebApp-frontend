import React from 'react'
import s from './feed.module.css'
import Posts from '../post/index'

function Feed() {
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
        <Posts />
      </div>
    </div>
  )
}

export default Feed

//profile username post caption hashtag like comment total like tol
