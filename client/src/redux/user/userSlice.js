import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.currentuser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSuccess(state, action) {
      state.currentuser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart(state) {
        state.loading = true;
        state.error = null;
    },
    deleteUserSuccess(state) {
      state.currentuser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    signoutSuccess(state) {
        state.currentuser = null;
        state.loading = false;
        state.error = null;
    },
    signoutFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
  signoutFailure,
} = userSlice.actions;

export default userSlice.reducer;
