import React, { useEffect } from 'react'
import s from './friend_list.module.css'
import { CAvatar } from '@coreui/react'
import { FiDivideSquare, FiMessageCircle } from 'react-icons/fi'
import { BsArrowUpRight } from 'react-icons/bs'
import { useFriend } from 'src/context/friendProvider'
import { useAuth } from 'src/context/AuthProvider'
function FriendsList() {
  const friendContext = useFriend()
  const authContext = useAuth()

  useEffect(() => {
    // friendContext.findAllFriends(authContext.user._id, authContext.token)
  }, [])
  return (
    <div className={s.container}>
      <h4>Friends</h4>
      <div className={s.wrapper}>
        {friendContext.friends.length
          ? friendContext.friends.map((el, idx) => {
              return (
                <div className={s.item} key={idx}>
                  <div className={s.profile}>
                    <li className={s.each_item}>
                      {' '}
                      <CAvatar src={el.profile} status="success" />
                      <span>{el.name}</span>
                    </li>
                  </div>
                  <div className={s.icon}>
                    <FiMessageCircle />
                  </div>
                </div>
              )
            })
          : 'No Friend'}
      </div>
      <div className={s.view_all}>
        <button>
          <span>View All</span>
          <BsArrowUpRight />
        </button>
      </div>
    </div>
  )
}

export default FriendsList
