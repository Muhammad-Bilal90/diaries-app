import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../../Services/api";
import { Entry } from "../../Interfaces/entry.interface";

interface EntryState {
    entries : Entry[];
    loading: boolean;
}

export const createEntry = createAsyncThunk(
    'entry/add',
    async (data: {title: string, content: string, diaryId?: string}) => {
        const response = await http.post(`/api/diaries/entry`, data);
        return response;
    }
);

export const updateEntry = createAsyncThunk(
    'entry/update',
    async (data: { title: string; content: string; id?: string}) => {
        const {id, ...updatedData} = data
        const response = await http.put(`/api/diaries/entry/${id}`, updatedData);
        return response;
    }
);

export const getEntries = createAsyncThunk(
    'diaries/getall',
    async (id?: string) => {
        const response = await http.get(`/api/diaries/entries/${id}`);
        return response;
    }
);

const entrySlice = createSlice({
    name: 'entry',
    initialState: {
        entries: [],
        loading: false,
    } as EntryState,
    reducers:{
        clearEntries : (state) => {
            state.entries = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createEntry.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        }).addCase(createEntry.fulfilled, (state, action: PayloadAction<any>) => {
            state.entries.push(action.payload.entry);
            state.loading = false;
        }).addCase(updateEntry.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        }).addCase(updateEntry.fulfilled, (state, action: PayloadAction<any>) => {
            const { id } = action.payload;
            const entryIndex = state.entries.findIndex(entry => entry.id === id);
            state.entries[entryIndex] = action.payload;
            state.loading = false;
        }).addCase(getEntries.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        }).addCase(getEntries.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload){
                return{
                    ...state,
                    entries: action.payload.entries,
                    loading: false,
                }
            }else{
                return{
                    ...state,
                    loading: false,
                }
            }
        })
    }
});

export const { clearEntries } = entrySlice.actions;
export default entrySlice.reducer;