import { createSlice } from '@reduxjs/toolkit';
import { createMidGrade } from './createMidGrade';
import { readMidGrades }  from './readMidGrades';
import { createFinalGrade } from './createFinalGrade';
import { readFinalGrades } from './readFinalGrades';
import { createReFinalGrade } from './createReFinalGrade';
import { readReFinalGrades } from './readReFinalGrades';


const gradeSlice = createSlice({
  name: 'grade',
  initialState: {
    key:'mid',
    filteredGradeData: [],
    midGradeData: [],
    finalGradeData: [],
    reFinalGradeData: [],
    error: null,
    loading: false,
  },
  reducers: {
    // Define a reducer function to filter GradeData and update filteredGradeData
    filterGradeData: (state, action) => {
      const { key , filterCriteria } = action.payload;
      if(key === 'mid'){
        console.log("mid")
        state.filteredGradeData = state.midGradeData.filter(filterCriteria);
        state.key='mid';
      }else if (key=== 'final'){
        console.log(key)
        state.filteredGradeData = state.finalGradeData.filter(filterCriteria);
        state.key='final';
      }else{
          state.reFinalGradeData=[];
        state.midGradeData.map((m)=>{
        
          const final=state.finalGradeData.find((f)=>m.student_id===f.student_id && m.subject_code===f.subject_code);
          if(final){
            m.grade + final.grade < 50 ? state.reFinalGradeData?.push({...final,grade:0}) :null;
          }
        })
        state.filteredGradeData = state.reFinalGradeData;
        state.key='reFinal';
      }
      
    },
  },
  extraReducers: (builder) => {
    
    builder.addCase(createMidGrade.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(createMidGrade.fulfilled, (state, action) => {
      state.loading = false;
      
      action.payload.map((v)=>{
        const updatedIndex = state.midGradeData.findIndex(
          (i) => i.student_id === v.student_id && i.subject_code === v.subject_code 
        );
        if (updatedIndex !== -1) {
          state.midGradeData[updatedIndex]=v;
        }else{
          state.midGradeData.push(v)
        }

      });
     

      
    })
    builder.addCase(createMidGrade.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })



    builder.addCase(readMidGrades.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(readMidGrades.fulfilled, (state, action) => {
      state.loading = false;
      state.midGradeData = action.payload;
      
    })
    builder.addCase(readMidGrades.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
















    




builder.addCase(createFinalGrade.pending, (state) => {
  state.loading = true;
  state.error = null; // Clear previous errors
})
builder.addCase(createFinalGrade.fulfilled, (state, action) => {
  state.loading = false;
  
  action.payload.map((v)=>{
    const updatedIndex = state.finalGradeData.findIndex(
      (i) => i.student_id === v.student_id && i.subject_code === v.subject_code 
    );
    if (updatedIndex !== -1) {
      state.finalGradeData[updatedIndex]=v;
    }else{
      state.finalGradeData.push(v)
    }

  });
 

  
})
builder.addCase(createFinalGrade.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})



builder.addCase(readFinalGrades.pending, (state) => {
  state.loading = true;
  state.error = null; // Clear previous errors
})
builder.addCase(readFinalGrades.fulfilled, (state, action) => {
  state.loading = false;
  state.finalGradeData = action.payload;
  
})
builder.addCase(readFinalGrades.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})














builder.addCase(createReFinalGrade.pending, (state) => {
  state.loading = true;
  state.error = null; // Clear previous errors
})
builder.addCase(createReFinalGrade.fulfilled, (state, action) => {
  state.loading = false;
  
  action.payload.map((v)=>{
    const updatedIndex = state.reFinalGradeData.findIndex(
      (i) => i.student_id === v.student_id && i.subject_code === v.subject_code 
    );
    if (updatedIndex !== -1) {
      state.reFinalGradeData[updatedIndex]=v;
    }else{
      state.reFinalGradeData.push(v)
    }

  });
 

  
})
builder.addCase(createReFinalGrade.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})



builder.addCase(readReFinalGrades.pending, (state) => {
  state.loading = true;
  state.error = null; // Clear previous errors
})
builder.addCase(readReFinalGrades.fulfilled, (state, action) => {
  state.loading = false;
  state.reFinalGradeData = action.payload;
  
})
builder.addCase(readReFinalGrades.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})


    },
});
export const { filterGradeData } = gradeSlice.actions; 
export default gradeSlice.reducer;