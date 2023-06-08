import React from 'react'

import s from '../css/sidebar.module.css'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config
import navigation from '../_nav'
import Profile from 'src/components/sidebarLeft/profile'
const AppSidebarLeft = () => {
  return (
    <div className={s.sidebarLeft_container}>
      <Profile />
      <AppSidebarNav items={navigation} />
    </div>
  )
}

export default React.memo(AppSidebarLeft)
