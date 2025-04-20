import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { User } from './UsersManager.types';
import { RootState } from '@/store';
import { listUsers, deleteUser, createUser } from '@/api/userApi';

type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';

export type UserState = {
  users: User[];
  selectedUserId: User['id'] | null;
  deletingUserId: User['id'] | null;
  fetchUsersStatus: ApiStatus;
  addUserStatus: ApiStatus;
  deleteUserStatus: ApiStatus;
};

const initialState: UserState = {
  users: [],
  selectedUserId: null,
  deletingUserId: null,
  fetchUsersStatus: 'IDLE',
  addUserStatus: 'IDLE',
  deleteUserStatus: 'IDLE',
};

export const addUser = createAsyncThunk('users/addUser', createUser);
export const fetchUsers = createAsyncThunk('users/fetchUsers', listUsers);
export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (userData: User) => {
    await deleteUser(userData.id);
    return userData;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.fetchUsersStatus = 'PENDING';
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.fetchUsersStatus = 'SUCCESS';
      state.users = action.payload;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.fetchUsersStatus = 'ERROR';
    });

    builder.addCase(addUser.pending, (state) => {
      state.addUserStatus = 'PENDING';
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload.user);
      state.addUserStatus = 'SUCCESS';
    });

    builder.addCase(addUser.rejected, (state) => {
      state.addUserStatus = 'ERROR';
    });

    builder.addCase(removeUser.pending, (state, action) => {
      state.deletingUserId = action.meta.arg.id;
      state.deleteUserStatus = 'PENDING';
    });

    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.users = state.users.filter(
        (_user) => _user.id !== action.payload.id
      );
    });

    builder.addCase(removeUser.rejected, (state) => {
      state.deleteUserStatus = 'ERROR';
      state.deletingUserId = null;
    });
  },
});

export const { selectUser, setUsers } = usersSlice.actions;

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
