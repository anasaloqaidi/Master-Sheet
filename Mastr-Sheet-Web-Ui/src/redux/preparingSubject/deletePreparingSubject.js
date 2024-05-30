import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deletePreparingSubject = createAsyncThunk("preparingSubject/deletePreparingSubject", ({
  subject_code,
  stage_id,
  academic_year_id,
  department_id,
}) => {
  console.log(subject_code+" "+stage_id+" "+academic_year_id+" "+department_id)
  return axios.delete(`/api/preparing-subject?subject_code=${subject_code}&stage_id=${stage_id}&academic_year_id=${academic_year_id}&department_id=${department_id}&`).then((res)=>res.data);

});