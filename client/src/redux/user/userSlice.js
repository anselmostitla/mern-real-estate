import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
//   error: null,
//   loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   //  signInStart: (state) => {
   //    state.loading = true;
   //  },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      // state.loading = false;
      // state.error = null;
    },
   //  signInFailure: (state, action) => {
   //    state.error = action.payload;
   //    state.loading = false
   //  },
   signInFailure: (state) => {
      state.currentUser = null
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteUserSucces: (state) => {
      state.currentUser = null
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null
    }
  },
});

// export const { signInStart, signInSuccess, signInFailure } = userSlice.actions
export const { signInSuccess, signInFailure, updateSuccess, deleteUserSucces, signOutUserSuccess } = userSlice.actions
export default userSlice.reducer
