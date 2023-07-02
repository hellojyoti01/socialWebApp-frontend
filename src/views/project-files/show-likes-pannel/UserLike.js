import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
//css
import s from './user_like.module.css'

//context
import { useAuth } from 'src/context/AuthProvider'

//Api
import postService from 'src/Api/postService'
import authService from 'src/Api/authService'
import friendService from 'src/Api/friendServices'
function UserLike({ like }) {
  const [userProfile, setUserProfile] = useState(null)
  const [relationShip, setRelationShip] = useState(null)
  const [toastActive, setToastActive] = useState(false)

  const authContext = useAuth()

  const navigate = useNavigate()
  useEffect(() => {
    if (like) {
      //find user post
      // find user Profile
      async function findUserProfile(param, token) {
        authService
          .findOneProfile({ _id: param }, token)
          .then((res) => {
            setUserProfile(res.data)
          })
          .catch((e) => {
            setUserProfile(null)
          })
      }
      async function checkRelationShipStatus(param, token) {
        friendService
          .checkRelationShipStatus({ user_id: param }, token)
          .then((res) => {
            setRelationShip(res.data)
          })
          .catch((e) => {
            console.log('Error In Profile fun', e)
          })
      }
      findUserProfile(like.like, authContext.token)

      checkRelationShipStatus(like.like, authContext.token)
    }
  }, [like])

  const handelClick = async (e) => {
    if (relationShip == -1) {
      navigate('/edit-profile', { state: { id: 1, user: userProfile } })
    }
    if (relationShip == 0 || relationShip == 1) {
      setToastActive(true)
      // Response
      friendService
        .sendRequest({ user_id: userProfile._id }, authContext.token)
        .then((res) => {
          toast.success(res.message, {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setTimeout(() => {
            setToastActive(false)
          }, 3000)
          setTimeout(() => {
            navigate('/')
          }, 1000)
        })
        .catch((e) => {
          const { data } = e.response
          toast.warning(data.message, {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setTimeout(() => {
            setToastActive(false)
          }, 3000)
        })
    }

    //! Accept Request bug
    if (relationShip == 2) {
      setToastActive(true)
      friendService
        .acceptRequest({ user_id: userProfile._id }, authContext.token)
        .then((res) => {
          toast.success(res.message, {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setTimeout(() => {
            setToastActive(false)
          }, 3000)
          setTimeout(() => {
            navigate('/')
          }, 1000)
        })
        .catch((e) => {
          const { data } = e.response
          toast.warning(data.message, {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          })
          setTimeout(() => {
            setToastActive(false)
          }, 3000)
        })
    }

    if (relationShip == 3) {
      setToastActive(true)
      conversationService
        .setConversation(
          {
            senderId: authContext.user._id,
            receiverId: userProfile._id,
          },
          authContext.token,
        )
        .then((res) => {
          setTimeout(() => {
            setToastActive(false)
          }, 2000)
          setTimeout(() => {
            navigate('/message')
          }, 1000)
        })
        .catch((e) => {
          setTimeout(() => {
            setToastActive(false)
          }, 2000)
          setTimeout(() => {
            navigate('/message')
          }, 1000)
        })
    }
  }

  return (
    <div className={s.likeContainer}>
      <div className={s.userWrapper}>
        <div class="avatar avatar-lg">
          {userProfile ? (
            <>
              <img class="avatar-img" src={userProfile.profile} alt="" />
              <span class="avatar-status bg-success"></span>
            </>
          ) : (
            <>
              <Skeleton variant="circular" width={40} height={40} />
            </>
          )}
        </div>
        {userProfile ? (
          <p>{userProfile.name}</p>
        ) : (
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        )}

        <div className={s.actions}>
          {relationShip == 0 ||
          relationShip == 1 ||
          relationShip == -1 ||
          relationShip == 2 ||
          relationShip == 3 ? (
            <button
              onClick={handelClick}
              style={{
                pointerEvents: toastActive ? 'none' : 'auto',
              }}
            >
              {relationShip == -1 ? 'Edit Profile' : ''}
              {relationShip == 0 ? 'Add Friend' : ''}
              {relationShip == 1 ? 'Already Requested' : ''}
              {relationShip == 2 ? 'Accept Request' : ''}
              {relationShip == 3 ? 'Sent Message' : ''}

              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          ) : (
            <Skeleton variant="rectangular" width={'190px'} height={'30px'} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserLike
