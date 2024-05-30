import { createSlice } from "@reduxjs/toolkit";
import { signInAuth } from "./signInAuth";
import { signOutAuth } from "./signOutAuth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: null,
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
     //-----------------------------+++++--------------------------//
    builder.addCase(signInAuth.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(signInAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.authData=action.payload;
    });
    builder.addCase(signInAuth.rejected, (state, action) => {
     state.loading = false;
     state.error = action.payload.message;
    });

   //-----------------------------+++++--------------------------//

    builder.addCase(signOutAuth.pending, (state) => {

        state.loading = true;
        state.error = null; // Clear previous errors
      });
      builder.addCase(signOutAuth.fulfilled, (state, action) => {

        state.loading = false;
        state.authData = action.payload;
      });
      builder.addCase(signOutAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
   //-----------------------------+++++--------------------------//
  },
});
export default authSlice.reducer;