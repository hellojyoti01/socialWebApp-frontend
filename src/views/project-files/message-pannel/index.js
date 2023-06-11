import React from 'react'
import s from './message-pannel.module.css'
import { BsCameraVideo } from 'react-icons/bs'
function MessagePanel() {
  return (
    <div className={s.messaging_panel}>
      {/* -------------------------------- userlist -------------------------------- */}
      <div className={s.user_list}>
        <div className={`${s.user} ${s.active}`}>
          <img
            src="https://cdn.statusqueen.com/dpimages/thumbnail/sad%20baby%20girl-67.jpg"
            alt="User 1 Avatar"
            className={s.avatar}
          />
          <h3 className={s.username}>Mickey </h3>
        </div>
        <div className={s.user}>
          <img
            src="https://cdn.statusqueen.com/dpimages/thumbnail/cute4-248.jpg"
            alt="User 2 Avatar"
            className={s.avatar}
          />
          <h3 className={s.username}>Liza Panigrahi</h3>
        </div>
        <div className={s.user}>
          <img
            src="https://cdn.statusqueen.com/dpimages/thumbnail/cute%20girl-279.jpg"
            alt="User 3 Avatar"
            className={s.avatar}
          />
          <h3 className={s.username}>Lipi Roy</h3>
        </div>
      </div>

      {/* ------------------------------ chat pannel----------------------------- */}
      <div className={s.chat_area}>
        {/* ------------------------------ User Name Top ----------------------------- */}
        <div className={s.friend_name}>
          {' '}
          <div className={`${s.user}`}>
            <img
              src="https://cdn.statusqueen.com/dpimages/thumbnail/sad%20baby%20girl-67.jpg"
              alt="User 1 Avatar"
              className={s.avatar}
            />
            <h3 className={s.username}>Mickey </h3>
          </div>
          <div className={s.video_call}>
            <san>
              <BsCameraVideo />
            </san>
          </div>
        </div>

        {/* ------------------------------ Message Area ------------------------------ */}
        <div className={s.friend}>
          <div className={`${s.message} ${s.incoming}`}>
            <p>Hello!</p>
          </div>
          <div className={`${s.message} ${s.outgoing}`}>
            <p>Hi! How are you?</p>
          </div>
        </div>

        {/* ------------------------------- Message Box ------------------------------ */}
        <div className={s.message_input}>
          <textarea placeholder="Type a message..." rows="1" className={s.textarea}></textarea>
          <button className={s.send_btn}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default MessagePanel
