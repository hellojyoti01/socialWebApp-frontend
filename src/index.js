//3rd party request fast load
import 'react-app-polyfill/stable'
import 'core-js'
import 'react-toastify/dist/ReactToastify.css'

//3rd party lib
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

//local
import App from './App'

//Context provider
import AuthProvider from './context/AuthProvider'
import PostProvider from './context/Postprovider'
import FriendProvider from './context/friendProvider'
//Redux Store
import store from '../src/redux/store'

//Fast Render Start Here
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PostProvider>
        <FriendProvider>
          <Provider store={store}>
            {''}
            <App />
          </Provider>
        </FriendProvider>
      </PostProvider>
    </AuthProvider>
  </BrowserRouter>,
)
