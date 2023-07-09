import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import friendServices from '../Api/friendServices'
const initialState = {
  friends: [],
  pendingRequests: [],
  sentRequests: [],
  suggestions: [],
}

const fetchAllFriends = createAsyncThunk('friend/fetchAllFriends', async (parameters, store) => {
  try {
    const responce = await friendServices.findFriend(
      { user_id: parameters.id, page: parameters?.page ? parameters.page : 1 },
      parameters.token,
    )
    return responce
  } catch (e) {
    console.log(e, 'Error In FetchAllFriends ')
  }
})

const fetchAllPendingRequests = createAsyncThunk(
  'friend/fetchAllPendingRequest',
  async (parameters, store) => {
    try {
      const responce = await friendServices.getAllPendingRequest(
        { page: parameters?.page ? parameters.page : 1 },
        parameters.token,
      )

      return responce
    } catch (e) {
      console.log(e, 'Error In FetchAllPendingRequests')
    }
  },
)
const fetchAllSentRequests = createAsyncThunk(
  'friend/fetchAllSentRequest',
  async (parameters, store) => {
    try {
      const responce = await friendServices.getAllSentRequest(
        { page: parameters?.page ? parameters.page : 1 },
        parameters.token,
      )
      return responce
    } catch (e) {
      console.log(e, 'Error In FetchAllSentRequests')
    }
  },
)
export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //! Find All Post In Current User
    builder
      .addCase(fetchAllPendingRequests.fulfilled, (state, action) => {
        // Add user to the state array
        state.pendingRequests = [...action.payload.data]
      })
      .addCase(fetchAllFriends.fulfilled, (state, action) => {
        state.friends = [...action.payload.data]
      })
      .addCase(fetchAllSentRequests.fulfilled, (state, action) => {
        state.sentRequests = [...action.payload.data]
      })
  },
})

export const {} = friendSlice.actions
export { fetchAllFriends, fetchAllPendingRequests, fetchAllSentRequests }
export default friendSlice.reducer
