import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectUser,
  useFetchUsersQuery,
  useRemoveUserMutation,
} from '../userSlice';
import Spinner from '@/components/UsersManager/components/Spinner';

const DisplayUser = () => {
  const dispatch = useAppDispatch();
  const deletingUserId = useAppSelector((state) => state.users.deletingUserId);
  const {
    data: users,
    isSuccess: isFetchUsersSuccess,
    isLoading: isLoadingUsers,
  } = useFetchUsersQuery();

  const [removeUser, { isLoading: isRemoveUserPending }] =
    useRemoveUserMutation();

  return (
    <>
      <h2 className='font-semibold text-xl mb-4'>Display User</h2>
      <ul className='space-y-3'>
        {isFetchUsersSuccess && Array.isArray(users)
          ? users.map((user) => {
              return (
                <li key={user.id} className='space-x-3'>
                  <button
                    className='hover:underline'
                    onClick={() => dispatch(selectUser(user.id))}
                  >
                    {user.email}
                  </button>
                  {isRemoveUserPending && deletingUserId === user.id ? (
                    <Spinner show />
                  ) : (
                    <button onClick={() => removeUser(user)}>X</button>
                  )}
                </li>
              );
            })
          : null}
      </ul>
      {isLoadingUsers ? <Spinner show /> : null}
    </>
  );
};

export default DisplayUser;
