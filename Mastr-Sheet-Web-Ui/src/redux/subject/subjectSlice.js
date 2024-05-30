import { createSlice } from "@reduxjs/toolkit";
import { createSubject } from "./createSubject";
import { readSubjects } from "./readSubjects";
import { updateSubject } from "./updateSubject";
import { deleteSubject } from "./deleteSubject";

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subjectData: [],
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(createSubject.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(createSubject.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.map((v)=>state.subjectData.push(v));

    });
    builder.addCase(createSubject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(readSubjects.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(readSubjects.fulfilled, (state, action) => {
      state.loading = false;
      state.subjectData = action.payload; // Update Subject subjectData
    });
    builder.addCase(readSubjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update Subject
    builder.addCase(updateSubject.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(updateSubject.fulfilled, (state, action) => {
      state.loading = false;
      const updatedIndex = state.subjectData.findIndex(
        (Subject) => Subject.code === action.payload[0].code
      );
      if (updatedIndex !== -1) {
        state.subjectData[updatedIndex] = action.payload[0]; // Update Subject in subjectData
      }
    });
    builder.addCase(updateSubject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete Subject
    builder.addCase(deleteSubject.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(deleteSubject.fulfilled, (state, action) => {
      state.loading = false;
      state.subjectData = state.subjectData.filter(
        (Subject) => Subject.code !== action.payload[0].code
      ); // Remove deleted Subject from subjectData
    });
    builder.addCase(deleteSubject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default subjectSlice.reducer;
