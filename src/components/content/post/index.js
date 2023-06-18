import React from 'react'
import {
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai'

import { BsFillBookmarksFill } from 'react-icons/bs'
import s from './post.module.css'
function Posts() {
  const arrr = [
    {
      profile: 'https://cdn.statusqueen.com/dpimages/thumbnail/Boy_Stylish__Dp_Image-2277.jpg',
      userName: 'Roman Roy',
      post: 'https://cdn.statusqueen.com/dpimages/thumbnail/dp%20image90-702.jpg',
      caption:
        'Passionate developers are always curious and have unending enthusiasm for solving problems.',
      hashTag: ['#coder', '#hackeing'],
      totalLike: 34,
      totalComment: 450,
    },
    {
      profile: 'https://achishayari.com/wp-content/uploads/2023/05/Whatsapp-DP-1536x1536.webp',
      userName: 'Roman Roy',
      post: 'https://cdn.statusqueen.com/dpimages/thumbnail/cute%20girl%20-298.jpg',
      caption:
        'Passionate developers are always curious and have unending enthusiasm for solving problems.',
      hashTag: ['#coder', '#hackeing'],
      totalLike: 14,
      totalComment: 45,
    },
    {
      profile: 'https://cdn.statusqueen.com/dpimages/thumbnail/cat-111.jpg',
      userName: 'Somya shen',
      post: 'https://cdn.statusqueen.com/dpimages/thumbnail/cute%20girl1-299.jpg',
      caption:
        'Passionate developers are always curious and have unending enthusiasm for solving problems.',
      hashTag: ['#coder', '#hackeing'],
      totalLike: 34,
      totalComment: 900,
    },
    {
      profile: 'https://cdn.statusqueen.com/dpimages/thumbnail/sweet%20girl-261.jpg',
      userName: 'liza liza',
      post: 'https://cdn.statusqueen.com/dpimages/thumbnail/cute7-195.jpg',
      caption:
        'Passionate developers are always curious and have unending enthusiasm for solving problems.',
      hashTag: ['#coder', '#hackeing'],
      totalLike: 4,
      totalComment: 40,
    },
    {
      profile:
        'https://upload.wikimedia.org/wikipedia/commons/7/70/Mahendra_Singh_Dhoni_January_2016_%28cropped%29.jpg',
      userName: 'Mahi Mahi',
      post: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn1.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcTc43ZFcnoe29O2oetJtDAYimX8rtk-8Oke1HDZ97k85nab5qqr6lECi8YlNNv1hZYiXrGcRy7qkRJnItQ&psig=AOvVaw1tt6xi8Vp83WeI3CZ7hcwf&ust=1686397746162000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiXjqiPtv8CFQAAAAAdAAAAABAE',
      caption:
        'Passionate developers are always curious and have unending enthusiasm for solving problems.',
      hashTag: ['#coder', '#hackeing'],
      totalLike: 34,
      totalComment: 450,
    },
  ]
  const l = []
  return (
    <>
      {arrr.map((el, idx) => {
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
