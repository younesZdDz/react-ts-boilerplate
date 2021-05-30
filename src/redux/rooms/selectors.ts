import { RootStateType } from '../../configStore';
import { FetchStatusType } from '../../shared/@types';
import { IRoom } from './slice';

export const selectRooms: (state: RootStateType) => IRoom[] = (state) => state.rooms.rooms;
export const selectRoomsErrorMessage: (state: RootStateType) => string | undefined = (state) =>
    state.rooms.errorMessage;
export const selectRoomsStatus: (state: RootStateType) => FetchStatusType = (state) => state.rooms.status;
