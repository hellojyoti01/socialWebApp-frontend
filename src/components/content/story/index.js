import React from 'react'
import s from './story.module.css'
function Story() {
  const arr = [1, 2, 3, 4, 5, 6]
  return (
    <div className={s.container}>
      <div className={s.own_wrapper}>
        <div className={s.story}>Story</div>
      </div>
      <div className={s.friend_wrapper}>
        {arr.map((el) => {
          return (
            <div className={s.story} key={el}>
              Story
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Story
