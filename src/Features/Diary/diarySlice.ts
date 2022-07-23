import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../../Services/api";
import { Diary } from "../../Interfaces/diary.interface";

interface DiaryState {
    diaries: Diary[],
    loading: boolean,
}

export const createDiary = createAsyncThunk(
    'diary/add',
    async (data: { title: string, type: 'private' | 'public', userId: string,}) => {
        const response = await http.post(`/diaries/`, data);
        return response;
    }
);

export const updateDiary = createAsyncThunk(
    'diary/update',
    async (data: { title: string, type: 'private' | 'public', id?: string,}) => {
        const { id, ...updatedData } = data;
        const response = await http.put(`/diaries/${id}`, updatedData);
        return response;
    }
);

export const getDiaries = createAsyncThunk(
    'diaries/getall',
    async (id: string) => {
    const response = await http.get(`/diaries/${id}`);
    return response;
    }
);

const diarySlice = createSlice({
    name: 'diary',
    initialState: {
        diaries: [],
        loading: false,
    } as DiaryState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createDiary.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        }).addCase(createDiary.fulfilled, (state, action: PayloadAction<any>) => {
            state.diaries.push(action.payload.diary);
            state.loading = false;
        }).addCase(updateDiary.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        }).addCase(updateDiary.fulfilled, (state, action: PayloadAction<any>) => {
            const { id } = action.payload;
            const diaryIndex = state.diaries.findIndex(diary => diary.id === id);
            state.diaries[diaryIndex] = action.payload;
            state.loading = false;
        }).addCase(getDiaries.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        }).addCase(getDiaries.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload){
                return{
                    ...state,
                    diaries: action.payload.diaries,
                    loading: false,
                }
            }else {
                return{
                    ...state,
                    loading: false,
                }
            }
        })
    }
});

export default diarySlice.reducer;