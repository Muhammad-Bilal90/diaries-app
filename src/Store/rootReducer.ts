import { combineReducers } from "@reduxjs/toolkit";
import authReducer  from '../Features/Auth/authSlice';
import diaryReducer from '../Features/Diary/diarySlice';
import entryReducer from '../Features/Entry/entrySlice';

const rootReducer = combineReducers({
    auth: authReducer,
    diary: diaryReducer,
    entry: entryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;