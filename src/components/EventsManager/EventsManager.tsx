import CreateEvent from './components/CreateEvent';
import DisplayEvents from './components/DisplayEvents';
import EventDetails from './components/EventDetail';

const EventsManager = () => {
  return (
    <div className='grid grid-cols-3 gap-12 mt-8'>
      <CreateEvent />
      <DisplayEvents />
      <EventDetails />
    </div>
  );
};

export default EventsManager;
