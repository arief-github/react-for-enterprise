import './App.css';
import BussinessCard from '@/components/BussinessCard/BussinessCard';
import UserManager from './components/UsersManager/UsersManager';

import { useAppDispatch } from './store/hooks';
import {
  resetUsersSlice,
  resetUserApiSlice,
  useFetchUsersQuery,
} from './components/UsersManager/userSlice';
import { resetStore } from './store';

function App() {
  const dispatch = useAppDispatch();
  const { refetch } = useFetchUsersQuery();

  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      <h1 className='font-semibold text-2xl'>Bussiness Form</h1>
      <BussinessCard />
      <main>
        <div className='space-x-4 my-8'>
          <button
            className='shadow px-4 py-3 bg-blue-100'
            onClick={() => {
              dispatch(resetUsersSlice());
              dispatch(resetUserApiSlice());
            }}
          >
            Reset User
          </button>
          <button
            className='shadow px-4 py-3 bg-blue-100'
            onClick={() => dispatch(resetStore())}
          >
            Reset Store
          </button>
          <button
            className='shadow px-4 py-3 bg-blue-100'
            onClick={() => refetch()}
          >
            Fetch User
          </button>
        </div>
      </main>
      <UserManager />
    </div>
  );
}

export default App;
