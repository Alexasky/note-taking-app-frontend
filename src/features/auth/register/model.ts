import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register } from './api';

interface RegisterState {
  user: null | { id: string, name: string, email: string };
  loading: boolean;
  error: string | null;
  accessToken: string
}

const initialState: RegisterState = {
  user: null,
  loading: false,
  error: null,
  accessToken: ''
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: { username: string; email: string; password: string }) => {
    const response = await register({
      username,
      email,
      password,
    });
    return response;
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        } else {
          console.error("Registration failed, no payload received.");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      });
  },
});

export default registerSlice.reducer;