import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './redux/auth/slice';
import roomsReducer from './redux/rooms/slice';

const rootReducer = combineReducers({
    auth: authReducer,
    rooms: roomsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, Action>;

const store = configureStore({
    reducer: rootReducer,
});

export type StoreType = typeof store;
export default store;
