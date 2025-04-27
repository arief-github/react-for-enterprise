import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './UsersManager.types';
import { RootState } from '@/store';
import { listUsers, createUser, deleteUser } from '@/api/userApi';

export type UserState = {
  selectedUserId: User['id'] | null;
  deletingUserId: User['id'] | null;
};

const initialState: UserState = {
  selectedUserId: null,
  deletingUserId: null,
};

export const userApiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      queryFn: async () => {
        return {
          data: await listUsers(),
        };
      },
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<{ user: User }, User>({
      queryFn: async (user) => {
        return {
          data: await createUser(user),
        };
      },
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            'fetchUsers',
            undefined,
            (draftUsers) => [...draftUsers, user]
          )
        );

        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
        }
      },
    }),
    removeUser: builder.mutation<boolean, User>({
      queryFn: async (user) => {
        await deleteUser(user.id);
        return {
          data: true,
        };
      },
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        dispatch(setDeletingUserId(user.id));

        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            'fetchUsers',
            undefined,
            (draftUsers) => draftUsers.filter((_user) => _user.id !== user.id)
          )
        );

        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
        }

        dispatch(setDeletingUserId(null));
      },
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useCreateUserMutation,
  useRemoveUserMutation,
} = userApiSlice;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload;
    },
    setDeletingUserId: (state, action: PayloadAction<string | null>) => {
      state.deletingUserId = action.payload;
    },
    resetUsersSlice: () => {
      return initialState;
    },
  },
});

export const { setDeletingUserId, selectUser, resetUsersSlice } =
  usersSlice.actions;

export const resetUserApiSlice = () => userApiSlice.util.resetApiState();

export const initialiseUsersApi = () =>
  userApiSlice.endpoints.fetchUsers.initiate(undefined);

export const getSelectedUser = (users?: User[]) => (state: RootState) => {
  return users && state.users.selectedUserId
    ? users.find((user) => user.id === state.users.selectedUserId)
    : null;
};

export default usersSlice.reducer;
