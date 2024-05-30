import { createSlice } from '@reduxjs/toolkit';
import { createDepartment } from './createDepartment';
import { readDepartments }  from './readDepartments';
import { updateDepartment } from './updateDepartment';
import { deleteDepartment } from './deleteDepartment';

const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    departmentData: [],
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    
    builder.addCase(createDepartment.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(createDepartment.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.map((v)=>state.departmentData.push(v));
      
    })
    builder.addCase(createDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    builder.addCase(readDepartments.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(readDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.departmentData = action.payload; // Update department departmentData
    })
    builder.addCase(readDepartments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // Update department
    builder.addCase(updateDepartment.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(updateDepartment.fulfilled, (state, action) => {
      state.loading = false;

      const updatedIndex = state.departmentData.findIndex(
        (department) => department.id === action.payload[0].id
      );
      if (updatedIndex !== -1) {
        state.departmentData[updatedIndex] = action.payload[0]; // Update department in departmentData
      }
    })
    builder.addCase(updateDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // Delete department
    builder.addCase(deleteDepartment.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(deleteDepartment.fulfilled, (state, action) => {
      state.loading = false;
     
      state.departmentData = state.departmentData.filter(
        (department) => department.id !== action.payload[0].id
      ); 
     
    })
    builder.addCase(deleteDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    },
});
export default departmentSlice.reducer;