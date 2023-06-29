import React, { Suspense } from 'react'
import s from '../css/app_content.module.css'
import Search from 'src/components/content/searchBar'
import Story from 'src/components/content/story'
import Feed from 'src/components/content/feed'
import { Route, Routes } from 'react-router-dom'
import MessengerPanel from 'src/views/project-files/messenger-pannel'
import ProfilePanel from '../views/project-files/profile-pannel'
import EditProfilePanel from '../views/project-files/edit-profile-pannel'
import EditPostPanel from '../views/project-files/edit-post-pannel'
import ShowPostPanel from '../views/project-files/show-one-post-pannel'
import Post from '../components/content/post'

import CreatePostPannel from '../views/project-files/create-post-pannel'
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
          element={<Model rander={() => <MessengerPanel />} />}
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

        <Route
          exact
          path="/edit-post"
          name="Post Edit  Page"
          element={<Model rander={() => <EditPostPanel post={Post} />} />}
        />

        <Route
          exact
          path="/show-post"
          name="Post Edit  Page"
          element={<Model rander={() => <ShowPostPanel post={Post} />} />}
        />

        <Route
          exact
          path="/create-post"
          name="Post Edit  Page"
          element={<Model rander={() => <CreatePostPannel />} />}
        />
      </Routes>
    </div>
  )
}

export default React.memo(AppContent)
