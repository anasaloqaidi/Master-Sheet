import { createSlice } from "@reduxjs/toolkit";
import { createAcademicYear } from "./createAcademicYear";
import { readAcademicYears } from "./readAcademicYears";
import { updateAcademicYear } from "./updateAcademicYear";
import { deleteAcademicYear } from "./deleteAcademicYear";


const academicYearSlice = createSlice({
  name: "academicYear",
  initialState: {
    academicYearData: [],
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(createAcademicYear.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(createAcademicYear.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.map((v)=>state.academicYearData.push(v));
    });
    builder.addCase(createAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });


    builder.addCase(readAcademicYears.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(readAcademicYears.fulfilled, (state, action) => {
      state.loading = false;
      state.academicYearData = action.payload; // Update AcademicYear academicYearData
    });
    builder.addCase(readAcademicYears.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update AcademicYear
    builder.addCase(updateAcademicYear.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(updateAcademicYear.fulfilled, (state, action) => {
      const updatedYear = action.payload[0];
  
      // Update loading state
      state.loading = false;
  
      // Find the index of the academic year to update
      const updatedIndex = state.academicYearData.findIndex(
        (academicYear) => academicYear.id === updatedYear.id
      );
  
      if (updatedIndex !== -1) {
        // Check if the updated year is set as current; if yes, update all years' `is_current` to false
        if (updatedYear.is_current) {
          state.academicYearData.forEach((year) => {
            year.is_current = false;
          });
        }
  
        // Update the specific academic year at the found index
        state.academicYearData[updatedIndex] = updatedYear;
      }
    });
    builder.addCase(updateAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete AcademicYear
    builder.addCase(deleteAcademicYear.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    });
    builder.addCase(deleteAcademicYear.fulfilled, (state, action) => {
      state.loading = false;
      state.academicYearData = state.academicYearData.filter(
        (AcademicYear) =>
          AcademicYear.id !== action.payload[0].id
      ); // Remove deleted AcademicYear from academicYearData
    });
    builder.addCase(deleteAcademicYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default academicYearSlice.reducer;
