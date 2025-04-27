import { useAppSelector } from '@/store/hooks';
import { getSelectedUser, useFetchUsersQuery } from '../userSlice';

const SelectedUserDetails = () => {
  const { data: users } = useFetchUsersQuery();
  const selectedUser = useAppSelector(getSelectedUser(users));

  return (
    <>
      <h2 className='font-semibold text-xl mb-4'>Selected User Details Page</h2>
      {selectedUser ? (
        <ul>
          <li>ID : {selectedUser.id}</li>
          <li>Name : {selectedUser.name}</li>
          <li>Email : {selectedUser.email}</li>
        </ul>
      ) : (
        <p>Select a user to see more details</p>
      )}
    </>
  );
};

export default SelectedUserDetails;
