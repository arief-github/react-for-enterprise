import {
  combineReducers,
  configureStore,
  createAction,
} from '@reduxjs/toolkit';
import usersReducer, {
  userApiSlice,
} from '../components/UsersManager/userSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const resetStore = createAction('resetStore');

export const rootReducer = combineReducers({
  users: usersReducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
});

const appReducer: typeof rootReducer = (state, action) => {
  if (action.type === resetStore.type) {
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [userApiSlice.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // tolong abaikan aksi ini saat menyimpan data serializable ke local storage
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
