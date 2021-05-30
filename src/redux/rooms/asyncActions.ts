import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const asyncFetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    try {
        const response = await axios.get(`${config.API_URI}/api/v1/rooms`);
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message || 'There was an error';
        throw new Error(errorMessage);
    }
});
