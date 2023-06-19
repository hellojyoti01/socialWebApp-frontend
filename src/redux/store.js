import { configureStore } from '@reduxjs/toolkit'
import logInUserReducer from '../redux/currentLogInuser.Slice'
const store = configureStore({
  reducer: {
    logInUser: logInUserReducer,
  },
})

export default store
