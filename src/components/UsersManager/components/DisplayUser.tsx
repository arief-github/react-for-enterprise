import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeUser, selectUser } from '../userSlice';

const DisplayUser = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  return (
    <>
      <h2 className='font-semibold text-xl mb-4'>Display User</h2>
      <ul className='space-y-3'>
        {users.map((user) => {
          return (
            <li key={user.id} className='space-x-3'>
              <button
                className='hover:underline'
                onClick={() => dispatch(selectUser(user.id))}
              >
                {user.email}
              </button>
              <button onClick={() => dispatch(removeUser(user))}>X</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DisplayUser;
