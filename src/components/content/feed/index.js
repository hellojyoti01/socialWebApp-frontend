//3rd party
import React from 'react'

//css
import s from './feed.module.css'

//post Component
import Posts from '../post/index'

function Feed({ feedPost }) {
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
        {feedPost.length >= 1 ? (
          feedPost.map((el, idx) => {
            return <Posts post={el} key={idx} />
          })
        ) : (
          <>No Post In Feed</>
        )}
      </div>
    </div>
  )
}

export default Feed

//profile username post caption hashtag like comment total like tol
