import { configureStore } from '@reduxjs/toolkit'
import logInUserReducer from '../redux/currentLogInuser.Slice'
import postReducer from '../redux/postSlice'
const store = configureStore({
  reducer: {
    postReducer: postReducer,
  },
})

export default store
