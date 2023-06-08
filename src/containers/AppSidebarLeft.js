import React from 'react'

import s from '../css/sidebar.module.css'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config
import navigation from '../_nav'

const AppSidebarLeft = () => {
  return <div className={s.sidebarLeft_container}>Left Sidebar</div>
}

export default React.memo(AppSidebarLeft)
