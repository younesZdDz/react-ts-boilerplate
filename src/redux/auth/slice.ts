import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncLoginUser } from './asyncActions';
import { FetchStatusType } from '../../shared/@types';

export type AuthStateType = {
    status: FetchStatusType;
    isAuthenticated: boolean;
    user?: { _id: string; email: string };
    errorMessage?: string;
};

const initialState: AuthStateType = {
    status: 'idle',
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: {
            prepare() {
                localStorage.removeItem('token');
                localStorage.removeItem('token_expiry_time');
                localStorage.removeItem('user');
                return { payload: false };
            },
            reducer(state, action: PayloadAction<boolean>) {
                state.isAuthenticated = action.payload;
            },
        },
    },
    extraReducers: (builder) => {
        builder.addCase(asyncLoginUser.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(asyncLoginUser.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.isAuthenticated = true;
            state.user = action.payload;
        });
        builder.addCase(asyncLoginUser.rejected, (state, action) => {
            state.status = 'rejected';
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            state.errorMessage = action.error.message;
        });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
