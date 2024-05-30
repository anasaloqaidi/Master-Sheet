import { createSlice } from '@reduxjs/toolkit';
import { createStage } from './createStage';
import { readStages }  from './readStages';
import { updateStage } from './updateStage';
import { deleteStage } from './deleteStage';

const stageSlice = createSlice({
  name: 'stage',
  initialState: {
    stageData: [],
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    
    builder.addCase(createStage.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(createStage.fulfilled, (state, action) => {
      state.loading = false;
      action.payload.map((v)=>state.stageData.push(v));
      state.stageData=state.stageData.sort((a, b) => {
        // Compare the 'id' property of the two objects (a and b)
        if (a.order < b.order) {
            return -1; // Return -1 if a's id is less than b's id
        } else if (a.order > b.order) {
            return 1; // Return 1 if a's id is greater than b's id
        } else {
            return 0; // Return 0 if a's id is equal to b's id
        }
    });

    })
    builder.addCase(createStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    builder.addCase(readStages.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(readStages.fulfilled, (state, action) => {
      state.loading = false;
      state.stageData = action.payload.sort((a, b) => {
        // Compare the 'id' property of the two objects (a and b)
        if (a.order < b.order) {
            return -1; // Return -1 if a's id is less than b's id
        } else if (a.order > b.order) {
            return 1; // Return 1 if a's id is greater than b's id
        } else {
            return 0; // Return 0 if a's id is equal to b's id
        }
    });// Update Stage stageData
      
    })
    builder.addCase(readStages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // Update Stage
    builder.addCase(updateStage.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(updateStage.fulfilled, (state, action) => {
      state.loading = false;
      const updatedIndex = state.stageData.findIndex(
        (Stage) => Stage.id=== action.payload[0].id
      );
      if (updatedIndex !== -1) {
        state.stageData[updatedIndex] = action.payload[0]; // Update Stage in stageData
      }
    })
    builder.addCase(updateStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // Delete Stage
    builder.addCase(deleteStage.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors
    })
    builder.addCase(deleteStage.fulfilled, (state, action) => {
      state.loading = false;
      state.stageData = state.stageData.filter(
        (Stage) => Stage.id !== action.payload[0].id
      ); // Remove deleted Stage from stageData
    })
    builder.addCase(deleteStage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    },
});
export default stageSlice.reducer;