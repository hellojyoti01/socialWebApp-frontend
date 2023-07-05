import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import postService from 'src/Api/postService'
const initialState = {
  post: [],
  currentUserPost: [],
  feed: [],
}

//Fetch All Post In Single User
const fetchAllPost = createAsyncThunk('post/fetchAllPost', async (parameters, store) => {
  const data = await postService.findAllPostSingleUser(
    { posted_by: parameters.id },
    parameters.token,
  )
  return data
})

const fetchAllPostCurrentUser = createAsyncThunk('post/fetchAllPost', async (parameters, store) => {
  const data = await postService.findAllPostSingleUser(
    { posted_by: parameters.id },
    parameters.token,
  )
  return data
})

//Fetch All Post In Feed
const fetchAllPostFeed = createAsyncThunk('post/fetchAllPostFeed', async (parameters, store) => {
  const data = await postService.findAllPostFeed({ page: parameters.page }, parameters.token)
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

    // builder.addCase(fetchAllPost.fulfilled, (state, action) => {
    //   // Add user to the state array
    //   state.post = [...action.payload.data]
    // })

    // //! Find All Post In Feed
    // builder.addCase(fetchAllPostFeed.fulfilled, (state, action) => {
    //   // Add user to the state array

    //   console.log(action.payload, 'Action In Feed')
    //   // state.post = [...action.payload.data]
    // })
  },
})

export const { addPost, deletePost, updatePost } = postSlice.actions
export { fetchAllPost, fetchAllPostFeed, fetchAllPostCurrentUser }
export default postSlice.reducer
