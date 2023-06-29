import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import postService from 'src/Api/postService'
const initialState = {
  post: [],
}

//Fetch All Post In Single User
const fetchAllPost = createAsyncThunk('post/fetchAllPost', async (parameters, store) => {
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
    builder.addCase(fetchAllPost.fulfilled, (state, action) => {
      // Add user to the state array
      state.post = [...action.payload.data]
    })
  },
})

export const { addPost, deletePost, updatePost } = postSlice.actions
export { fetchAllPost }
export default postSlice.reducer
