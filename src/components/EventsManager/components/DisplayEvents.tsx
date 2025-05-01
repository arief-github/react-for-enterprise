import shallow from 'zustand/shallow';
import { EventsState, useEventsStore } from '../eventsStore';

const DisplayEvents = () => {
  const { allEvents, selectEvent } = useEventsStore(
    (state: EventsState) => ({
      allEvents: state.events,
      selectEvent: state.selectEvent,
    }),
    shallow
  );

  return (
    <>
      <h2 className='font-semibold text-xl mb-4'>Events</h2>
      <div className='mt-4'>
        <ul className='text-left shadow py-4 space-y-3 divide-y'>
          {Array.isArray(allEvents) && allEvents.length ? (
            allEvents.map((event) => {
              return (
                <li key={event.id} className='mt-3'>
                  <button
                    className='hover:underline pt-3 px-4'
                    onClick={() => selectEvent(event.id)}
                  >
                    {event.title} - {event.startDate}
                  </button>
                </li>
              );
            })
          ) : (
            <p className='mx-4'>No Events</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default DisplayEvents;
