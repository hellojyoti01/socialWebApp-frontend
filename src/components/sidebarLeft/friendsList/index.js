import React from 'react'
import s from './friend_list.module.css'
import { CAvatar } from '@coreui/react'
import { FiDivideSquare, FiMessageCircle } from 'react-icons/fi'
import { BsArrowUpRight } from 'react-icons/bs'
function FriendsList() {
  const arr = [0, 1, 2, 3, 4]
  const src = [
    'https://cdn.statusqueen.com/dpimages/thumbnail/cute4-248.jpg',
    'https://cdn.statusqueen.com/dpimages/thumbnail/alone3-274.jpg',
    'https://cdn.statusqueen.com/dpimages/thumbnail/cute%20girl%20-298.jpg',
    'https://cdn.statusqueen.com/dpimages/thumbnail/IMAGE29-437.jpg',
    'https://cdn.statusqueen.com/dpimages/thumbnail/IMAGE25-436.jpg',
    'https://cdn.statusqueen.com/dpimages/thumbnail/dpimage21-376.jpg',
  ]
  const name = [
    'somya roy',
    'jyoti prakash panigrahi',
    'arya khan',
    'sai pallavi',
    ' allu arjun',
    'puja panda',
  ]

  return (
    <div className={s.container}>
      <h4>Friends</h4>
      <div className={s.wrapper}>
        {arr.map((el) => {
          return (
            <div className={s.item} key={el}>
              <div className={s.profile}>
                <li className={s.each_item}>
                  {' '}
                  <CAvatar src={src[el]} status="success" />
                  <span>{name[el]}</span>
                </li>
              </div>
              <div className={s.icon}>
                <FiMessageCircle />
              </div>
            </div>
          )
        })}
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
