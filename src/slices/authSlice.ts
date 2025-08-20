import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

import { signinUser, signupUser } from "@/store/actions/auth.action";

export interface UserInfo {
  email: string;
  id: string;
  username: string;
}

interface AuthState {
  error: null | string;
  loading: boolean;
  success: boolean;
  userInfo: null | UserInfo;
}

const initialState: AuthState = {
  error: null,
  loading: false,
  success: false,
  userInfo: null,
};

export const authSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signinUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) state.error = payload;
      });

    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) state.error = payload;
      });
  },
  initialState,
  name: "auth",
  reducers: {
    setUser: (state, action: PayloadAction<null | UserInfo>) => {
      state.userInfo = action.payload;
    },
    signOut: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUser, signOut } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
