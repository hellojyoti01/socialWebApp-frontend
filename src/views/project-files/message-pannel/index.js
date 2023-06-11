import React from 'react'
import s from './message-pannel.module.css'
function MessagePanel() {
  return (
    <div className={s.messaging_panel}>
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
      <div className={s.chat_area}>
        hello
        {/* <div className={s.friend}>
          <div className={`${s.message} ${s.incoming}`}>
            <p>Hello!</p>
          </div>
          <div className={`${s.message} ${s.outgoing}`}>
            <p>Hi! How are you?</p>
          </div>
          <div className={`${s.message} ${s.incoming}`}>
            {/* <p>I'm doing great. How about you?</p> */}
        {/* </div>
        </div> */}
        {/* <div className={s.message_input}>
          <textarea placeholder="Type a message..." rows="1"></textarea>
          <button className={s.send_btn}>Send</button>
        </div> */}
      </div>
    </div>
  )
}

export default MessagePanel
