import React from 'react'
import s from '../css/sidebar.module.css'
import PendingFriendsList from 'src/components/sidebarRight/pending'
import SentRequestList from '../components/sidebarRight/SentRequestList'
function AppSidebarRight() {
  return (
    <div className={s.sidebarRight_container}>
      <PendingFriendsList />
      <SentRequestList />
    </div>
  )
}

export default AppSidebarRight
