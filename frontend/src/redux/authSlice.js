import { createSlice } from '@reduxjs/toolkit'


const userString = localStorage.getItem('user')
const user = userString ? JSON.parse(userString) : null

const initialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      localStorage.removeItem('user') 
      state.user = null
    },
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer