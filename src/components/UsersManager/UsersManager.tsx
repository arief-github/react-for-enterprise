import { AddUser, DisplayUser, SelectedUserDetails } from './components';

const UserManager = () => {
  return (
    <div className='container py-8 mx-auto'>
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
    </div>
  );
};

export default UserManager;
