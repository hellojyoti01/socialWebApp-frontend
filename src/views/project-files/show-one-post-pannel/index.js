import React, { useEffect, useState } from 'react'
import {
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai'

import { BsFillBookmarksFill } from 'react-icons/bs'

import s from './showpost.module.css'
import { useLocation } from 'react-router-dom'
function Index() {
  const [post, setPost] = useState(null)
  const [user, setUser] = useState(null)
  const location = useLocation()
  useEffect(() => {
    if (location?.state?.post) {
      setPost(location.state.post)
      setUser(location.state.user)
    }
  }, [])

  return (
    <div className={s.show_post_panel}>
      {post && user ? (
        <div className={s.post_card}>
          <div className={s.post_header}>
            <img src={user.profile} alt="User Avatar" className={s.avatar} />
            <h3 className={s.username}>{user.userName}</h3>
            <button className={s.settings_btn}>
              <AiOutlineSetting />
            </button>
          </div>
          <img src={post.post} alt="Post Image" className={s.post_image} />
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
              <span className={s.likes}>{user.totalLike} likes</span>
              <span className={s.comments}>{user.totalComment} comments</span>
            </div>
          </div>
        </div>
      ) : (
        <>Lodeing</>
      )}
    </div>
  )
}

export default Index
