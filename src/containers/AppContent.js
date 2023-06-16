import React, { Suspense } from 'react'
import s from '../css/app_content.module.css'
import Search from 'src/components/content/searchBar'
import Story from 'src/components/content/story'
import Feed from 'src/components/content/feed'
import { Route, Routes } from 'react-router-dom'
import MessagePanel from 'src/views/project-files/message-pannel'
import ProfilePanel from '../views/project-files/profile-pannel'
import EditProfilePanel from '../views/project-files/edit-profile-pannel'
import Model from '../model'
const AppContent = () => {
  return (
    <div className={s.content_container}>
      <Routes>
        <Route
          exact
          path="/"
          name="main Page "
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
        <Route
          exact
          path="/profile"
          name="Profile Page"
          element={<Model rander={() => <ProfilePanel />} />}
        />

        <Route
          exact
          path="/edit-profile"
          name="Profile Edit  Page"
          element={<Model rander={() => <EditProfilePanel />} />}
        />
      </Routes>
    </div>
  )
}

export default React.memo(AppContent)
