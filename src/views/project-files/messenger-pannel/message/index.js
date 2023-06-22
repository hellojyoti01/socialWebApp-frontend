import React, { useState } from 'react'

import TimeAgo from 'react-timeago'
import s from './message.module.css'

function Index({ message, own, user }) {
  console.log(message)
  return (
    <div className={own ? `${s.message} ${s.own}` : s.message}>
      <div className={s.messageTop}>
        {user ? <img className={s.messageImg} src={user.profile} alt="" /> : ''}

        <p className={s.messageText}>
          {message.text ? message.text : message.type ? 'typing ' : ''}
        </p>
      </div>
      <div className={s.messageBottom}>
        {message.createdAt ? <TimeAgo date={message.createdAt} /> : ''}
      </div>
    </div>
  )
}

export default Index
