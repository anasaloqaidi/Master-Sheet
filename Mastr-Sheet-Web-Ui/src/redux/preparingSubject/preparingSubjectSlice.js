import { createSlice } from '@reduxjs/toolkit';
import { createPreparingSubject } from './createPreparingSubject';
import { readPreparingSubjects }  from './readPreparingSubjects';
import { deletePreparingSubject } from './deletePreparingSubject';

const preparingSubjectSlice = createSlice({
  name: 'preparingSubject',
  initialState: {
    preparingSubjectData: [],
    filteredPreparingSubjectGradeData:[],
    error: null,
    loading: false,
  },
  reducers: {

    filterPreparingSubjectGradeData: (state, action) => {
      const { filterCriteria } = action.payload;
      state.filteredPreparingSubjectGradeData = state.preparingSubjectData.filter(filterCriteria);
    },

  },
  extraReducers: (builder) => {
    
    builder.addCase(createPreparingSubject.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(createPreparingSubject.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.map((v)=>state.preparingSubjectData.push(v));
    })
    builder.addCase(createPreparingSubject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    builder.addCase(readPreparingSubjects.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(readPreparingSubjects.fulfilled, (state, action) => {
      state.loading = false;
      state.preparingSubjectData = action.payload; // Update PreparingSubject preparingSubjectData
    })
    builder.addCase(readPreparingSubjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })


    // Delete PreparingSubject
    builder.addCase(deletePreparingSubject.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(deletePreparingSubject.fulfilled, (state, action) => {
      state.loading = false;
      state.preparingSubjectData = state.preparingSubjectData.filter(
        (PreparingSubject) => PreparingSubject.subject_code !== action.payload[0].subject_code && PreparingSubject.stage_id === action.payload[0].stage_id
      ); // Remove deleted PreparingSubject from preparingSubjectData
    })
    builder.addCase(deletePreparingSubject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    },
});

export const { filterPreparingSubjectGradeData } = preparingSubjectSlice.actions; 
export default preparingSubjectSlice.reducer;