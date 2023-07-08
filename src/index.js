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
//Redux Store
import store from '../src/redux/store'

//Fast Render Start Here
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        {''}
        <App />
      </Provider>
    </AuthProvider>
  </BrowserRouter>,
)
