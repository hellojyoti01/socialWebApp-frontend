import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
  user: [],
  error: null,
}

const fetchSingleUserUser = createAsyncThunk(
  'user/fetchSingleUser',
  async (parameters, store) => {},
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state) => {
      console.log('increament')
    },
  },
})

export const { addUser } = userSlice.actions
export { fetchSingleUserUser }
export default userSlice.reducer
