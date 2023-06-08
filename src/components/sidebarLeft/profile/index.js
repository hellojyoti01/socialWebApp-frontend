import React from 'react'
import s from './profile.module.css'
import { CAvatar } from '@coreui/react'
export default function Profile(...props) {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <CAvatar
          src={`https://cdn.statusqueen.com/dpimages/thumbnail/cute%20girl-191.jpg`}
          status="success"
          size="xl"
        />
        <div className={s.profile_info}>
          <h4>Liza Panigrahi</h4>
          <p>Kolkata, NewTown , India</p>
        </div>
        <div className={s.followers}>
          <div className={s.friends}>
            <span>89</span>
            <span>friends</span>
          </div>
          <div className={s.posts}>
            <span>90</span>
            <span>Posts</span>
          </div>
        </div>
      </div>
    </div>
  )
}
