import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

export const getUser = createAsyncThunk<any, undefined, { rejectValue: string }>(
  'user/getUser',
  async (id: any, { rejectWithValue }) => {
    try {
      return await api.getUser(id)
    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

type UserState = {
  name: string
  email: string
  todos: string[]
  loading: boolean
  error: string | undefined
}

const initialState: UserState = {
  name: '',
  email: '',
  todos: [],
  loading: false,
  error: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        const { name, email, todos } = action.payload
        state.name = name
        state.email = email
        state.todos = todos
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
  // [fetchUsers.fulfilled]: (state, action: PayloadAction<string>) => {}
})

export default userSlice.reducer
