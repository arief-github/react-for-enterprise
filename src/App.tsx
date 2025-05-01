import './App.css';
import EventsManager from './components/EventsManager/EventsManager';
// import BussinessCard from '@/components/BussinessCard/BussinessCard';
// import UserManager from './components/UsersManager/UsersManager';

function App() {
  return (
    <div className='App mx-auto max-w-6xl text-center my-8'>
      {/* <h1 className='font-semibold text-2xl'>Bussiness Form</h1>
      <BussinessCard />
      <UserManager /> */}
      <EventsManager />
    </div>
  );
}

export default App;
