import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncFetchRooms } from './asyncActions';
import { FetchStatusType } from '../../shared/@types';

export interface IRoom {
    _id: string;
    title: string;
    description: string;
}

export interface IDetailedRoom extends IRoom {
    messages: {
        sentBy: string;
        content: string;
        createdAt: number;
    }[];
}
export type RoomsStateType = {
    status: FetchStatusType;
    rooms: IRoom[];
    errorMessage?: string;
};

const initialState: RoomsStateType = {
    status: 'idle',
    rooms: [],
};

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncFetchRooms.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(asyncFetchRooms.fulfilled, (state, action: PayloadAction<IRoom[]>) => {
            state.status = 'fulfilled';
            state.rooms = action.payload;
        });
        builder.addCase(asyncFetchRooms.rejected, (state, action) => {
            state.status = 'rejected';
            state.errorMessage = action.error.message;
        });
    },
});

export default roomsSlice.reducer;
