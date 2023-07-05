import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../redux/postSlice'
const store = configureStore({
  reducer: {
    postReducer: postReducer,
  },
})

export default store
