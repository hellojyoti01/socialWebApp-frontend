import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
  user: {},
  selfPost: [],
  feedPost: [],
  friends: [],
  mutualFriends: [],
  pendingFriends: [],
  suggestionFriends: [],
  error: null,
}

const fetchSingleUserUser = createAsyncThunk('user/fetchSingleUser', async (parameters, store) => {
  console.log(parameters)
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state) => {
      console.log('increament')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUserUser.fulfilled, (state, action) => {
      // Add user to the state array
    })
  },
})

export const { addUser } = userSlice.actions
export { fetchSingleUserUser }
export default userSlice.reducer
