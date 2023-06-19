import React from 'react'
import {
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai'

import { BsFillBookmarksFill } from 'react-icons/bs'
import s from './post.module.css'
function Posts({ post }) {
  return (
    <>
      {post.map((el, idx) => {
        return (
          <div className={s.post_card} key={idx}>
            <div className={s.post_header}>
              <img src={el.profile} alt="User Avatar" className={s.avatar} />
              <h3 className={s.username}>{el.userName}</h3>
              <button className={s.settings_btn}>
                <AiOutlineSetting />
              </button>
            </div>
            <img src={el.post} alt="Post Image" className={s.post_image} />
            <div className={s.post_footer}>
              <div className={s.post_icons}>
                <div className={s.left_icons}>
                  <button className={s.like_btn}>
                    <AiOutlineHeart />
                  </button>
                  <button className={s.comment_btn}>
                    <AiOutlineComment />
                  </button>
                  <button className={s.share_btn}>
                    <AiOutlineShareAlt />
                  </button>
                </div>
                <button className={s.save_btn}>
                  <BsFillBookmarksFill />
                </button>
              </div>
              <p className={s.caption}>Beautiful sunset</p>
              <div className={s.hashtags}>
                <a href="#">#sunset</a>
                <a href="#">#photography</a>
                <a href="#">#nature</a>
              </div>
              <div className={s.likes_comments}>
                <span className={s.likes}>{el.totalLike} likes</span>
                <span className={s.comments}>{el.totalComment} comments</span>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Posts
