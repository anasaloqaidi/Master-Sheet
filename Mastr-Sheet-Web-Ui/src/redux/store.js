import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import departmentReducer from "./department/departmentSlice";
import subjectReducer from "./subject/subjectSlice";
import academicYearReducer from "./academicYear/academicYearSlice";
import stageReducer from "./stage/stageSlice";
import preparingSubjectReducer from "./preparingSubject/preparingSubjectSlice";
import userReducer from "./user/userSlice";
import studentReducer from "./student/studentSlice";
import collegeReducer from "./college/collegeSlice";
import gradeReducer from "./grade/gradeSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    department: departmentReducer,
    subject: subjectReducer,
    academicYear: academicYearReducer,
    stage:stageReducer,
    college:collegeReducer,
    user:userReducer,
    student:studentReducer,
    grade:gradeReducer,
    preparingSubject:preparingSubjectReducer
  });
  
  const persistConfig = {
    key: "root",
    storage,
    version: 1,
  };
  
  const persisteReducer = persistReducer(persistConfig, rootReducer);
  export const store = configureStore({
    reducer: persisteReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  
  export const persistor = persistStore(store);