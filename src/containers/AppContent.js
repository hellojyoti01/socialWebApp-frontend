import React, { Suspense } from 'react'
import s from '../css/app_content.module.css'
import { CContainer } from '@coreui/react'

const AppContent = () => {
  return <div className={s.content_container}>Content</div>
}

export default React.memo(AppContent)
