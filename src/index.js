import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import AuthProvider from '../src/context/authContext/Provider'
import { BrowserRouter } from 'react-router-dom'
import { ChakraBaseProvider } from '@chakra-ui/react'

import store from './store'
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
