import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import postService from 'src/Api/postService'
const initialState = {
  currentUserPost: [],
  feedPost: [],
  wasLastListFeed: false,
  feedReels: [],
}

const fetchAllPostCurrentUser = createAsyncThunk('post/fetchAllPost', async (parameters, store) => {
  const data = await postService.findAllPostSingleUser(
    { posted_by: parameters.id },
    parameters.token,
  )
  return data
})

const fetchAllFeedPost = createAsyncThunk('post/fetchAllFeedPost', async (parameters, store) => {
  const data = await postService.findAllPostFeed({ page: parameters.page }, parameters.token)
  return data
})
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPostToFeed: (state, action) => {
      state.feedPost.unshift(action.payload)
    },
    updatePostInFeed: (state) => {
      state.value -= 1
    },
    deletePostInFeed: (state, action) => {
      const filterArr = state.feedPost.filter((el) => {
        return el._id.toString() !== action.payload?._id?.toString()
      })

      state.feedPost = filterArr
    },
  },
  extraReducers: (builder) => {
    //! Find All Post In Current User
    builder
      .addCase(fetchAllPostCurrentUser.fulfilled, (state, action) => {
        // Add user to the state array

        state.currentUserPost = [...action.payload.data]
      })
      .addCase(fetchAllFeedPost.fulfilled, (state, action) => {
        // Add user to the state array
        if (!action.payload.data.length) {
          state.wasLastListFeed = true
          return
        }

        function addMissingElements(arrayOne, arrayTwo) {
          function existsInArray(array, id) {
            return array.some((obj) => obj._id === id)
          }

          // Iterate through arrayTwo
          for (let i = 0; i < arrayTwo.length; i++) {
            const element = arrayTwo[i]

            if (typeof element === 'object' && element._id) {
              // If element is an object and has _id property
              if (!existsInArray(arrayOne, element._id)) {
                // If element with _id doesn't exist in arrayOne, add it
                arrayOne.push(element)
              }
            }
          }
        }

        addMissingElements(state.feedPost, action.payload.data)

        // state.feedPost = [...newFeedPostArr]
      })
  },
})

export const { addPostToFeed, updatePostInFeed, deletePostInFeed } = postSlice.actions
export { fetchAllPostCurrentUser, fetchAllFeedPost }
export default postSlice.reducer
