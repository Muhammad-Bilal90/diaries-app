import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../../Services/api";
import { User } from "../../Interfaces/user.interface";

interface AuthState {
    loading: boolean;
    authenticated: boolean;
    token: string | null;
    user: User | null;
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async (userInfo: {username: string, password: string}) => {
        const response = await http.post(`/auth/login`, userInfo);
        return response;
    }
);

export const userSignup = createAsyncThunk(
    'auth/signup',
    async (userInfo: {username: string; email: string; password: string}) => {
        const response = await http.post(`/auth/signup`, userInfo);
        return response;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        authenticated: false,
        token: "",
        user: null,
    } as AuthState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        logout: (state) => {
            return{
                ...state,
                loading: false,
                authenticated: false,
                token: "",
                user: null,
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                isloading: true,
            }
        }).addCase(userLogin.fulfilled, (state, action: PayloadAction<any>) => {
            if(action.payload){
                const { token, user } = action.payload;
                return{
                    ...state,
                    loading: false,
                    authenticated: true,
                    token: token,
                    user: user,
                }
            }
        }).addCase(userSignup.pending, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                isloading: true,
            }
        }).addCase(userSignup.fulfilled, (state, action: PayloadAction<any>) => {
                const { token, user } = action.payload;
                return{
                    ...state,
                    loading: false,
                    authenticated: true,
                    token: token,
                    user: user,
                }    
        })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;