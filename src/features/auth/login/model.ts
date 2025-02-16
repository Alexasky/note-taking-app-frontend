import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from './api';

interface LoginState {
  user: null | { id: string, name: string, email: string, created_at: Date };
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (credentials: { email: string, password: string }) => {
  const data = await login(credentials);
    return data;
});


const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {        
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;