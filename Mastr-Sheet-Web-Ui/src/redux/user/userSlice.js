import { createSlice } from '@reduxjs/toolkit';
import { createUser } from './createUser';
import { readUsers }  from './readUsers';
import { updateUser } from './updateUser';
import { deleteUser } from './deleteUser';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    filteredUserData: [],
    userData: [],
    error: null,
    loading: false,
  },
  reducers: {
    // Define a reducer function to filter userData and update filteredUserData
    filterUserData: (state, action) => {
      const { filterCriteria } = action.payload;
      state.filteredUserData = state.userData.filter(filterCriteria);
    },
  },
  extraReducers: (builder) => {
    
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.map((v)=>state.userData.push(v));
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    builder.addCase(readUsers.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(readUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload; 

    })
    builder.addCase(readUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // Update User
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      const updatedIndex = state.userData.findIndex(
        (User) => User.id=== action.payload[0].id
      );
      if (updatedIndex !== -1) {
        state.userData[updatedIndex] = action.payload[0]; // Update User in userData
      }

    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // Delete User
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = state.userData.filter(
        (User) => User.id !== action.payload[0].id
      ); 
    })
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    },
});
export const { filterUserData } = userSlice.actions; 
export default userSlice.reducer;