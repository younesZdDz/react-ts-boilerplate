import { RootStateType } from '../../configStore';
import { FetchStatusType } from '../../shared/@types';

export const selectIsAuthenticated: (state: RootStateType) => boolean = (state) => state.auth.isAuthenticated;
export const selectAuthUser: (state: RootStateType) => { _id: string; email: string } | undefined = (state) =>
    state.auth.user;
export const selectAuthErrorMessage: (state: RootStateType) => string | undefined = (state) => state.auth.errorMessage;
export const selectAuthStatus: (state: RootStateType) => FetchStatusType = (state) => state.auth.status;
