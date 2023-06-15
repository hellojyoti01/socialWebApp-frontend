//3rd party
import React, { useState, useEffect } from 'react'
import { CAvatar } from '@coreui/react'
//css
import s from './profile.module.css'
//assets
import { avatar } from 'src/assets'
import { useAuth } from 'src/context/authContext/Provider'
import postService from 'src/Api/postService'
import friendService from 'src/Api/friendServices'
export default function Profile(...props) {
  const [post, setPost] = useState([])
  const [friend, setFriends] = useState([])
  const authContext = useAuth()
  console.log(authContext)

  //find All Post
  async function findAllPost() {
    postService
      .totalPost({ posted_by: authContext.user._id }, authContext.token)
      .then((res) => {
        if (res.data.length > 0) {
          setPost([...res.data])
        }
      })
      .catch((e) => {
        console.log('Error In Profile fun', e)
      })
  }

  async function findAllFriends() {
    friendService
      .totalFriend({ posted_by: authContext.user._id }, authContext.token)
      .then((res) => {
        console.log(res.data, 'totalFrnd')
        if (res.data.length > 0) {
          setFriends([...res.data])
        }
      })
      .catch((e) => {
        console.log('Error In Profile fun', e)
      })
  }
  useEffect(() => {
    console.log('Execute')

    if (authContext.token) {
      findAllPost()
      findAllFriends()
    }
  }, [authContext.token])

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <CAvatar
          src={authContext.user?.profile ? authContext.user.profile : avatar}
          status="success"
          size="xl"
        />
        <div className={s.profile_info}>
          <h4>{authContext.user?.name ? authContext.user.name : '--'} </h4>
          <p>{authContext.user?.address ? authContext.user.address : 'Kolkata, NewTown , India'}</p>
        </div>
        <div className={s.followers}>
          <div className={s.friends}>
            <span>{friend.length !== 0 ? `${friend.length}` : '--'}</span>
            <span>friends</span>
          </div>
          <div className={s.posts}>
            <span>{post.length !== 0 ? `${post.length}` : '--'}</span>
            <span>Posts</span>
          </div>
        </div>
      </div>
    </div>
  )
}
