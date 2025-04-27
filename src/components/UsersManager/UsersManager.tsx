import {
  AddUser,
  SelectedUserDetails,
  DisplayUser,
  Spinner,
} from './components';
import { useFetchUsersQuery } from './userSlice';

const UserManager = () => {
  const {
    data: users,
    isError: isFetchUsersError,
    isLoading: isFetchUserPending,
    isSuccess: isFetchUsersSuccess,
  } = useFetchUsersQuery();

  return (
    <div className='container py-8 mx-auto'>
      {isFetchUserPending ? <Spinner show /> : null}
      {isFetchUsersSuccess && users.length ? (
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
      {isFetchUsersError ? <p>There was a problem fetching users</p> : null}
    </div>
  );
};

export default UserManager;
