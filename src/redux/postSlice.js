import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
  post: [],
  error: null,
  feed: [],
}

export const counterSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
