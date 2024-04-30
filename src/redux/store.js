import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './filters/slice';
import { contactsReducer } from './contacts/slice';
import { authReducer } from './auth/slice';
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

const authPeristConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    phoneBook: contactsReducer,
    filters: filtersReducer,
    auth: persistReducer(authPeristConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// {name: "yriy", email: "fafaf@dgsg.com", password: "121323232"}
// email
// :
// "fafaf@dgsg.com"
// name
// :
// "yriy"
// password
// :
// "121323232"
