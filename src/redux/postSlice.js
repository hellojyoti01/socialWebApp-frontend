import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import postService from 'src/Api/postService'
const initialState = {
  currentUserPost: [],
}

const fetchAllPostCurrentUser = createAsyncThunk('post/fetchAllPost', async (parameters, store) => {
  const data = await postService.findAllPostSingleUser(
    { posted_by: parameters.id },
    parameters.token,
  )
  return data
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state) => {
      state.value += 1
    },
    updatePost: (state) => {
      state.value -= 1
    },
    deletePost: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    //! Find All Post In Current User
    builder.addCase(fetchAllPostCurrentUser.fulfilled, (state, action) => {
      // Add user to the state array

      state.currentUserPost = [...action.payload.data]
    })
  },
})

export const { addPost, deletePost, updatePost } = postSlice.actions
export { fetchAllPostCurrentUser }
export default postSlice.reducer
