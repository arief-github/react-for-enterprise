import {
  AddUser,
  SelectedUserDetails,
  DisplayUser,
  Spinner,
} from './components';
import { useEffect } from 'react';
import { fetchUsers, selectTotalUsers } from './userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const UserManager = () => {
  const dispatch = useAppDispatch();
  const fetchUsersStatus = useAppSelector(
    (state) => state.users.fetchUsersStatus
  );

  const totalUsers = useAppSelector(selectTotalUsers);

  useEffect(() => {
    if (totalUsers) return;

    dispatch(fetchUsers());
  }, [dispatch, totalUsers]);

  return (
    <div className='container py-8 mx-auto'>
      {fetchUsersStatus === 'PENDING' ? <Spinner show /> : null}
      {fetchUsersStatus === 'SUCCESS' ? (
        <div className='grid grid-cols-12 gap-4 px-4'>
          <div className='col-span-4'>
            <AddUser />
          </div>
          <div className='col-span-4'>
            <DisplayUser />
          </div>
          <div className='col-span-4'>
            <SelectedUserDetails />
          </div>
        </div>
      ) : null}
      {fetchUsersStatus === 'ERROR' ? (
        <p>There was a problem fetching users</p>
      ) : null}
    </div>
  );
};

export default UserManager;
