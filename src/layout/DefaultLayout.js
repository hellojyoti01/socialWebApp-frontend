import React from 'react'
import { AppContent, AppSidebarRight, AppSidebarLeft } from '../containers/index'
import s from '../css/layout.module.css'
const DefaultLayout = () => {
  return (
    <div className={s.layout_container}>
      {/* ---------------------------- Left Sidebar Menu --------------------------- */}
      <AppSidebarLeft />

      {/* ----------------------------------- Main Content ----------------------------------- */}
      <AppContent />

      {/* ----------------------------------- Right Side Bar ----------------------------------- */}
      <AppSidebarRight />
    </div>
  )
}

export default DefaultLayout
