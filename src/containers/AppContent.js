import React, { Suspense } from 'react'
import s from '../css/app_content.module.css'
import Search from 'src/components/content/searchBar'
import Story from 'src/components/content/story'
import Feed from 'src/components/content/feed'

const AppContent = () => {
  return (
    <div className={s.content_container}>
      <Search />
      <Story />
      <Feed />
    </div>
  )
}

export default React.memo(AppContent)
