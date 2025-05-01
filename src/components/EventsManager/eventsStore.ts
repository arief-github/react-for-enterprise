import create, { GetState, SetState } from 'zustand';
import { StoreApiWithDevtools } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { events } from './eventsData';
import type { Event } from './eventsTypes';

export type EventsState = {
  events: typeof events;
  selectedEvent: Event['id'];
  selectEvent: (id: string) => void;
  createEvent: (event: Event) => void;
};

export const useEventsStore = create<
  EventsState,
  SetState<EventsState>,
  GetState<EventsState>,
  StoreApiWithDevtools<EventsState>
>(
  devtools(
    (set) => ({
      events: [...events],
      selectEvent: (id: string) => {
        set({ selectedEvent: id });
      },
      createEvent: (event) => {
        set((state) => ({
          events: [...state.events, event],
        }));
      },
      selectedEvent: '',
    }),
    {
      name: 'Events',
    }
  )
);
