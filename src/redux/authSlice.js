import { createSlice } from "@reduxjs/toolkit";
import { loginUser, setAuthToken } from "./authOps";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.token = payload.access_token;
        state.refreshToken = payload.refresh_token;
        setAuthToken(payload.access_token);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, { error, payload }) => {
          state.error = payload ? payload.response.data.detail : error;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export const authReducer = slice.reducer;
