import { createSlice } from '@reduxjs/toolkit';
import { createStudent } from './createStudent';
import { readStudents }  from './readStudents';
import { updateStudent } from './updateStudent';
import { deleteStudent } from './deleteStudent';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    filteredStudentData: [],
    filteredStudentGradeData: [],
    studentData: [],
    error: null,
    loading: false,
  },
  reducers: {
    // Define a reducer function to filter userData and update filteredUserData
    filterStudentData: (state, action) => {
      const { filterCriteria } = action.payload;

      state.filteredStudentData = state.studentData.filter(filterCriteria);
    },
    filterStudentGradeData: (state, action) => {
      const { filterCriteria } = action.payload;
      state.filteredStudentGradeData = state.studentData.filter(filterCriteria);
    },

  },
  extraReducers: (builder) => {
    
    builder.addCase(createStudent.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(createStudent.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.map((v)=>state.studentData.push(v));
    })
    builder.addCase(createStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    builder.addCase(readStudents.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(readStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.studentData = action.payload; // Update Student studentData
    })
    builder.addCase(readStudents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // Update Student
    builder.addCase(updateStudent.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      state.loading = false;
      const updatedIndex = state.studentData.findIndex(
        (v) => v.id === action.payload[0].id
      );
      if (updatedIndex !== -1) {
        const {studentStages}=state.studentData[updatedIndex];
        state.studentData[updatedIndex] = action.payload[0]; 
        state.studentData[updatedIndex]['studentStages']=studentStages;
      }
    })
    builder.addCase(updateStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // Delete Student
    builder.addCase(deleteStudent.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.studentData = state.studentData.filter(
        (v) => v.id !== action.payload[0].id
      ); // Remove deleted Student from studentData
    })
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    },
});

export const { filterStudentData , filterStudentGradeData } = studentSlice.actions; 
export default studentSlice.reducer;