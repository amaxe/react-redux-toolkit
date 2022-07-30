import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

export const signup = createAsyncThunk<any, unknown, { rejectValue: string }>(
  'auth/signup',
  async (user: any, { rejectWithValue }) => {
    try {
      return await api.signup(user)
    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

export const login = createAsyncThunk<any, undefined, { rejectValue: string }>(
  'auth/login',
  async (user: any, { rejectWithValue }) => {
    try {
      return await api.login(user)
    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

export const logout = createAsyncThunk<any, undefined, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await api.logout()
    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

type AuthState = {
  user: {
    id: string
    name: string
    email: string
    accessToken: string
  } | null
  loading: boolean
  error: string | undefined
}

const user = JSON.parse(localStorage.getItem('user') as string)

const initialState: AuthState = {
  user: user ? user : null,
  loading: false,
  error: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.loading = true
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(login.pending, state => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(logout.pending, state => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false
        state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default authSlice.reducer
