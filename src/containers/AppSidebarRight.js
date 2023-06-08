import React from 'react'
import { CSidebar, CSide } from '@coreui/react'
import s from '../css/sidebar.module.css'
import PendingFriendsList from 'src/components/sidebarRight/pending'
import SuggestionFriendsList from '../components/sidebarRight/suggestion'
function AppSidebarRight() {
  return (
    <div className={s.sidebarRight_container}>
      <PendingFriendsList />
      <SuggestionFriendsList />
    </div>
  )
}

export default AppSidebarRight
