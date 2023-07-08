import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../redux/postSlice'
import friendReducer from '../redux/friendSlice'
const store = configureStore({
  reducer: {
    postReducer: postReducer,
    friendReducer: friendReducer,
  },
})

export default store
