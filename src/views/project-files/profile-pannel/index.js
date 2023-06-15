import React from 'react'
import { CAvatar } from '@coreui/react'
import s from './profile_pannel.module.css'
function Index() {
  return (
    <div className={s.profile_panel}>
      <header>
        <div className={s.profile}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtyVGp8jhiIKUZwCH5Vxr0WFnWMoWzDCShQoMLKvW9bQ&s"
            alt="Profile Icon"
          />
        </div>
        <ul>
          <li>
            <strong>Posts</strong> 100
          </li>
          <li>
            <strong>Friends</strong> 1000
          </li>
        </ul>
      </header>
      {/* <section className={s.info}>
        
          <li>
            <strong>Following:</strong> 500
          </li>
        </ul>
        <p className={s.bio}>This is the user's bio.</p>
      </section> */}
      {/* <section className={s.posts}>
        <div className={s.post}>
          <img
            src="https://freehindiwishes.com/wp-content/uploads/2020/10/Alone-Sad-Girl-DP-For-Facebook-Whatsapp-8.jpg"
            alt="Post 1"
          />
        </div>
        <div className={s.post}>
          <img
            src="https://cdn4.sharechat.com/img_830822_51a200c_1669317228030_sc.jpg?tenant=sc&referrer=post-rendering-service-ps&f=img_830822_51a200c_1669317228030_sc.jpg"
            alt="Post 2"
          />
        </div>
        <div className={s.post}>
          <img
            src="https://i.pinimg.com/564x/17/12/29/17122918a81269d12dff29499f48f4a8.jpg"
            alt="Post 3"
          />
        </div>
      </section>{' '} */}
    </div>
  )
}

export default Index
