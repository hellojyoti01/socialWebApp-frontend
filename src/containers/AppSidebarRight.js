import React from 'react'
import { CSidebar, CSide } from '@coreui/react'
import s from '../css/sidebar.module.css'
function AppSidebarRight() {
  return (
    // <CSidebar
    //   position="fixed"
    //   right="0"
    //   // unfoldable={unfoldable}
    //   // visible={sidebarShow}
    //   // onVisibleChange={(visible) => {
    //   //   dispatch({ type: 'set', sidebarShow: visible })
    //   // }}
    //   className={s.sidebarRight_container}
    // >
    //   Right Sidebar
    // </CSidebar>
    <div className={s.sidebarRight_container}> Right SideBar</div>
  )
}

export default AppSidebarRight
