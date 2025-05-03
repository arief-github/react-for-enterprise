import { useState } from 'react';
import shallow from 'zustand/shallow';
import { EventsState, useEventsStore } from '../eventsStore';
import type { Event } from '../eventsTypes';
import EventsTab, { EventTab } from './EventsTab';

const pastAndUpcomingEventsSelector = (state: EventsState) => {
  const upcomingEvents: Event[] = [];
  const pastEvents: Event[] = [];
  for (const event of state.events) {
    const [day, month, year] = event.endDate
      .split('/')
      .map((item) => parseInt(item));
    const [hour, minute] = event.endTime.split(':');
    const isUpcoming =
      new Date(year, month - 1, day, parseInt(hour), parseInt(minute)) >
      new Date();
    if (isUpcoming) {
      upcomingEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  }
  return {
    upcomingEvents,
    pastEvents,
  };
};

const DisplayEvents = () => {
  const [eventsToShow, setEventsToShow] = useState<EventTab>('all');
  const { allEvents, selectEvent } = useEventsStore(
    (state: EventsState) => ({
      allEvents: state.events,
      selectEvent: state.selectEvent,
    }),
    shallow
  );

  const { pastEvents, upcomingEvents } = useEventsStore(
    pastAndUpcomingEventsSelector,
    shallow
  );

  const eventsMap: Record<EventTab, Event[]> = {
    all: allEvents,
    upcoming: upcomingEvents,
    past: pastEvents,
  };

  const events = eventsMap[eventsToShow];

  return (
    <>
      <h2 className='font-semibold text-xl mb-4'>Events</h2>
      <EventsTab activeTab={eventsToShow} setActiveTab={setEventsToShow} />
      <div className='mt-4'>
        <ul className='text-left shadow py-4 space-y-3 divide-y'>
          {Array.isArray(events) && events.length ? (
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
