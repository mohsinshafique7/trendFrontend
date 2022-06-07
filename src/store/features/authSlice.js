import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  error: false,
  errorType: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state) => {
      return { ...state, error: true }
    },
    resetError: (state) => {
      return { ...state, error: false, errorType: null }
    },
  },
})
export const { setError, resetError } = authSlice.actions

export default authSlice.reducer
