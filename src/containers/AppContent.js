import React, { Suspense } from 'react'
import s from '../css/app_content.module.css'
import Search from 'src/components/content/searchBar'
import Story from 'src/components/content/story'
import Feed from 'src/components/content/feed'
import { Route, Routes } from 'react-router-dom'
import MessagePanel from 'src/views/project-files/message-pannel'
import Model from '../model'
const AppContent = () => {
  return (
    <div className={s.content_container}>
      <Routes>
        <Route
          exact
          path="/"
          name="Content Page "
          element={
            <>
              <Search />
              <Story />
              <Feed />
            </>
          }
        />
        <Route
          exact
          path="/message"
          name="Message Page "
          element={<Model rander={() => <MessagePanel />} />}
        />
      </Routes>
    </div>
  )
}

export default React.memo(AppContent)
