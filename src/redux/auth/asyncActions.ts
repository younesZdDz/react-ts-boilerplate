import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const asyncLoginUser = createAsyncThunk(
    'auth/fetchAuth',
    async ({ email, password }: { email: string; password: string }) => {
        try {
            const response = await axios.post(`${config.API_URI}/api/v1/auth/login`, {
                email,
                password,
            });
            const authorization = {
                token: response.headers['authorization'],
                tokenExpiresIn: response.headers['authorization-expiry-time'],
            };

            const user = response.data;

            localStorage.setItem('token', authorization.token);
            localStorage.setItem('token_expiry_time', authorization.tokenExpiresIn);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || 'There was an error';
            throw new Error(errorMessage);
        }
    },
);
