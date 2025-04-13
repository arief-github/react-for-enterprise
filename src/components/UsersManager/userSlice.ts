import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUsers } from './initialUser';
import { User } from './UsersManager.types';
import { RootState } from '@/store';

export type UserState = {
  users: User[];
  selectedUserId: User['id'] | null;
};

const initialState: UserState = {
  users: initialUsers,
  selectedUserId: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload;
    },
  },
});

export const { addUser, removeUser, selectUser, setUsers } = usersSlice.actions;

export const getSelectedUser = createSelector(
  (state: RootState) => state.users,
  (users) => {
    if (users.selectedUserId) {
      return users.users.find((user) => user.id === users.selectedUserId);
    }

    return null;
  }
);

export default usersSlice.reducer;
