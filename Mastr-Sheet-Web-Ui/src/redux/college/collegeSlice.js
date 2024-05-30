import { createSlice } from "@reduxjs/toolkit";
import { createCollege } from "./createCollege";
import { readCollege } from "./readCollege";
import { updateCollege } from "./updateCollege";


const collegeSlice = createSlice({
  name: "college",
  initialState: {
    collegeData: [],
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(createCollege.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(createCollege.fulfilled, (state, action) => {
      state.loading = false;
      state.collegeData=action.payload;
    });
    builder.addCase(createCollege.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(readCollege.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(readCollege.fulfilled, (state, action) => {
    
      state.loading = false;
      state.collegeData=[action.payload];// Update College collegeData
    });
    builder.addCase(readCollege.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update College
    builder.addCase(updateCollege.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(updateCollege.fulfilled, (state, action) => {
      state.loading = false;
      state.collegeData=action.payload;// Update College in collegeData
      
    });
    builder.addCase(updateCollege.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default collegeSlice.reducer;
