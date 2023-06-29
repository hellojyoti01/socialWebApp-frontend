//3rd party
import React, { useEffect, useState } from 'react'
import axios from 'axios'

//Free Location
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
//icon
import {
  AiOutlineSetting,
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai'
import { BsFillBookmarksFill } from 'react-icons/bs'
//css
import s from './post.module.css'

//api
import postService from 'src/Api/postService'
import authService from 'src/Api/authService'

import { useAuth } from 'src/context/AuthProvider'

function Posts({ post }) {
  console.log(post, 'post')
  const [user, setUser] = useState(null)
  const [pic, setPic] = useState(null)
  const [location, setLocation] = useState(null)

  const authContext = useAuth()
  useEffect(() => {
    if (post && authContext.token) {
      setPic(post)
      authService.findOneProfile({ _id: post.postedBY }, authContext.token).then((res) => {
        setUser(res.data)
      })

      if (post.location) {
        const fetchData = async () => {
          try {
            const latitude = post.location.coordinates[1]
            const longitude = post.location.coordinates[0]
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            )
            const data = await response.json()
            console.log(data, data)
            // setAddress(data.display_name)
            setLocation(data.display_name)
          } catch (error) {
            console.error(error)
            setLocation('')
          }
        }

        fetchData()
      }
    }
  }, [authContext.token, post])

  return (
    <>
      <div className={s.post_card}>
        {post && user ? (
          <>
            <div className={s.post_header}>
              <img src={user.profile} alt="User Avatar" className={s.avatar} />
              <h3 className={s.username}>{user.userName}</h3>
              <button className={s.settings_btn}>
                <AiOutlineSetting />
              </button>
            </div>
            <img src={post.media[0]} alt="Post Image" className={s.post_image} />
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
                <span className={s.likes}>0 likes</span>
                <span className={s.comments}>0 comments</span>
              </div>
            </div>
          </>
        ) : (
          <>Lodeing</>
        )}
      </div>
    </>
  )
}

export default Posts
